import { Injectable } from '@nestjs/common';
import { postCommentRes, replyRes } from './dto/comment.dto';
import { Repository } from 'typeorm';
import { commit } from '#/entity/commit.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { invitation } from '#/entity/invitation.entity';
import { createId } from '#/utils';
import { user } from '#/entity/user.entity';
import { commitReply } from '#/entity/commitReply.entity';
import ac from '#/ac';
import { NoticeService } from '../notice/notice.service';
import { commitLike } from '#/entity/commitLike.entity';

@Injectable()
export class CommentService {

    constructor(
        @InjectRepository(commit)
        private commitRepository: Repository<commit>,
        @InjectRepository(invitation)
        private invitationRepository: Repository<invitation>,
        @InjectRepository(user)
        private userRepository: Repository<user>,
        @InjectRepository(commitReply)
        private commitReplyRepository: Repository<commitReply>,
        @InjectRepository(commitLike)
        private commitLikeRepository: Repository<commitLike>,
        private readonly noticeService: NoticeService
    ) { }

    async postComment(uid1: string, iid: string, text: string): Promise<postCommentRes> {
        text = ac.replace(text)
        const res: postCommentRes = {
            res: 1,
            replys: []
        }
        try {
            const cid = createId()
            const { owner, plate }: { owner: string, plate: string } = await this.invitationRepository.findOne({ select: { owner: true, plate: true }, where: { iid } })
            const pBlack: boolean = await this.noticeService.isPlateBlackList(uid1, plate)
            if (pBlack) res.res = 12
            else {
                const uBlack: boolean = await this.noticeService.isUserBlackList(owner, uid1)
                if (uBlack) res.res = 13
                {
                    const { floor }: { floor: number } = await this.commitRepository.createQueryBuilder().select("MAX(commit.floor)", "floor").where('commit.i_id=:iid', { iid }).getRawOne()
                    const date = new Date()
                    const comment = { uid1, uid2: owner, iid, text, cid, floor: floor ? (floor + 1) : 2, date }
                    await this.commitRepository.save(comment)
                    const uRes = await this.userRepository.createQueryBuilder()
                        .leftJoinAndSelect('plateSubscribe', 'plateSubscribe', `plateSubscribe.u_id=user.u_id And plateSubscribe.p_id='${plate}'`)
                        .leftJoinAndSelect('plate', 'plate', 'plate.p_id=plateSubscribe.p_id')
                        .select('user.u_id', 'uid')
                        .addSelect('user.name', 'name')
                        .addSelect('user.avatar', 'avatar')
                        .addSelect('plateSubscribe.level', 'level')
                        .addSelect('plateSubscribe.admin', 'admin')
                        .addSelect('plate.owner', 'owner')
                        .where('user.u_id=:uid', { uid: uid1 })
                        .getRawOne()
                    res.comment = {
                        cid: comment.cid,
                        text: comment.text,
                        floor: comment.floor,
                        date: comment.date,
                        lSum: 0,
                        rSum: 0,
                        isLike: false
                    }
                    res.owner = {
                        uid: uid1,
                        name: uRes.name,
                        leval: uRes.level,
                        avatar: uRes.avatar,
                        admin: uRes.admin ? true : false,
                        owner: uRes.owner === uRes.uid,
                        floorer: uRes.uid === owner
                    }
                }
            }
        } catch (error) {
            console.log(error)
            res.res = -1
        }
        return res
    }

    async postReply(cid: string, text: string, id: string, iid: string, uid2: string): Promise<replyRes> {
        text = ac.replace(text)
        const res: replyRes = {
            res: 1
        }
        try {
            const iRes = await this.invitationRepository.findOne({ select: { plate: true }, where: { iid } })
            const pBlack: boolean = await this.noticeService.isPlateBlackList(iRes.plate, id)
            if (pBlack) res.res = 12
            else {
                const uBlack: boolean = await this.noticeService.isUserBlackList(uid2, id)
                if (uBlack) res.res = 13
                else {
                    const cRes = await this.commitRepository.findOne({ select: { uid1: true }, where: { cid } })
                    uid2 = uid2 ? uid2 : cRes.uid1
                    const ncid = createId()
                    const reply = { cid1: ncid, cid2: cid, text, iid, pid: iRes.plate, uid1: id, uid2: uid2, date: new Date() }
                    await this.commitReplyRepository.save(reply)
                    let nRes1 = await this.userRepository.findOne({ select: { name: true }, where: { uid: reply.uid1 } })
                    const nRes2 = await this.userRepository.findOne({ select: { name: true }, where: { uid: reply.uid2 } })
                    res.reply = {
                        cid1: reply.cid1,
                        text: reply.text,
                        date: reply.date,
                        uid1: reply.uid1,
                        uid2: reply.uid2,
                        name1: nRes1.name,
                        name2: nRes2.name
                    }
                }
            }

        } catch (error) {
            console.log(error)
            res.res = -1
        }
        return res
    }

    async setLike(cid: string, uid: string, owner: string, flag: boolean) {
        const res = {
            res: 1,
            likeSum: 0
        }
        try {
            const sRes = await this.commitLikeRepository.count({ where: { cid } })
            if (flag) {
                const lRes = await this.commitLikeRepository.findOne({ where: { cid, uid } })
                this.commitLikeRepository.remove(lRes)
                res.likeSum = sRes - 1
            } else {
                await this.commitLikeRepository.save({ cid, uid, owner })
                res.likeSum = sRes + 1
            }
        } catch (error) {
            console.log(error)
            res.res = -1
        }
        return res
    }

    async deleteReply(cid: string) {
        const res = {
            res: 1
        }
        try {
            const cRes = await this.commitReplyRepository.findOne({ where: { cid1: cid } })
            if (cRes) await this.commitReplyRepository.remove(cRes)
        } catch (error) {
            console.log(error)
            res.res = -1
        }
        return res
    }

    async deleteComment(cid: string) {
        const res = {
            res: 1
        }
        try {
            const cRes = await this.commitRepository.findOne({ where: { cid } })
            if (cRes) await this.commitRepository.remove(cRes)
            await this.commitReplyRepository
                .createQueryBuilder()
                .delete()
                .where('c_id_2=:cid', { cid })
                .execute()
        } catch (error) {
            console.log(error)
            res.res = -1
        }
        return res
    }
}
