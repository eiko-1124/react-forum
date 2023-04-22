import { plate } from '#/entity/plate.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { allRes, invitations, owner, plates, simpleSearchRes, target, users } from './dto/search.dto';
import { user } from '#/entity/user.entity';
import { invitation } from '#/entity/invitation.entity';

@Injectable()
export class SearchService {
    constructor(
        @InjectRepository(plate)
        private plateRepository: Repository<plate>,
        @InjectRepository(user)
        private userRepository: Repository<user>,
        @InjectRepository(invitation)
        private invitationRepository: Repository<invitation>
    ) { }

    async simpleSearch(keyWord: string): Promise<simpleSearchRes> {
        const res: simpleSearchRes = {
            res: 1
        }
        try {
            let num = 6
            const target: plate[] = await this.plateRepository.find({ select: { pid: true, name: true, introduction: true }, where: { name: keyWord } })
            if (target.length === 0) res.target = null
            else {
                res.target = target[0]
                num--
            }
            const list: plate[] = await this.plateRepository.createQueryBuilder().select("plate.name", 'name').addSelect("plate.p_id", 'pid').where("plate.name <> :keyWord AND plate.name Like :lKeyWord", { keyWord, lKeyWord: `%${keyWord}%` }).limit(num).getRawMany()
            if (list.length === 0) res.list = []
            else res.list = list
        } catch (error) {
            console.log(error)
            res.res = -1
        }
        return res
    }

    async getAll(keyWord: string, page: number): Promise<allRes> {
        const res: allRes = {
            res: 1,
            target: null,
            owner: null,
            plates: [],
            plateSum: 0,
            users: [],
            userSum: 0
        }
        try {
            res.target = await this.queryTarget(keyWord)
            if (res.target) {
                res.owner = await this.queryOwner(res.target.owner)
                if (!res.owner) throw new Error('owner error')
            }
            res.plates = await this.queryPlates(keyWord, page)
            if (!res.plates) throw new Error('plates error')
            res.plateSum = await this.queryPlateSum(keyWord)
            if (res.plateSum === null) throw new Error('plateSum error')
            res.users = await this.queryUser(keyWord, page)
            if (!res.users) throw new Error('users error')
            res.userSum = await this.queryUserSum(keyWord)
            if (res.userSum === null) throw new Error('userSum error')
            res.invitations = await this.queryInvitation(keyWord, page)
            if (!res.invitations) throw new Error('invitations error')
            res.invitationSum = await this.queryInvitationSum(keyWord)
            if (res.invitationSum === null) throw new Error('userSum error')
        } catch (error) {
            console.log(error)
            res.res = -1
        }
        return res
    }

    async queryTarget(keyWord: string): Promise<target | null> {
        try {
            const res: target = await this.plateRepository.createQueryBuilder()
                .leftJoinAndSelect('plate_subscribe', 'plate_subscribe', 'plate_subscribe.p_id=plate.p_id')
                .leftJoinAndSelect('invitation', 'invitation', 'invitation.plate=plate.p_id')
                .select('plate.p_id', 'pid')
                .addSelect('plate.name', 'name')
                .addSelect('plate.avatar', 'avatar')
                .addSelect('plate.introduction', 'introduction')
                .addSelect('plate.tag', 'tag')
                .addSelect('plate.owner', 'owner')
                .addSelect('COUNT(DISTINCT plate_subscribe.u_id)', 'sSum')
                .addSelect('COUNT(DISTINCT invitation.i_id)', 'iSum')
                .groupBy('plate.p_id')
                .where("plate.name = :keyWord", { keyWord })
                .getRawOne()
            return res
        } catch (error) {
            console.log(error)
            return null
        }
    }

    async queryOwner(owner: string): Promise<owner | null> {
        try {
            const res: owner = await this.userRepository.findOne({ select: { uid: true, name: true }, where: { uid: owner } })
            return res
        } catch (error) {
            console.log(error)
            return null
        }
    }

    async queryPlates(keyWord: string, page: number): Promise<plates[] | null> {
        try {
            const res: plates[] = await this.plateRepository.createQueryBuilder()
                .leftJoinAndSelect('plate_subscribe', 'plate_subscribe', 'plate_subscribe.p_id=plate.p_id')
                .leftJoinAndSelect('invitation', 'invitation', 'invitation.plate=plate.p_id')
                .select('plate.p_id', 'pid')
                .addSelect('plate.name', 'name')
                .addSelect('plate.avatar', 'avatar')
                .addSelect('COUNT(DISTINCT plate_subscribe.u_id)', 'sSum')
                .addSelect('COUNT(DISTINCT invitation.i_id)', 'iSum')
                .groupBy('plate.p_id')
                .where("plate.name <> :keyWord AND plate.name Like :lKeyWord", { keyWord, lKeyWord: `%${keyWord}%` })
                .orderBy('plate.date', 'ASC')
                .limit(6)
                .offset(6 * page)
                .getRawMany()
            return res
        } catch (error) {
            console.log(error)
            return null
        }
    }

    async queryPlateSum(keyWord: string): Promise<number | null> {
        try {
            const res: number = await this.plateRepository.createQueryBuilder()
                .where("plate.name <> :keyWord AND plate.name Like :lKeyWord", { keyWord, lKeyWord: `%${keyWord}%` })
                .getCount()
            return res
        } catch (error) {
            console.log(error)
            return null
        }
    }

    async queryUser(keyWord: string, page: number): Promise<users[] | null> {
        try {
            const res: users[] = await this.userRepository.createQueryBuilder()
                .select('user.u_id', 'uid')
                .addSelect('user.name', 'name')
                .addSelect('user.avatar', 'avatar')
                .where("user.name Like :lKeyWord", { lKeyWord: `%${keyWord}%` })
                .orderBy('user.date', 'ASC')
                .limit(8)
                .offset(8 * page)
                .getRawMany()
            return res
        } catch (error) {
            console.log(error)
            return null
        }
    }

    async queryUserSum(keyWord: string): Promise<number | null> {
        try {
            const res: number = await this.userRepository.count({ where: { name: Like(`%${keyWord}%`) } })
            return res
        } catch (error) {
            console.log(error)
            return null
        }
    }
    async queryInvitation(keyWord: string, page: number): Promise<invitations[] | null> {
        try {
            const res: invitations[] = await this.invitationRepository.createQueryBuilder()
                .leftJoinAndSelect('plate', 'plate', 'invitation.plate=plate.p_id')
                .leftJoinAndSelect('user', 'user', 'user.u_id=invitation.owner')
                .select('invitation.i_id', 'iid')
                .addSelect('invitation.title', 'title')
                .addSelect('invitation.text', 'text')
                .addSelect('invitation.date', 'date')
                .addSelect('plate.p_id', 'pid')
                .addSelect('plate.name', 'pName')
                .addSelect('user.u_id', 'uid')
                .addSelect('user.name', 'uName')
                .where("invitation.title Like :lKeyWord", { lKeyWord: `%${keyWord}%` })
                .orderBy('invitation.date')
                .take(12)
                .offset(12 * page)
                .getRawMany()
            return res
        } catch (error) {
            console.log(error)
            return null
        }
    }

    async queryInvitationSum(keyWord: string): Promise<number | null> {
        try {
            const res: number = await this.invitationRepository.count({ where: { title: Like(`%${keyWord}%`) } })
            return res
        } catch (error) {
            console.log(error)
            return null
        }
    }
}
