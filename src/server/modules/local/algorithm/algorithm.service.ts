import { plate } from '#/entity/plate.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { invitationSite, rating, tag } from './dto/algorithm.dto';

@Injectable()
export class AlgorithmService {
    private similar: Map<string, Map<string, number>>
    constructor(
        @InjectRepository(plate)
        private plateRepository: Repository<plate>,
    ) {
        // this.init()
    }

    private async init() {
        this.similar = new Map()
        const tags = await this.queryType()
        const allRating: Array<Array<rating>> = []
        for (let tag of tags) {
            allRating.push(await this.queryRating(tag))
        }
        for (let item1 of allRating) {
            if (item1.length != 0) {
                const map: Map<string, number> = new Map()
                for (let item2 of allRating) {
                    if (item2.length != 0) {
                        map.set(item2[0].tag, this.similarity(item1, item2))
                    }
                }
                this.similar.set(item1[0].tag, map)
            }
        }
    }

    private async queryType(): Promise<Array<string>> {
        const res: Array<string> = []
        try {
            const tags: tag[] = await this.plateRepository.createQueryBuilder()
                .select('DISTINCT plate.tag', 'tag')
                .getRawMany()
            if (tags) {
                for (let i = 0; i < tags.length; i++) {
                    res.push(tags[i].tag)
                }
            }
        } catch (error) {
            console.log(error)
        }
        return res
    }

    private async queryRating(tag: string): Promise<rating[]> {
        const rating: rating[] = []
        const map: Map<string, number> = new Map()
        try {
            let res: { uid: string }[] = await this.plateRepository.createQueryBuilder()
                .leftJoinAndSelect('invitation', 'invitation', 'invitation.plate=plate.p_id')
                .leftJoinAndSelect('invitation_like', 'invitation_like', 'invitation_like.i_id=invitation.i_id')
                .select('invitation_like.u_id', 'uid')
                .getRawMany()
            for (let site of res) {
                map.set(site.uid, 2)
            }
            res = null
            res = await this.plateRepository.createQueryBuilder()
                .leftJoinAndSelect('invitation', 'invitation', 'invitation.plate=plate.p_id')
                .leftJoinAndSelect('invitation_collect', 'invitation_collect', 'invitation_collect.i_id=invitation.i_id')
                .select('invitation_collect.u_id', 'uid')
                .getRawMany()
            for (let site of res) {
                if (map.has(site.uid)) map.set(site.uid, 5)
                else map.set(site.uid, 2)
            }
            res = null
            res = await this.plateRepository.createQueryBuilder()
                .leftJoinAndSelect('invitation', 'invitation', 'invitation.plate=plate.p_id')
                .leftJoinAndSelect('invitation_history', 'invitation_history', 'invitation_history.i_id=invitation.i_id')
                .select('invitation_history.u_id', 'uid')
                .getRawMany()
            for (let site of res) {
                if (map.has(site.uid)) map.set(site.uid, map.get(site.uid) + 1)
                else map.set(site.uid, 2)
            }
            for (let [key, value] of map) {
                rating.push({
                    uid: key,
                    tag,
                    rating: value
                })
            }
        } catch (error) {
            console.log(error)
        }
        return rating
    }

    private similarity(rating1: rating[], rating2: rating[]): number {
        // 获取评分过两个物品的用户
        const uids1 = rating1.map(r => r.uid);
        const uids2 = rating2.map(r => r.uid);
        const commonuids = uids1.filter(u => uids2.includes(u));
        // 如果没有共同评分过两个物品的用户，则相似度为0
        if (commonuids.length === 0) return 0;
        // 计算两个物品的相似度
        let dotProduct = 0, magnitude1 = 0, magnitude2 = 0;
        for (let uid of commonuids) {
            const rating3 = rating1.find(r => r.uid === uid).rating;
            const rating4 = rating2.find(r => r.uid === uid).rating;
            dotProduct += rating3 * rating4;
            magnitude1 += Math.pow(rating3, 2);
            magnitude2 += Math.pow(rating4, 2);
        }
        return dotProduct / (Math.sqrt(magnitude1) * Math.sqrt(magnitude2));
    }

    private EWMA(data: invitationSite[]): number {
        const len = data.length
        const dayTime = 24 * 60 * 60 * 1000
        const today = new Date().getTime()
        let sum = 0
        for (let site of data) {
            sum += site.action * Math.exp(-Math.ceil((today - site.time.getTime()) / dayTime))
        }
        return sum / len
    }
}
