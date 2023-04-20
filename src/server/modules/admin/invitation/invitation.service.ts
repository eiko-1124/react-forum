import { Injectable } from '@nestjs/common';
import { invitation } from '#/entity/invitation.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { collectRes, likeRes, publishRes } from './dto/invitation.dto';
import { createId } from '#/utils';
import { invitationLike } from '#/entity/invitationLike.entity';
import { invitationCollect } from '#/entity/invitationCollect.entity';
import ac from '#/ac';


@Injectable()
export class InvitationService {

    constructor(
        @InjectRepository(invitation)
        private invitationRepository: Repository<invitation>,
        @InjectRepository(invitationLike)
        private invitationLikeRepository: Repository<invitationLike>,
        @InjectRepository(invitationCollect)
        private invitationCollectRepository: Repository<invitationCollect>
    ) { }

    async publish(pid: string, uid: string, title: string, text: string) {
        title = ac.replace(title)
        text = ac.replace(text)
        const res: publishRes = {
            res: 1
        }
        try {
            const iid = createId()
            await this.invitationRepository.insert({ plate: pid, owner: uid, iid, title, text })
            res.id = iid
        } catch (error) {
            console.log(error)
            res.res = -1
        }
        return res
    }

    async setLike(iid: string, uid: string, flag: boolean, owner: string): Promise<likeRes> {
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

    async setCollect(iid: string, uid: string, flag: boolean, floor: number): Promise<collectRes> {
        const res: collectRes = {
            res: 1
        }
        try {
            if (flag) await this.invitationCollectRepository.save({ uid, iid, floor })
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
}
