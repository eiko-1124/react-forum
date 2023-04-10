import { plate } from '#/entity/plate.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, InsertResult } from 'typeorm';
import { createNewPlateRes, detailsRes, simpleSearchRes } from './dto/plate.dto';
import { join } from 'path';
import { createId } from '#/utils';
import { createWriteStream } from 'fs';
import { upload } from '#/entity/upload.entity';
import { plateUser } from '#/entity/plateUser.entity';

@Injectable()
export class PlateService {
    constructor(
        @InjectRepository(plate)
        private plateRepository: Repository<plate>,
        @InjectRepository(upload)
        private uploadRepository: Repository<upload>,
        @InjectRepository(plateUser)
        private plateUserRepository: Repository<plateUser>
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

    async createNewPlate(file: Express.Multer.File, id: string, name: string, tag: string, introduction: string) {
        const res: createNewPlateRes = {
            res: 1
        }
        try {
            const hasSameName: plate[] = await this.plateRepository.find({ where: { name } })
            if (hasSameName.length === 0) {
                const fName = Buffer.from(file.originalname, 'latin1').toString('utf8')
                const fId = createId()
                const pId = createId()
                const date = new Date()
                const path = join(__dirname, '../../public/plate', `${fId + '-' + fName}`)
                const url = `http://localhost:3000/static/plate/${fId + '-' + fName}`
                const writeSteam = createWriteStream(path)
                await new Promise<void>((resolve, reject) => writeSteam.write(file.buffer, (Err) => {
                    if (Err) reject(Err)
                    resolve()
                }))
                const insertAvatarRes: InsertResult = await this.uploadRepository.insert({ id: fId, name, date, path, url })
                if (insertAvatarRes.raw.affectedRows === 0) throw new Error('stop')
                const createPlateRes: InsertResult = await this.plateRepository.insert({ id: pId, name, introduction, usum: 1, isum: 0, avatar: url, tag })
                if (createPlateRes.raw.affectedRows === 0) throw new Error('stop')
                const insertPlateUser: InsertResult = await this.plateUserRepository.insert({ uid: id, pid: pId, owner: '1', manager: '0' })
                if (insertPlateUser.raw.affectedRows === 0) throw new Error('stop')
                res.id = pId
            }
            else res.res = 2
        } catch (error) {
            console.log(error)
            res.res = -1
        }
        return res
    }

    async getDetails(id: string): Promise<detailsRes> {
        const res: detailsRes = {
            res: 1
        }
        try {
            const detailsRes: plate = await this.plateRepository.findOne({ where: { id } })
            if (!detailsRes) res.res = 2
            else res.target = detailsRes
        } catch (error) {
            console.log(error)
            res.res = -1
        }
        return res
    }
}
