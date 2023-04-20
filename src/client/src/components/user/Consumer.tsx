import React from 'react'
import FoldCard from './FoldCard'
import style from '@/styles/user/Consumer.module.scss'
import { Avatar } from 'tdesign-react'
import { getCookie } from '@/core/utils'
import jwt from "jsonwebtoken";
import { useRouter } from 'next/router'

type Props = {
    type: number
    title: string,
    friends: friend[]
}

type friend = {
    uid: string,
    avatar: string
}

export default function Consumer({ type, title, friends }: Props): JSX.Element {

    const route = useRouter()

    const goAdmin = () => {
        const token = getCookie('token')
        let id: string = 'undefined'
        if (token) id = jwt.decode(token)['id']
        route.push(`/admin/${type}/${id}`)
    }

    return (
        <FoldCard title={title} col={1}>
            <div className={style['consumer']}>
                <div className={style['consumer-content']}>
                    {friends.map(friend =>
                        <Avatar shape="round" size='2.7rem' image={friend.avatar} key={friend.uid}>
                        </Avatar>
                    )}
                    {friends.length === 0 && <p>暂无~</p>}
                </div>
                <button className={style['consumer-btn']} onClick={goAdmin}>查看全部</button>
            </div>
        </FoldCard>
    )
}
