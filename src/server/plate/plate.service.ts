import { plate } from '#/entity/plate.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, Not, Equal } from 'typeorm';
import { simpleSearchRes } from './dto/plate.dto';

@Injectable()
export class PlateService {
    constructor(
        @InjectRepository(plate)
        private plateRepository: Repository<plate>
    ) { }

    async simpleSearch(keyWord: string): Promise<simpleSearchRes> {
        const res: simpleSearchRes = {
            res: 1
        }
        try {
            let num = 6
            const target: plate[] = await this.plateRepository.find({ select: { id: true, name: true, introduction: true }, where: { name: keyWord } })
            if (target.length === 0) res.target = null
            else {
                res.target = target[0]
                num--
            }
            const list: plate[] = await this.plateRepository.createQueryBuilder().select("plate.name").addSelect("plate.id").where("plate.name <> :keyWord AND plate.name Like :lKeyWord", { keyWord, lKeyWord: `%${keyWord}%` }).limit(num).getMany()
            if (list.length === 0) res.list = []
            else res.list = list
        } catch (error) {
            console.log(error)
            res.res = -1
        }
        return res
    }
}
