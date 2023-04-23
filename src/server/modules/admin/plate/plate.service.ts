import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertResult, Repository } from 'typeorm';
import { plateSubscribe } from '#/entity/plateSubscribe.entity';
import { PreferenceRes, adminPlate, adminPlateORes, adminPlateRes, createNewPlateRes, isAdminRes, noteRes, preference, setNoticeRes, subscribeRes, unRes } from './dto/plate.dto';
import { plate } from '#/entity/plate.entity';
import { createId } from '#/utils';
import { join } from 'path';
import { createWriteStream } from 'fs';
import { upload } from '#/entity/upload.entity';
import { invitationHistory } from '#/entity/invitationHistory.entity';
import ac from '#/ac';

@Injectable()
export class PlateService {

    constructor(
        @InjectRepository(plate)
        private plateRepository: Repository<plate>,
        @InjectRepository(upload)
        private uploadRepository: Repository<upload>,
        @InjectRepository(plateSubscribe)
        private plateSubscribeRepository: Repository<plateSubscribe>,
        @InjectRepository(invitationHistory)
        private invitationHistoryRepository: Repository<invitationHistory>
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
                const insertAvatarRes: InsertResult = await this.uploadRepository.insert({ fid, name: fName, date, path, url })
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

    async getPreference(uid: string): Promise<PreferenceRes> {
        const res: PreferenceRes = {
            res: 1,
            preference: []
        }
        try {
            const pRes: preference[] = await this.invitationHistoryRepository.createQueryBuilder()
                .leftJoinAndSelect('invitation', 'invitation', 'invitation.i_id=invitationHistory.i_id')
                .leftJoinAndSelect('plate', 'plate', 'plate.p_id=invitation.plate')
                .select('plate.p_id', 'pid')
                .addSelect('plate.name', 'name')
                .addSelect('COUNT(plate.p_id)', 'sum')
                .groupBy('plate.p_id')
                .where('invitationHistory.u_id=:uid', { uid })
                .distinct(true)
                .getRawMany()
            res.preference = pRes
        } catch (error) {
            console.log(error)
            res.res = -1
        }
        return res
    }

    async getAdminPlates(uid: string): Promise<adminPlateRes> {
        const res: adminPlateRes = {
            res: 1
        }
        try {
            const pRes: adminPlate[] = await this.plateSubscribeRepository.createQueryBuilder()
                .leftJoinAndSelect('plate', 'plate', 'plate.p_id=plateSubscribe.p_id')
                .select('plate.p_id', 'pid')
                .addSelect('plate.name', 'name')
                .addSelect('plate.avatar', 'avatar')
                .addSelect('plateSubscribe.level', 'level')
                .where('plateSubscribe.u_id=:uid', { uid })
                .getRawMany()
            res.adminPlates = pRes
        } catch (error) {
            console.log(error)
            res.res = -1
        }
        return res
    }

    async getAdminPlatesA(uid: string): Promise<adminPlateRes> {
        const res: adminPlateRes = {
            res: 1
        }
        try {
            const pRes: adminPlate[] = await this.plateSubscribeRepository.createQueryBuilder()
                .leftJoinAndSelect('plate', 'plate', 'plate.p_id=plateSubscribe.p_id')
                .select('plate.p_id', 'pid')
                .addSelect('plate.name', 'name')
                .addSelect('plate.avatar', 'avatar')
                .addSelect('plateSubscribe.level', 'level')
                .where('plateSubscribe.u_id=:uid AND plateSubscribe.admin=:admin', { uid, admin: '1' })
                .getRawMany()
            res.adminPlates = pRes
        } catch (error) {
            console.log(error)
            res.res = -1
        }
        return res
    }

    async getAdminPlatesO(uid: string): Promise<adminPlateORes> {
        const res: adminPlateORes = {
            res: 1,
            adminPlatesO: []
        }
        try {
            const pRes = await this.plateRepository.find({ select: { pid: true, name: true }, where: { owner: uid } })
            res.adminPlatesO = pRes
            for (let site of res.adminPlatesO) {
                const uRes = await this.plateSubscribeRepository.createQueryBuilder()
                    .leftJoinAndSelect('user', 'user', 'user.u_id=plateSubscribe.u_id')
                    .select('user.u_id', 'uid')
                    .addSelect('user.name', 'name')
                    .addSelect('user.avatar', 'avatar')
                    .addSelect('plateSubscribe.level', 'level')
                    .where('plateSubscribe.p_id=:pid AND plateSubscribe.admin=:admin AND plateSubscribe.u_id<>:uid', { pid: site.pid, admin: '1', uid })
                    .getRawMany()
                site.admins = uRes
            }
        } catch (error) {
            console.log(error)
        }
        return res
    }

    async unAdmin(uid: string, pid: string): Promise<unRes> {
        const res: unRes = {
            res: 1
        }
        try {
            const count = await this.plateRepository.count({ where: { owner: uid, pid } })
            if (count != 0) res.res = 2
            else {
                const sRes = await this.plateSubscribeRepository.findOne({ where: { uid, pid } })
                await this.plateSubscribeRepository.save({ ...sRes, admin: 0 })
            }
        } catch (error) {
            console.log(error)
            res.res = -1
        }
        return res
    }

    async unSubscribe(uid: string, pid: string): Promise<unRes> {
        const res: unRes = {
            res: 1
        }
        try {
            const count = await this.plateRepository.count({ where: { owner: uid, pid } })
            if (count != 0) res.res = 2
            else {
                const sRes = await this.plateSubscribeRepository.findOne({ where: { uid, pid } })
                if (sRes.admin == 1) res.res = 2
                else await this.plateSubscribeRepository.remove(sRes)
            }
        } catch (error) {
            console.log(error)
            res.res = -1
        }
        return res
    }

    async unOwner(uid: string, pid: string): Promise<unRes> {
        const res: unRes = {
            res: 1
        }
        try {
            const pRes = await this.plateRepository.findOne({ where: { pid } })
            if (pRes) this.plateRepository.save({ ...pRes, owner: uid })
        } catch (error) {
            console.log(error)
            res.res = -1
        }
        return res
    }

    async setNotice(pid: string, notice: string): Promise<setNoticeRes> {
        const res: setNoticeRes = {
            res: 1
        }
        try {
            notice = ac.replace(notice)
            const pRes = await this.plateRepository.findOne({ where: { pid } })
            await this.plateRepository.save({ ...pRes, notice })
        } catch (error) {
            console.log(error)
            res.res = -1
        }
        return res
    }

    async isAdmin(uid: string, pid: string): Promise<isAdminRes> {
        const res: isAdminRes = {
            res: 1
        }
        try {
            const iRes = await this.plateSubscribeRepository.count({ where: { uid, pid, admin: 1 } })
            if (iRes == 0) res.res = 2
        } catch (error) {
            console.log(error)
            res.res = -1
        }
        return res
    }
}
