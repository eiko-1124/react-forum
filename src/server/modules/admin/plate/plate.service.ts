import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertResult, Repository } from 'typeorm';
import { plateSubscribe } from '#/entity/plateSubscribe.entity';
import { createNewPlateRes, noteRes, subscribeRes } from './dto/plate.dto';
import { plate } from '#/entity/plate.entity';
import { createId } from '#/utils';
import { join } from 'path';
import { createWriteStream } from 'fs';
import { upload } from '#/entity/upload.entity';

@Injectable()
export class PlateService {

    constructor(
        @InjectRepository(plate)
        private plateRepository: Repository<plate>,
        @InjectRepository(upload)
        private uploadRepository: Repository<upload>,
        @InjectRepository(plateSubscribe)
        private plateSubscribeRepository: Repository<plateSubscribe>
    ) { }

    async setSubscribe(uid: string, pid: string, name: string): Promise<subscribeRes | null> {
        const res: subscribeRes = {
            res: 1
        }
        if (!uid) res.res = 0
        else {
            try {
                const note = await this.plateSubscribeRepository.findOne({ where: { uid, pid } })
                if (note) { await this.plateSubscribeRepository.delete({ uid, pid }) }
                else { await this.plateSubscribeRepository.save({ uid, pid, name }) }
            } catch (error) {
                console.log(error)
                res.res = -1
            }
        }
        return res
    }

    async setNote(pid: string, uid: string): Promise<noteRes> {
        const res: noteRes = {
            res: 1
        }
        try {
            const noteInfo: plateSubscribe = await this.plateSubscribeRepository.findOne({ where: { pid, uid } })
            if (!noteInfo) res.res = 2
            else {
                const today = new Date()
                if (noteInfo.note.getDate() === today.getDate() &&
                    noteInfo.note.getMonth() === today.getMonth() &&
                    noteInfo.note.getFullYear() === today.getFullYear()) {
                    res.res = 3
                } else {
                    const exp = noteInfo.exp + 10
                    const level = exp >= 50 * Math.pow(2, noteInfo.level - 1) ? noteInfo.level + 1 : noteInfo.level
                    const maxExp = 50 * Math.pow(2, level - 1)
                    await this.plateSubscribeRepository.save({ ...noteInfo, exp, level, note: today })
                    res.ranking = {
                        exp,
                        level,
                        maxExp,
                        note: today
                    }
                }
            }
        } catch (error) {
            console.log(error)
            res.res = -1
        }
        return res
    }

    async createNewPlate(file: Express.Multer.File, uid: string, name: string, tag: string, introduction: string) {
        const res: createNewPlateRes = {
            res: 1
        }
        try {
            const hasSameName: plate = await this.plateRepository.findOne({ where: { name } })
            if (!hasSameName) {
                const fName = Buffer.from(file.originalname, 'latin1').toString('utf8')
                const fid = createId()
                const pid = createId()
                const date = new Date()
                const path = join(__dirname, '../../../../public/plate', `${fid + '-' + fName}`)
                const url = `http://localhost:3000/static/plate/${fid + '-' + fName}`
                const writeSteam = createWriteStream(path)
                await new Promise<void>((resolve, reject) => writeSteam.write(file.buffer, (Err) => {
                    if (Err) reject(Err)
                    resolve()
                }))
                const insertAvatarRes: InsertResult = await this.uploadRepository.insert({ fid, name, date, path, url })
                if (insertAvatarRes.raw.affectedRows === 0) throw new Error('stop')
                const createPlateRes: InsertResult = await this.plateRepository.insert({ pid, name, introduction, avatar: url, tag, owner: uid, notice: '' })
                if (createPlateRes.raw.affectedRows === 0) throw new Error('stop')
                const insertPlateUser: InsertResult = await this.plateSubscribeRepository.insert({ uid, pid, name, admin: 1 })
                if (insertPlateUser.raw.affectedRows === 0) throw new Error('stop')
                res.id = pid
            }
            else res.res = 2
        } catch (error) {
            console.log(error)
            res.res = -1
        }
        return res
    }
}
