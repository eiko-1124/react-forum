import { Injectable } from '@nestjs/common';
import { TopRes, tInvitation } from './dto/invitation.dto';
import { invitation } from '#/entity/invitation.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class InvitationService {

    constructor(
        @InjectRepository(invitation)
        private plateRepository: Repository<invitation>
    ) { }

    async getTops(pid: string): Promise<TopRes> {
        const res: TopRes = {
            res: 1,
            tInvitation: []
        }
        try {
            const tops: tInvitation[] = await this.plateRepository.find({ select: { iid: true, title: true }, where: { plate: pid, top: 1 } })
            res.tInvitation = tops
        } catch (error) {
            console.log(error)
        }
        return res
    }
}
