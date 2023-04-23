import { user } from '#/entity/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { friend, getFriendsRes, getPlateBlackListRes, getUserBlackListRes, queryInfoRes, setAvatarRes, setFriendRes, setNameRes, setPlateBlackList, setUserBlackList, unFriendRes, unPlateBlackList, unUserBlackList, userBlackList, userInfoRes } from './dto/user.dto';
import { invitationLike } from '#/entity/invitationLike.entity';
import { commitLike } from '#/entity/commitLike.entity';
import { invitation } from '#/entity/invitation.entity';
import { commit } from '#/entity/commit.entity';
import { commitReply } from '#/entity/commitReply.entity';
import { userFans } from '#/entity/userFans.entity';
import { createId } from '#/utils';
import { join } from 'path';
import { createWriteStream } from 'fs';
import { upload } from '#/entity/upload.entity';
import { plate } from '#/entity/plate.entity';
import { userBlacklist } from '#/entity/userBlacklist.entity';
import { plateBlacklist } from '#/entity/plateBlacklist.entity';
import { plateSubscribe } from '#/entity/plateSubscribe.entity';

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
    @InjectRepository(plate)
    private plateRepository: Repository<plate>,
    @InjectRepository(userBlacklist)
    private userBlacklistRepository: Repository<userBlacklist>,
    @InjectRepository(plateBlacklist)
    private plateBlacklistRepository: Repository<plateBlacklist>,
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

  async getFrineds(uid: string): Promise<getFriendsRes> {
    const res: getFriendsRes = {
      res: 1
    }
    try {
      const fRse1: friend[] = await this.userFansRepository.createQueryBuilder()
        .leftJoinAndSelect('user', 'user', 'user.u_id=userFans.u_id_2')
        .select('user.u_id', 'uid')
        .addSelect('user.name', 'name')
        .addSelect('user.avatar', 'avatar')
        .where('userFans.u_id_1=:uid', { uid })
        .getRawMany()
      const fRse2: friend[] = await this.userFansRepository.createQueryBuilder()
        .leftJoinAndSelect('user', 'user', 'user.u_id=userFans.u_id_1')
        .select('user.u_id', 'uid')
        .addSelect('user.name', 'name')
        .addSelect('user.avatar', 'avatar')
        .where('userFans.u_id_2=:uid', { uid })
        .getRawMany()
      res.subscribers = fRse1
      res.fans = fRse2
    } catch (error) {
      console.log(error)
      res.res = -1
    }
    return res
  }

  async unFriend(uid1: string, uid2: string): Promise<unFriendRes> {
    const res: unFriendRes = {
      res: 1
    }
    try {
      const fRes = await this.userFansRepository.findOne({ where: { uid1, uid2 } })
      if (fRes) await this.userFansRepository.remove(fRes)
    } catch (error) {
      console.log(error)
      res.res = -1
    }
    return res
  }

  async setFriend(uid1: string, uid2: string): Promise<setFriendRes> {
    const res: setFriendRes = {
      res: 1
    }
    try {
      await this.userFansRepository.save({ uid1, uid2 })
    } catch (error) {
      console.log(error)
      res.res = -1
    }
    return res
  }

  async getUserBlackList(uid: string): Promise<getUserBlackListRes> {
    const res: getUserBlackListRes = {
      res: 1
    }
    try {
      const fRse: userBlackList[] = await this.userRepository.createQueryBuilder()
        .leftJoinAndSelect('user_blacklist', 'user_blacklist', 'user_blacklist.u_id_2=user.u_id')
        .select('user.u_id', 'uid')
        .addSelect('user.name', 'name')
        .addSelect('user.avatar', 'avatar')
        .where('user_blacklist.u_id_1=:uid', { uid })
        .getRawMany()
      res.blackList = fRse
    } catch (error) {
      console.log(error)
    }
    return res
  }

  async unUserBlackList(uid1: string, uid2: string): Promise<unUserBlackList> {
    const res: unUserBlackList = {
      res: 1
    }
    try {
      const uRes = await this.userBlacklistRepository.findOne({ where: { uid1, uid2 } })
      if (uRes) await this.userBlacklistRepository.remove(uRes)
    } catch (error) {
      console.log(error)
      res.res = -1
    }
    return res
  }

  async setUserBlackList(uid1: string, uid2: string): Promise<setUserBlackList> {
    const res: setUserBlackList = {
      res: 1
    }
    try {
      await this.userBlacklistRepository.save({ uid1, uid2 })
    } catch (error) {
      console.log(error)
      res.res = -1
    }
    return res
  }

  async getPlateBlackList(uid: string): Promise<getPlateBlackListRes> {
    console.log(uid)
    const res: getPlateBlackListRes = {
      res: 1
    }
    try {
      const pRes = await this.plateRepository.createQueryBuilder()
        .leftJoinAndSelect('plate_subscribe', 'plate_subscribe', 'plate_subscribe.p_id=plate.p_id')
        .select('plate.p_id', 'pid')
        .addSelect('plate.name', 'name')
        .where('plate_subscribe.u_id=:uid AND plate_subscribe.admin=:admin', { uid, admin: 1 })
        .getRawMany()
      res.plate = pRes
      for (let i = 0; i < pRes.length; i++) {
        const bRes = await this.userRepository.createQueryBuilder()
          .leftJoinAndSelect('plate_blacklist', 'plate_blacklist', 'plate_blacklist.u_id=user.u_id')
          .select('user.u_id', 'uid')
          .addSelect('user.name', 'name')
          .addSelect('user.avatar', 'avatar')
          .where('plate_blacklist.p_id=:pid', { pid: pRes[i].pid })
          .getRawMany()
        res.plate[i].blackList = bRes
      }
    } catch (error) {
      console.log(error)
      res.res = -1
    }
    return res
  }

  async unPlateBlackList(uid: string, pid: string): Promise<unPlateBlackList> {
    const res: unPlateBlackList = {
      res: 1
    }
    try {
      const bRes = await this.plateBlacklistRepository.findOne({ where: { pid, uid } })
      if (bRes) await this.plateBlacklistRepository.remove(bRes)
    } catch (error) {
      console.log(error)
      res.res = -1
    }
    return res
  }

  async setPlateBlackList(pid: string, uid: string): Promise<setPlateBlackList> {
    const res: setPlateBlackList = {
      res: 1
    }
    try {
      await this.plateBlacklistRepository.save({ pid, uid })
    } catch (error) {
      console.log(error)
      res.res = -1
    }
    return res
  }
}
