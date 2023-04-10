import React from 'react'
import FoldCard from './FoldCard'
import style from '@/styles/user/Consumer.module.scss'
import { Avatar } from 'tdesign-react'

type Props = {
    title: string,
    friends: friend[]
}

type friend = {
    uid: string,
    avatar: string
}

export default function Consumer({ title, friends }: Props): JSX.Element {
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
                <button className={style['consumer-btn']}>查看全部</button>
            </div>
        </FoldCard>
    )
}
