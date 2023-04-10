import { plate } from '#/entity/plate.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plateListRes, plateSumRes } from './dto/plate.dto';

@Injectable()
export class PlateService {

    constructor(
        @InjectRepository(plate)
        private plateRepository: Repository<plate>
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
}
