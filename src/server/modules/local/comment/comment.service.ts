import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { commit } from '#/entity/commit.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { commentsRes, reply, replysRes } from './dto/comment.dto';
import { user } from '#/entity/user.entity';
import { commitLike } from '#/entity/commitLike.entity';
import { commitReply } from '#/entity/commitReply.entity';
import { invitation } from '#/entity/invitation.entity';

@Injectable()
export class CommentService {

    constructor(
        @InjectRepository(commit)
        private commitRepository: Repository<commit>,
        @InjectRepository(user)
        private userRepository: Repository<user>,
        @InjectRepository(commitLike)
        private commitLikeRepository: Repository<commitLike>,
        @InjectRepository(commitReply)
        private commitReplyRepository: Repository<commitReply>,
        @InjectRepository(invitation)
        private invitationRepository: Repository<invitation>
    ) { }

    async getComments(iid: string, uid: string, pid: string, page: number, floor: number): Promise<commentsRes> {
        const res: commentsRes = {
            res: 1,
            comments: []
        }
        try {
            const ufRes: { owner: string } = await this.invitationRepository.findOne({ select: { owner: true }, where: { iid } })
            if (floor) {
                const fRes: { sum: number } = await this.commitRepository.createQueryBuilder().select("COUNT(*)", 'sum').where("commit.floor>:floor AND commit.i_id=:iid", { floor, iid }).getRawOne()
                if (!fRes) page = 0
                else page = Math.ceil(fRes.sum / 12)
            }
            const cRes = await this.commitRepository.find({ select: { cid: true, uid1: true, floor: true, text: true, date: true }, where: { iid }, take: 12, skip: 12 * page, order: { date: 'ASC' } })
            for (let i = 0; i < cRes.length; i++) {
                const uRes = await this.userRepository.createQueryBuilder()
                    .leftJoinAndSelect('plateSubscribe', 'plateSubscribe', `plateSubscribe.u_id=user.u_id And plateSubscribe.p_id='${pid}'`)
                    .leftJoinAndSelect('plate', 'plate', 'plate.p_id=plateSubscribe.p_id')
                    .select('user.u_id', 'uid')
                    .addSelect('user.name', 'name')
                    .addSelect('user.avatar', 'avatar')
                    .addSelect('plateSubscribe.level', 'level')
                    .addSelect('plateSubscribe.admin', 'admin')
                    .addSelect('plate.owner', 'owner')
                    .where('user.u_id=:uid', { uid: cRes[i].uid1 })
                    .getRawOne()
                const lSum = await this.commitLikeRepository.count({ where: { cid: cRes[i].cid } })
                const rSum = await this.commitReplyRepository.count({ where: { cid2: cRes[i].cid } })
                const isLike = uid ? await this.commitLikeRepository.findOne({ where: { uid, cid: cRes[i].cid } }) : false
                const replys: reply[] = await this.commitReplyRepository.find({ select: { cid1: true, uid1: true, uid2: true, text: true, date: true }, where: { cid2: cRes[i].cid }, take: 2, order: { date: 'ASC' } })
                for (let j = 0; j < replys.length; j++) {
                    let nRes = await this.userRepository.findOne({ select: { name: true }, where: { uid: replys[j].uid1 } })
                    replys[j].name1 = nRes.name
                    nRes = await this.userRepository.findOne({ select: { name: true }, where: { uid: replys[j].uid2 } })
                    replys[j].name2 = nRes.name
                }
                res.comments.push({
                    comment: {
                        cid: cRes[i].cid,
                        text: cRes[i].text,
                        floor: cRes[i].floor,
                        lSum,
                        rSum,
                        date: cRes[i].date,
                        isLike: isLike ? true : false
                    },
                    owner: {
                        uid: uRes.uid,
                        name: uRes.name,
                        leval: uRes.level ? uRes.level : 1,
                        avatar: uRes.avatar,
                        admin: uRes.admin ? true : false,
                        owner: uRes.owner === uRes.uid,
                        floorer: uRes.uid === ufRes.owner
                    },
                    replys
                })
            }
        } catch (error) {
            console.log(error)
            res.res = -1
        }
        return res
    }

    async getReplys(cid: string, page: number): Promise<replysRes> {
        const res: replysRes = {
            res: 1,
        }
        try {
            const replys: reply[] = await this.commitReplyRepository.find({ select: { cid1: true, uid1: true, uid2: true, text: true, date: true }, where: { cid2: cid }, take: 8, skip: page * 8, order: { date: 'ASC' } })
            for (let j = 0; j < replys.length; j++) {
                let nRes = await this.userRepository.findOne({ select: { name: true }, where: { uid: replys[j].uid1 } })
                replys[j].name1 = nRes.name
                nRes = await this.userRepository.findOne({ select: { name: true }, where: { uid: replys[j].uid2 } })
                replys[j].name2 = nRes.name
            }
            res.replys = replys
        } catch (error) {
            console.log(error)
            res.res = -1
        }
        return res
    }
}
