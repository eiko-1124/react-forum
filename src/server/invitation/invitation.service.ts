import { invitation } from '#/entity/invitation.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { publishRes } from './dto/invitation.dto';
import { createId } from '#/utils';

@Injectable()
export class InvitationService {

    constructor(
        @InjectRepository(invitation)
        private invitationRepository: Repository<invitation>
    ) { }

    async publish(pid: string, uid: string, title: string, text: string): Promise<publishRes> {
        const res: publishRes = {
            res: 1
        }
        try {
            const id = createId()
            await this.invitationRepository.insert({ pid, uid, id, title, text })
            res.id = id
        } catch (error) {
            console.log(error)
            res.res = -1
        }
        return res
    }
}
