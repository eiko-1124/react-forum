import { Injectable } from '@nestjs/common';
import { invitation } from '#/entity/invitation.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { adminInvitation, adminInvitationRes, collectRes, deleteRes, getSubscribeInvitationRes, invitationDetailRes, likeRes, publishRes, updateInvitationRes } from './dto/invitation.dto';
import { createId, formatText } from '#/utils';
import { invitationLike } from '#/entity/invitationLike.entity';
import { invitationCollect } from '#/entity/invitationCollect.entity';
import ac from '#/ac';
import { invitationHistory } from '#/entity/invitationHistory.entity';
import { NoticeService } from '../notice/notice.service';
import { commit } from '#/entity/commit.entity';
import { commitReply } from '#/entity/commitReply.entity';


@Injectable()
export class InvitationService {

    constructor(
        @InjectRepository(invitation)
        private invitationRepository: Repository<invitation>,
        @InjectRepository(invitationLike)
        private invitationLikeRepository: Repository<invitationLike>,
        @InjectRepository(invitationCollect)
        private invitationCollectRepository: Repository<invitationCollect>,
        @InjectRepository(invitationHistory)
        private invitationHistoryRepository: Repository<invitationHistory>,
        @InjectRepository(commit)
        private commitRepository: Repository<commit>,
        @InjectRepository(commitReply)
        private commitReplyRepository: Repository<commitReply>,
        private readonly noticeService: NoticeService
    ) { }

    async publish(pid: string, uid: string, title: string, text: string) {
        title = ac.replace(title)
        text = ac.replace(text)
        const res: publishRes = {
            res: 1
        }
        try {
            const black = await this.noticeService.isPlateBlackList(uid, pid)
            if (!black) {
                const iid = createId()
                await this.invitationRepository.insert({ plate: pid, owner: uid, iid, title, text })
                res.id = iid
            }
            else res.res = 12
        } catch (error) {
            console.log(error)
            res.res = -1
        }
        return res
    }

    async setLike(uid: string, iid: string, flag: boolean, owner: string): Promise<likeRes> {
        const res: likeRes = {
            res: 1
        }
        try {
            if (flag) {
                await this.invitationLikeRepository.save({ uid, iid, owner })
                res.lSum = await this.invitationLikeRepository.count({ where: { iid } })
            }
            else {
                res.lSum = await this.invitationLikeRepository.count({ where: { iid } }) - 1
                const site: invitationLike = await this.invitationLikeRepository.findOne({ where: { uid, iid } })
                this.invitationLikeRepository.remove(site)
            }
        } catch (error) {
            console.log(error)
            res.res = -1
        }
        return res
    }

    async setCollect(uid: string, iid: string, flag: boolean, floor: number): Promise<collectRes> {
        const res: collectRes = {
            res: 1
        }
        try {
            if (flag) {
                await this.invitationCollectRepository.save({ uid, iid, floor })
                res.cSum = await this.invitationCollectRepository.count({ where: { iid } })
            }
            else {
                const site: invitationCollect = await this.invitationCollectRepository.findOne({ where: { uid, iid } })
                this.invitationCollectRepository.remove(site)
                res.cSum = await this.invitationCollectRepository.count({ where: { iid } })
            }
        } catch (error) {
            console.log(error)
            res.res = -1
        }
        return res
    }

    async getAdminInvitationList(uid: string, page: number): Promise<adminInvitationRes> {
        const res: adminInvitationRes = {
            res: 1,
            pSum: 0,
            adminInvitations: []
        }
        try {
            const iRes: adminInvitation[] = await this.invitationRepository.find({ select: { iid: true, title: true, text: true, plate: true }, where: { owner: uid }, order: { date: 'ASC' }, take: 6, skip: page * 6 })
            const pRes: number = await this.invitationRepository.count({ where: { owner: uid } })
            for (let site of iRes) {
                site.text = formatText(site.text)
                console.log(site)
            }
            res.pSum = pRes
            res.adminInvitations = iRes
        } catch (error) {
            console.log(error)
            res.res = -1
        }
        return res
    }

    async deleteAdminInvitation(iid: string): Promise<deleteRes> {
        const res: deleteRes = {
            res: 1
        }
        try {
            const iRes = await this.invitationRepository.findOne({ where: { iid } })
            await this.invitationRepository.remove(iRes)
            await this.invitationHistoryRepository.createQueryBuilder()
                .delete()
                .where('i_id=:iid', { iid })
                .execute()
            await this.invitationCollectRepository.createQueryBuilder()
                .delete()
                .where('i_id=:iid', { iid })
                .execute()
            await this.invitationLikeRepository.createQueryBuilder()
                .delete()
                .where('i_id=:iid', { iid })
                .execute()
            await this.commitRepository.createQueryBuilder()
                .delete()
                .where('i_id=:iid', { iid })
                .execute()
            await this.commitReplyRepository.createQueryBuilder()
                .delete()
                .where('i_id=:iid', { iid })
                .execute()
        } catch (error) {
            console.log(error)
            res.res = -1
        }
        return res
    }

    async getInvitationDetail(iid: string): Promise<invitationDetailRes> {
        const res: invitationDetailRes = {
            res: 1,
            title: '',
            text: ''
        }
        try {
            const iRes = await this.invitationRepository.findOne({ select: { title: true, text: true }, where: { iid } })
            if (iRes) {
                res.title = iRes.title
                res.text = iRes.text
            }
        } catch (error) {
            console.log(error)
        }
        return res
    }

