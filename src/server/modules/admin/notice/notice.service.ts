import { plateBlacklist } from '#/entity/plateBlacklist.entity';
import { userBlacklist } from '#/entity/userBlacklist.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class NoticeService {
    constructor(
        @InjectRepository(plateBlacklist)
        private plateBlacklistRepository: Repository<plateBlacklist>,
        @InjectRepository(userBlacklist)
        private userBlacklistRepository: Repository<userBlacklist>
    ) { }

    async isPlateBlackList(uid: string, pid: string): Promise<boolean> {
        try {
            const res = await this.plateBlacklistRepository.findOne({ where: { uid, pid } })
            return res ? true : false
        } catch (error) {
            console.log(error)
            return false
        }
    }

    async isUserBlackList(uid1: string, uid2: string): Promise<boolean> {
        try {
            const res = await this.userBlacklistRepository.findOne({ where: { uid1, uid2 } })
            return res ? true : false
        } catch (error) {
            console.log(error)
            return false
        }
    }
}
