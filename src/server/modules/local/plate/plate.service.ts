import { plate } from '#/entity/plate.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { admin, adminRes, details, detailsRes, noticeRes, owner, plateListRes, plateSumRes, rankingRes, subscribeRes } from './dto/plate.dto';
import { user } from '#/entity/user.entity';
import { plateSubscribe } from '#/entity/plateSubscribe.entity';

@Injectable()
export class PlateService {

    constructor(
        @InjectRepository(plate)
        private plateRepository: Repository<plate>,
        @InjectRepository(user)
        private userRepository: Repository<user>,
        @InjectRepository(plateSubscribe)
        private plateSubscribeRepository: Repository<plateSubscribe>
    ) { }

    getHotList() {

    }

    async getPlateList(page: number): Promise<plateListRes> {
        const res: plateListRes = {
            res: 1
        }
        try {
            res.plates = await this.plateRepository.createQueryBuilder()
                .leftJoinAndSelect('plate_subscribe', 'plate_subscribe', 'plate_subscribe.p_id=plate.p_id')
                .leftJoinAndSelect('invitation', 'invitation', 'invitation.plate=plate.p_id')
                .select('plate.p_id', 'pid')
                .addSelect('plate.name', 'name')
                .addSelect('plate.avatar', 'avatar')
                .addSelect('COUNT(DISTINCT plate_subscribe.u_id)', 'subscribe')
                .addSelect('COUNT(DISTINCT invitation.i_id)', 'invitation')
                .groupBy('plate.p_id')
                .orderBy('plate.date', 'ASC')
                .limit(12)
                .offset(12 * page)
                .getRawMany()
        } catch (error) {
            console.log(error)
            res.res = -1
        }
        return res
    }

    async getPlateSum(): Promise<plateSumRes> {
        const res: plateSumRes = {
            res: 1
        }
        try {
            res.sum = await this.plateRepository.count()
        } catch (error) {
            console.log(error)
            res.res = -1
        }
        return res
    }

    async getDetails(pid: string): Promise<detailsRes> {
        const res: detailsRes = {
            res: 1
        }
        try {
            const detailsRes: details = await this.plateRepository.createQueryBuilder()
                .leftJoinAndSelect('plate_subscribe', 'plate_subscribe', 'plate_subscribe.p_id=plate.p_id')
                .leftJoinAndSelect('invitation', 'invitation', 'invitation.plate=plate.p_id')
                .select('plate.p_id', 'pid')
                .addSelect('plate.name', 'name')
                .addSelect('plate.avatar', 'avatar')
                .addSelect('plate.introduction', 'introduction')
                .addSelect('plate.tag', 'tag')
                .addSelect('plate.owner', 'owner')
                .addSelect('COUNT(DISTINCT plate_subscribe.u_id)', 'sSum')
                .addSelect('COUNT(DISTINCT invitation.i_id)', 'iSum')
                .groupBy('plate.p_id')
                .where("plate.p_id = :pid", { pid })
                .getRawOne()
            if (!detailsRes) res.res = 2
            else {
                res.target = detailsRes
                res.owner = await this.userRepository.findOne({ select: { uid: true, name: true }, where: { uid: detailsRes.owner } })
            }
        } catch (error) {
            console.log(error)
            res.res = -1
        }
        return res
    }

    async getNotice(pid: string): Promise<noticeRes> {
        const res: noticeRes = {
            res: 1,
            text: ''
        }
        try {
            const notice: plate = await this.plateRepository.findOne({ select: { notice: true }, where: { pid } })
            res.text = notice.notice
        } catch (error) {
            res.res = -1
            console.log(error)
        }
        return res
    }

    async getAdmins(pid: string): Promise<adminRes> {
        const res: adminRes = {
            res: 1,
            admins: []
        }
        try {
            const admins: admin[] = await this.userRepository.createQueryBuilder()
                .leftJoinAndSelect('plate_subscribe', 'plate_subscribe', 'plate_subscribe.u_id=user.u_id')
                .select('user.u_id', 'uid')
                .addSelect('user.name', 'name')
                .addSelect('user.avatar', 'avatar')
                .where("plate_subscribe.p_id = :pid AND plate_subscribe.admin = :admin", { pid, admin: 1 })
                .getRawMany()
            res.admins = admins
        } catch (error) {
            console.log(error)
            res.res = -1
        }
        return res
    }

    async getRanking(pid: string, uid: string): Promise<rankingRes> {
        const yesterday = new Date();
        yesterday.setDate(new Date().getDate() - 1);
        const res: rankingRes = {
            res: 1,
            ranking: {
                exp: 0,
                level: 1,
                maxExp: 50,
                note: yesterday
            }
        }
        try {
            res.ranking = await this.plateSubscribeRepository.findOne({ select: { exp: true, level: true, note: true }, where: { uid, pid } })
            res.ranking.maxExp = 50 * Math.pow(2, res.ranking.level - 1)
        } catch (error) {
            console.log(error)
            res.res = -1
        }
        return res
    }

    async getSubscribe(uid: string, pid: string): Promise<subscribeRes | null> {
        const res: subscribeRes = {
            res: 1
        }
        if (!uid) res.res = 0
        else {
            try {
                const subscribeRes: number = await this.plateSubscribeRepository.count({ where: { uid, pid } })
                if (subscribeRes === 0) res.res = 2
            } catch (error) {
                console.log(error)
                res.res = -1
            }

        }
        return res
    }
}
