import { chat } from '#/entity/chat.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { chatUser, chatUserRes, historyRes, newChatRes, setMessageRes, unReadRes } from './dto/chat.dto';
import { createId } from '#/utils';
import { user } from '#/entity/user.entity';

@Injectable()
export class ChatService {
    constructor(
        @InjectRepository(chat)
        private chatRepository: Repository<chat>,
        @InjectRepository(user)
        private userRepository: Repository<user>,
    ) { }

    async getChat(uid: string) {
        const res: chatUserRes = {
            res: 1,
            chatUsers: []
        }
        try {
            const res1 = await this.chatRepository.createQueryBuilder()
                .leftJoinAndSelect('user', 'user', 'user.u_id=chat.u_id_1')
                .select("user.u_id", 'uid')
                .addSelect('user.name', 'name')
                .addSelect('chat.text', 'text')
                .addSelect('user.avatar', 'avatar')
                .addSelect('chat.date', 'date')
                .where('chat.u_id_2=:uid', { uid })
                .orderBy('chat.date', 'DESC')
                .getRawMany()
            const map: Map<string, chatUser> = new Map()
            for (let i = 0; i < res1.length; i++) {
                if (!map.has(res1[i].uid)) {
                    const nSum = await this.chatRepository.count({ where: { uid2: uid, uid1: res1[i].uid, read: 0 } })
                    map.set(res1[i].uid, { ...res1[i], nSum })
                }
            }
            const res2 = await this.chatRepository.createQueryBuilder()
                .leftJoinAndSelect('user', 'user', 'user.u_id=chat.u_id_2')
                .select("user.u_id", 'uid')
                .addSelect('user.name', 'name')
                .addSelect('chat.text', 'text')
                .addSelect('user.avatar', 'avatar')
                .addSelect('chat.date', 'date')
                .where('chat.u_id_1=:uid', { uid })
                .orderBy('chat.date', 'DESC')
                .getRawMany()
            for (let i = 0; i < res2.length; i++) {
                if (!map.has(res2[i].uid)) {
                    map.set(res2[i].uid, { ...res2[i], nSum: 0 })
                } else {
                    const site = map.get(res2[i].uid)
                    if (site.date.getTime() < res2[i].date.getTime()) {
                        map.set(res2[i].uid, { ...res2[i], nSum: 0 })
                    }
                }
            }
            res.chatUsers = [...map.values()]
            return res
        } catch (error) {
            console.log(error)
            res.res = -1
        }
        return res
    }

    async getUnRead(uid1: string, uid2: string) {
        const res: unReadRes = {
            res: 1,
            messages: []
        }
        try {
            const nRes = await this.chatRepository.createQueryBuilder()
                .leftJoinAndSelect('user', 'user', 'user.u_id=chat.u_id_1')
                .leftJoinAndSelect('user', 'user2', 'user2.u_id=chat.u_id_2')
                .select('user1.u_id', 'uid1')
                .addSelect('user1.name', 'name')
                .addSelect('user1.avatar', 'avatar')
                .addSelect('user2.u_id', 'uid2')
                .addSelect('user2.name', 'name')
                .addSelect('user1.avatar', 'avatar')
                .addSelect('chat.text', 'text')
                .addSelect('chat.date', 'date')
                .addSelect('chat.h_id', 'hid')
                .where('chat.u_id_1=:uid1 AND chat.u_id_2=:uid2 AND read=:read', { uid1, uid2, read: 0 })
                .orderBy('chat.date', 'ASC')
                .limit(5)
                .getRawMany()
            res.messages = nRes
            await this.chatRepository.createQueryBuilder()
                .update('chat')
                .set({ read: 1 })
                .where('chat.u_id_1=:uid1 AND chat.u_id_2=:uid2 AND read=:read', { uid1, uid2, read: 0 })
                .execute()
        } catch (error) {
            console.log(error)
            res.res = -1
        }
        return res
    }

    async getHistory(uid1: string, uid2: string, date: string): Promise<historyRes> {
        const res: historyRes = {
            res: 1,
            messages: []
        }
        try {
            const theDay = new Date(date)
            let hRes = await this.chatRepository.createQueryBuilder()
                .leftJoinAndSelect('user', 'user1', 'user1.u_id=chat.u_id_1')
                .leftJoinAndSelect('user', 'user2', 'user2.u_id=chat.u_id_2')
                .select('user1.u_id', 'uid1')
                .addSelect('user1.name', 'name1')
                .addSelect('user1.avatar', 'avatar1')
                .addSelect('user2.u_id', 'uid2')
                .addSelect('user2.name', 'name2')
                .addSelect('user1.avatar', 'avatar2')
                .addSelect('chat.h_id', 'hid')
                .addSelect('chat.text', 'text')
                .addSelect('chat.date', 'date')
                .addSelect('chat.h_id', 'hid')
                .where('chat.u_id_2=:uid1 AND chat.u_id_1=:uid2 AND chat.date<:theDay', { uid1, uid2, theDay })
                .orWhere('chat.u_id_1=:uid1 AND chat.u_id_2=:uid2 AND chat.date<:theDay', { uid1, uid2, theDay })
                .limit(5)
                .orderBy('chat.date', 'DESC')
                .getRawMany()
            hRes = hRes.reverse()
            res.messages = hRes
            await this.chatRepository.createQueryBuilder()
                .update('chat')
                .set({ read: 1 })
                .where('chat.u_id_1=:uid2 AND chat.u_id_2=:uid1 AND read=:read', { uid2, uid1, read: 0 })
                .execute()
        } catch (error) {
            console.log(error)
        }
        return res
    }

    async setMessage(chat: chat): Promise<setMessageRes> {
        const res: setMessageRes = {
            res: 1
        }
        try {
            await this.chatRepository.save(chat)
        } catch (error) {
            console.log(error)
            res.res = -1
        }
        return res
    }

    async getNewChat(uid: string): Promise<newChatRes> {
        const res: newChatRes = {
            res: 1,
            chatUser: null
        }
        try {
            const uRes = await this.userRepository.findOne({ select: { name: true, avatar: true }, where: { uid } })
            const nChat: chatUser = {
                uid: uid,
                avatar: uRes.avatar,
                nSum: 0,
                text: '',
                name: uRes.name,
                date: new Date()
            }
            res.chatUser = nChat
        } catch (error) {
            console.log(error)
            res.res = -1
        }
        return res
    }

    async getChater(uid: string) {
        try {
            return await this.userRepository.findOne({ select: { uid: true, name: true, avatar: true }, where: { uid } })
        } catch (error) {
            console.log(error)
        }
    }
}
