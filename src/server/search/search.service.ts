import { plate } from '#/entity/plate.entity';
import { plateUser } from '#/entity/plateUser.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { allRes } from './dto/search.dto';

@Injectable()
export class SearchService {
    constructor(

        @InjectRepository(plateUser)
        private plateUserRepository: Repository<plateUser>,

        @InjectRepository(plate)
        private plateRepository: Repository<plate>
    ) { }

    async getAll(keyWord: string): Promise<allRes> {
        const res: allRes = {
            res: 1,
            plateLists: []
        }
        try {
            const plateRes: plate = await this.plateRepository.findOne({ where: { name: keyWord } })
            if (plateRes) res.target = plateRes
            const listRes: plate[] = await this.plateRepository.createQueryBuilder()
                .select("plate.name")
                .addSelect("plate.id")
                .addSelect("plate.usum")
                .addSelect("plate.isum")
                .addSelect("plate.avatar")
                .where("plate.name <> :keyWord AND plate.name Like :lKeyWord", { keyWord, lKeyWord: `%${keyWord}%` })
                .limit(12)
                .getMany()
            if (listRes) res.plateLists = listRes
            res.plateSum = await this.plateRepository.createQueryBuilder()
                .where("plate.name <> :keyWord AND plate.name Like :lKeyWord", { keyWord, lKeyWord: `%${keyWord}%` })
                .getCount()
        } catch (error) {
            console.log(error)
            res.res = -1
        }
        return res
    }
}
