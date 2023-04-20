import { upload } from '#/entity/upload.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertResult, Repository } from 'typeorm';
import { uploadImageRes, uploadVideoRes } from './dto/upload.dto';
import { createWriteStream } from 'fs';
import { join } from 'path';
import { createId } from '#/utils';

@Injectable()
export class UploadService {
    constructor(
        @InjectRepository(upload)
        private uploadRepository: Repository<upload>
    ) { }

    async uploadImage(file: Express.Multer.File): Promise<uploadImageRes> {
        const res: uploadImageRes = {
            errno: 0
        }
        try {
            const name = Buffer.from(file.originalname, 'latin1').toString('utf8')
            const fid = createId()
            const date = new Date()
            const path = join(__dirname, '../../../../public/image', `${fid + '-' + name}`)
            const url = `http://localhost:3000/static/image/${fid + '-' + name}`
            const writeSteam = createWriteStream(path)
            await new Promise<void>((resolve, reject) => writeSteam.write(file.buffer, (Err) => {
                if (Err) reject(Err)
                resolve()
            }))
            const insertRes: InsertResult = await this.uploadRepository.insert({ fid, name, date, path, url })
            if (insertRes.raw.affectedRows === 0) {
                res.errno = 1
                res.message = '上传出错'
            } else res.data = {
                url
            }
        } catch (error) {
            console.log(error)
            res.errno = 1
            res.message = '上传出错'
        }
        return res
    }

    async uploadVideo(file: Express.Multer.File): Promise<uploadVideoRes> {
        const res: uploadVideoRes = {
            errno: 0
        }
        try {
            const name = Buffer.from(file.originalname, 'latin1').toString('utf8')
            const fid = createId()
            const date = new Date()
            const path = join(__dirname, '../../../../public/video', `${fid + '-' + name}`)
            const url = `http://localhost:3000/static/video/${fid + '-' + name}`
            const writeSteam = createWriteStream(path)
            await new Promise<void>((resolve, reject) => writeSteam.write(file.buffer, (Err) => {
                if (Err) reject(Err)
                resolve()
            }))
            const insertRes: InsertResult = await this.uploadRepository.insert({ fid, name, date, path, url })
            if (insertRes.raw.affectedRows === 0) {
                res.errno = 1
                res.message = '上传出错'
            } else res.data = {
                url
            }
        } catch (error) {
            console.log(error)
            res.errno = 1
            res.message = '上传出错'
        }
        console.log(res)
        return res
    }
}
