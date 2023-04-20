import { Injectable } from '@nestjs/common';
import { TopRes, dInvitation, invitationRes, owner, substanceRes, tInvitation } from './dto/invitation.dto';
import { invitation } from '#/entity/invitation.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { user } from '#/entity/user.entity';
import { plateSubscribe } from '#/entity/plateSubscribe.entity';
import { invitationHistory } from '#/entity/invitationHistory.entity';
import { invitationLike } from '#/entity/invitationLike.entity';
import { invitationCollect } from '#/entity/invitationCollect.entity';
import { commit } from '#/entity/commit.entity';
import { commitReply } from '#/entity/commitReply.entity';

@Injectable()
export class InvitationService {

    constructor(
        @InjectRepository(invitation)
        private invitationRepository: Repository<invitation>,
        @InjectRepository(user)
        private userRepository: Repository<user>,
        @InjectRepository(plateSubscribe)
        private plateSubscribeRepository: Repository<plateSubscribe>,
        @InjectRepository(invitationHistory)
        private invitationHistoryRepository: Repository<invitationHistory>,
        @InjectRepository(invitationLike)
        private invitationLikeRepository: Repository<invitationLike>,
        @InjectRepository(invitationCollect)
        private invitationCollectRepository: Repository<invitationCollect>,
        @InjectRepository(commit)
        private commitRepository: Repository<commit>,
        @InjectRepository(commitReply)
        private commitReplyRepository: Repository<commitReply>
    ) { }

    async getTops(pid: string): Promise<TopRes> {
        const res: TopRes = {
            res: 1,
            tops: []
        }
        try {
            const tops: tInvitation[] = await this.invitationRepository.find({ select: { iid: true, title: true }, where: { plate: pid, top: 1 } })
            res.tops = tops
        } catch (error) {
            console.log(error)
        }
        return res
    }

    async getInvitation(iid: string, pid: string): Promise<invitationRes> {

        const res: invitationRes = {
            res: 1
        }
        try {
            const iRes: dInvitation = await this.queryInvitation(iid)
            const uRes: owner = await this.queryOwner(iRes.owner)
            const level: number = await this.queryLevel(iRes.owner, pid)
            const acSum: number = await this.queryAllCommentSum(iid)
            const coSum: number = await this.queryCollectSum(iid)
            const lSum: number = await this.queryLikeSum(iid)
            const pSum: number = await this.queryPageSum(iid)
            res.invitation = iRes
            res.invitation.acSum = acSum
            res.invitation.coSum = coSum
            res.invitation.lSum = lSum
            res.invitation.pSum = pSum
            res.owner = uRes
            res.owner.level = level
        } catch (error) {
            console.log(error)
            res.res = -1
        }
        return res
    }

    async queryInvitation(iid: string): Promise<dInvitation> {
        const res: invitation = await this.invitationRepository.findOne({
            select: {
                iid: true,
                owner: true,
                text: true,
                title: true,
                date: true
            },
            where: { iid }
        })
        if (!res) throw new Error('error')
        return res
    }

    async queryOwner(uid: string): Promise<owner> {
        const res: owner = await this.userRepository.findOne({
            select: {
                name: true,
                uid: true,
                avatar: true
            },
            where: {
                uid
            }
        })
        if (!res) throw new Error('error')
        return res
    }

    async queryLevel(uid: string, pid: string): Promise<number> {
        const { level }: { level: number } = await this.plateSubscribeRepository.findOne({ select: { level: true }, where: { uid, pid } })
        if (level === undefined || level === null) throw new Error('error')
        return level
    }

    async queryVeiwSum(iid: string): Promise<number> {
        const vSum: number = await this.invitationHistoryRepository.count({ where: { iid } })
        if (vSum === undefined || vSum === null) throw new Error('error')
        return vSum
    }

    async queryAllCommentSum(iid: string): Promise<number> {
        const cSum: number = await this.commitRepository.count({ where: { iid } })
        const rSum: number = await this.commitReplyRepository.count({ where: { iid } })
        if (cSum === undefined || cSum === null || rSum === undefined || rSum === undefined) throw new Error('error')
        return cSum + rSum
    }

    async queryLikeSum(iid: string): Promise<number> {
        const lSum: number = await this.invitationLikeRepository.count({ where: { iid } })
        if (lSum === undefined || lSum === null) throw new Error('error')
        return lSum
    }

    async queryPageSum(iid: string): Promise<number> {
        const pSum: number = await this.commitRepository.count({ where: { iid } })
        if (pSum === undefined || pSum === null) throw new Error('error')
        return pSum
    }

    async queryCollectSum(iid: string): Promise<number> {
        const cSum: number = await this.invitationCollectRepository.count({ where: { iid } })
        if (cSum === undefined || cSum === null) throw new Error('error')
        return cSum
    }

    async queryIsLike(iid: string, uid: string): Promise<number> {
        if (!uid) return 0
        const res: number = await this.invitationLikeRepository.count({ where: { iid, uid } })
        if (res === undefined || res === null) throw new Error('error')
        return res
    }

    async queryIsCollect(iid: string, uid: string): Promise<number> {
        if (!uid) return 0
        const res: number = await this.invitationCollectRepository.count({ where: { iid, uid } })
        if (res === undefined || res === null) throw new Error('error')
        return res
    }

    async setHistory(iid: string, uid: string): Promise<null> {
        if (!uid) return
        await this.invitationHistoryRepository.save({ iid, uid })
        return
    }

    async getSubstance(iid: string, uid: string): Promise<substanceRes> {
        const res: substanceRes = {
            res: 1
        }
        try {
            await this.setHistory(iid, uid)
            const vSum: number = await this.queryVeiwSum(iid)
            const isCollect = await this.queryIsCollect(iid, uid)
            const isLike = await this.queryIsLike(iid, uid)
            res.vSum = vSum
            res.isCollect = isCollect
            res.isLike = isLike
        } catch (error) {
            console.log(error)
            res.res = -1
        }
        return res
    }
}
