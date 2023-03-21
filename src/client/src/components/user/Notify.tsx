import React from 'react'
import style from '@/styles/user/Notify.module.scss'
import FoldCard from './FoldCard'
import { Badge } from 'tdesign-react'

export default function Notify(): JSX.Element {
    return (
        <FoldCard title='消息板块' col={1}>
            <div className={style['notify']}>
                <Badge count={2}>
                    <div className={style['notify-btn']}>&#xe93b;</div>
                    <p>@我</p>
                </Badge>
                <Badge count={0}>
                    <div className={style['notify-btn']}>&#xe7ac;</div>
                    <p>回复</p>
                </Badge>
                <Badge count={2}>
                    <div className={style['notify-btn']}>&#xe788;</div>
                    <p>私信</p>
                </Badge>
                <Badge count={2}>
                    <div className={style['notify-btn']}>&#xe634;</div>
                    <p>粉丝</p>
                </Badge>
            </div>
        </FoldCard>
    )
}
