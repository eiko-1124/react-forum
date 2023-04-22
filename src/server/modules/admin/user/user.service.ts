import { user } from '#/entity/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { queryInfoRes, setAvatarRes, setNameRes, userInfoRes } from './dto/user.dto';
import { invitationLike } from '#/entity/invitationLike.entity';
import { commitLike } from '#/entity/commitLike.entity';
import { invitation } from '#/entity/invitation.entity';
import { commit } from '#/entity/commit.entity';
import { commitReply } from '#/entity/commitReply.entity';
import { userFans } from '#/entity/userFans.entity';
import { plateSubscribe } from '#/entity/plateSubscribe.entity';
import { createId } from '#/utils';
import { join } from 'path';
import { createWriteStream } from 'fs';
import { upload } from '#/entity/upload.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(user)
    private userRepository: Repository<user>,
    @InjectRepository(invitationLike)
    private invitationLikeRepository: Repository<invitationLike>,
    @InjectRepository(commitLike)
    private commitLikeRepository: Repository<commitLike>,
    @InjectRepository(invitation)
    private invitationRepository: Repository<invitation>,
    @InjectRepository(commit)
    private commitRepository: Repository<commit>,
    @InjectRepository(commitReply)
    private commitReplyRepository: Repository<commitReply>,
    @InjectRepository(userFans)
    private userFansRepository: Repository<userFans>,
    @InjectRepository(upload)
    private uploadRepository: Repository<upload>,
  ) { }

  async getUserInfo(id: string): Promise<userInfoRes> {
    const res: userInfoRes = {
      res: 1,
    }
    if (id) {
      try {
        res.info = await this.queryInfo(id)
        if (!res.info) throw new Error('info error')
      } catch (error) {
        console.log(error)
        res.res = 2
      }
    } else {
      res.res = -1
    }
    return res
  }

  async queryInfo(uid: string): Promise<queryInfoRes | null> {
    let res: object = {}
    try {
      const info = await this.userRepository.findOne({ where: { uid } })
      res['name'] = info.name
      res['avatar'] = info.avatar
      res['like'] = await this.invitationLikeRepository.count({ where: { owner: uid } }) + await this.commitLikeRepository.count({ where: { owner: uid } })
      res['publish'] = await this.invitationRepository.count({ where: { owner: uid } })
      res['reply'] = await this.commitRepository.count({ where: { uid2: uid } }) + await this.commitReplyRepository.count({ where: { uid2: uid } })
      res['subscribe'] = await this.userFansRepository.count({ where: { uid1: uid } })
      res['fans'] = await this.userFansRepository.count({ where: { uid2: uid } })
    } catch (error) {
      console.log(error)
      return null
    }
    return res as queryInfoRes
  }

  async setName(uid: string, name: string): Promise<setNameRes> {
    const res: setNameRes = {
      res: 1
    }
    try {
      const info = await this.userRepository.findOne({ where: { uid } })
      if (info) await this.userRepository.save({ ...info, name })
    } catch (error) {
      console.log(error)
      res.res = -1
    }
    return res
  }

  async setAvatar(file: Express.Multer.File, uid: string): Promise<setAvatarRes> {
    const res: setAvatarRes = {
      res: 1,
      url: null
    }
    try {
      const fName = Buffer.from(file.originalname, 'latin1').toString('utf8')
      const fid = createId()
      const date = new Date()
      const path = join(__dirname, '../../../../public/avatar', `${fid + '-' + fName}`)
      const url = `http://localhost:3000/static/avatar/${fid + '-' + fName}`
      const writeSteam = createWriteStream(path)
      await new Promise<void>((resolve, reject) => writeSteam.write(file.buffer, (Err) => {
        if (Err) reject(Err)
        resolve()
      }))
      await this.uploadRepository.insert({ fid, name: fName, date, path, url })
      const info = await this.userRepository.findOne({ where: { uid } })
      if (info) await this.userRepository.save({ ...info, avatar: url })
      res.url = url
    } catch (error) {
      console.log(error)
      res.res = -1
    }
    return res
  }
}
