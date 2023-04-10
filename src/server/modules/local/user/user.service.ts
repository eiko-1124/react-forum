import { user } from '#/entity/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { queryFansRes, queryInfoRes, queryPlateRes, querySubscribersRes, userInfoRes } from './dto/user.dto';
import { invitationLike } from '#/entity/invitationLike.entity';
import { commitLike } from '#/entity/commitLike.entity';
import { invitation } from '#/entity/invitation.entity';
import { commit } from '#/entity/commit.entity';
import { commitReply } from '#/entity/commitReply.entity';
import { userFans } from '#/entity/userFans.entity';
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
    @InjectRepository(plateSubscribe)
    private plateSubscribeRepository: Repository<plateSubscribe>
  ) { }

  async getUserInfo(id: string): Promise<userInfoRes> {
    const res: userInfoRes = {
      res: 1,
      data: {}
    }
    if (id) {
      try {
        res.data.info = await this.queryInfo(id)
        if (!res.data.info) throw new Error('info error')
        res.data.plates = await this.queryPlates(id)
        if (!res.data.plates) throw new Error('plates error')
        res.data.subscribers = await this.querySubscribers(id)
        if (!res.data.subscribers) throw new Error('subscribers error')
        res.data.fans = await this.queryFans(id)
        if (!res.data.fans) throw new Error('fans error')
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

  async queryPlates(uid: string): Promise<queryPlateRes[] | null> {
    try {
      const plates: queryPlateRes[] = await this.plateSubscribeRepository.find({ select: { pid: true, name: true, level: true }, where: { uid } })
      return plates
    } catch (error) {
      console.log(error)
      return null
    }
  }

  async querySubscribers(uid: string): Promise<querySubscribersRes[] | null> {
    try {
      const subscribers: querySubscribersRes[] = await this.userRepository
        .createQueryBuilder('user')
        .select('user.u_id', 'uid')
        .addSelect('user.name', 'name')
        .addSelect('user.avatar', 'name')
        .innerJoinAndSelect('user_fans', 'user_fans', 'user_fans.u_id_2=user.u_id')
        .where("user_fans.u_id_1=:uid", { uid })
        .limit(4)
        .getRawMany()
      return subscribers
    } catch (error) {
      console.log(error)
      return null
    }
  }

  async queryFans(uid: string): Promise<queryFansRes[] | null> {
    try {
      const fans: queryFansRes[] = await this.userRepository
        .createQueryBuilder('user')
        .innerJoinAndSelect('user_fans', 'user_fans', 'user_fans.u_id_1=user.u_id')
        .where("user_fans.u_id_2=:uid", { uid })
        .select('user.name', 'name')
        .addSelect('user.u_id', 'uid')
        .addSelect('user.avatar', 'avatar')
        .limit(4)
        .getRawMany()
      return fans
    } catch (error) {
      console.log(error)
      return null
    }
  }
}
