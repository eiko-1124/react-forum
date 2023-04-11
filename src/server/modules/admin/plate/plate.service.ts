import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plateSubscribe } from '#/entity/plateSubscribe.entity';
import { noteRes, subscribeRes } from './dto/plate.dto';

@Injectable()
export class PlateService {

    constructor(
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
}