    async updateInvitation(iid: string, title: string, text: string): Promise<updateInvitationRes> {
        const res: updateInvitationRes = {
            res: 1
        }
        try {
            text = ac.replace(text)
            title = ac.replace(title)
            const iRes = await this.invitationRepository.findOne({ where: { iid } })
            if (iRes) await this.invitationRepository.save({ ...iRes, title, text })
        } catch (error) {
            console.log(error)
            res.res = -1
        }
        return res
    }

    async getAdminHistoryList(uid: string, page: number): Promise<adminInvitationRes> {
        const res: adminInvitationRes = {
            res: 1,
            pSum: 0,
            adminInvitations: []
        }
        try {
            const iRes: adminInvitation[] = await this.invitationHistoryRepository.createQueryBuilder()
                .leftJoinAndSelect('invitation', 'invitation', 'invitation.i_id=invitationHistory.i_id')
                .select('invitation.i_id', 'iid')
                .addSelect('invitation.title', 'title')
                .addSelect('invitation.text', 'text')
                .addSelect('invitation.plate', 'plate')
                .where('invitationHistory.u_id=:uid', { uid })
                .orderBy('invitationHistory.date', 'ASC')
                .limit(6)
                .offset(page * 6)
                .getRawMany()
            const pRes: number = await this.invitationHistoryRepository.count({ where: { uid } })
            for (let site of iRes) {
                site.text = formatText(site.text)
            }
            res.pSum = pRes
            res.adminInvitations = iRes
        } catch (error) {
            console.log(error)
            res.res = -1
        }
        return res
    }

    async deleteAdminHistory(iid: string): Promise<deleteRes> {
        const res: deleteRes = {
            res: 1
        }
        try {
            const iRes = await this.invitationHistoryRepository.findOne({ where: { iid } })
            await this.invitationHistoryRepository.remove(iRes)
        } catch (error) {
            console.log(error)
            res.res = -1
        }
        return res
    }

    async getAdminCollectList(uid: string, page: number): Promise<adminInvitationRes> {
        const res: adminInvitationRes = {
            res: 1,
            pSum: 0,
            adminInvitations: []
        }
        try {
            const iRes: adminInvitation[] = await this.invitationCollectRepository.createQueryBuilder()
                .leftJoinAndSelect('invitation', 'invitation', 'invitation.i_id=invitationCollect.i_id')
                .select('invitation.i_id', 'iid')
                .addSelect('invitation.title', 'title')
                .addSelect('invitation.text', 'text')
                .addSelect('invitation.plate', 'plate')
                .addSelect('invitationCollect.floor', 'floor')
                .where('invitationCollect.u_id=:uid', { uid })
                .orderBy('invitationCollect.date', 'ASC')
                .limit(6)
                .offset(page * 6)
                .getRawMany()
            const pRes: number = await this.invitationCollectRepository.count({ where: { uid } })
            for (let site of iRes) {
                site.text = formatText(site.text)
            }
            res.pSum = pRes
            res.adminInvitations = iRes
        } catch (error) {
            console.log(error)
            res.res = -1
        }
        return res
    }

    async deleteAdminCollect(iid: string): Promise<deleteRes> {
        const res: deleteRes = {
            res: 1
        }
        try {
            const iRes = await this.invitationCollectRepository.findOne({ where: { iid } })
            await this.invitationCollectRepository.remove(iRes)
        } catch (error) {
            console.log(error)
            res.res = -1
        }
        return res
    }

    async getSubscribeInvitation(uid: string, page: number): Promise<getSubscribeInvitationRes> {
        const res: getSubscribeInvitationRes = {
            res: 1,
            subscribeInvitations: [],
            iSum: 0
        }
        if (!page) return res
        try {
            const iRes = await this.invitationRepository.createQueryBuilder()
                .leftJoinAndSelect('plate', 'plate', 'invitation.plate=plate.p_id')
                .leftJoinAndSelect('user_fans', 'user_fans', 'user_fans.u_id_2=invitation.owner')
                .leftJoinAndSelect('user', 'user', 'user.u_id=user_fans.u_id_2')
                .select('invitation.i_id', 'iid')
                .addSelect('invitation.title', 'title')
                .addSelect('invitation.text', 'text')
                .addSelect('invitation.date', 'date')
                .addSelect('plate.p_id', 'pid')
                .addSelect('plate.name', 'pName')
                .addSelect('user.u_id', 'uid')
                .addSelect('user.name', 'uName')
                .where('user_fans.u_id_1=:uid', { uid })
                .orderBy('invitation.date', 'ASC')
                .limit(12)
                .offset(12 * page)
                .getRawMany()
            res.subscribeInvitations = iRes
            const sRes = await this.invitationRepository.createQueryBuilder()
                .leftJoinAndSelect('user_fans', 'user_fans', 'user_fans.u_id_2=invitation.owner')
                .where('user_fans.u_id_1=:uid', { uid })
                .getCount()
            res.iSum = sRes
        } catch (error) {
            console.log(error)
            res.res = -1
        }
        return res
    }

    async setQuality(iid: string, flag: boolean) {
        const res = {
            res: 1
        }
        try {
            const iRes = await this.invitationRepository.findOne({ where: { iid } })
            if (flag) await this.invitationRepository.save({ ...iRes, quality: 0 })
            else await this.invitationRepository.save({ ...iRes, quality: 1 })
        } catch (error) {
            console.log(error)
            res.res = -1
        }
        return res
    }

    async setTop(iid: string, flag: boolean) {
        const res = {
            res: 1
        }
        try {
            const iRes = await this.invitationRepository.findOne({ where: { iid } })
            if (flag) await this.invitationRepository.save({ ...iRes, top: 0 })
            else await this.invitationRepository.save({ ...iRes, top: 1 })
        } catch (error) {
            console.log(error)
            res.res = -1
        }
        return res
    }
}
