import React from 'react'
import style from '@/styles/user/Notify.module.scss'
import FoldCard from './FoldCard'
import { Badge } from 'tdesign-react'
import { useRouter } from 'next/router'
import { getCookie } from '@/core/utils'
import jwt from "jsonwebtoken";

export default function Notify(): JSX.Element {

    const route = useRouter()

    const goAdmin = (type: number) => {
        const token = getCookie('token')
        let id: string = 'undefined'
        if (token) id = jwt.decode(token)['id']
        route.push(`/admin/${type}/${id}`)
    }

    return (
        <FoldCard title='消息提醒' col={1}>
            <div className={style['notify']}>
                <Badge count={0}>
                    <div className={style['notify-btn']} onClick={() => goAdmin(6)}>&#xe7ac;</div>
                    <p>帖子</p>
                </Badge>
                <Badge count={2}>
                    <div className={style['notify-btn']} onClick={() => goAdmin(8)}>&#xe788;</div>
                    <p>私信</p>
                </Badge>
                <Badge count={2}>
                    <div className={style['notify-btn']} onClick={() => goAdmin(6)}>&#xe634;</div>
                    <p>粉丝</p>
                </Badge>
                <Badge count={2}>
                    <div className={style['notify-btn']} onClick={() => goAdmin(6)}>&#xe67c;</div>
                    <p>系统</p>
                </Badge>
            </div>
        </FoldCard>
    )
}
