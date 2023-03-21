import React from 'react'
import FoldCard from './FoldCard'
import style from '@/styles/user/Consumer.module.scss'
import { Avatar } from 'tdesign-react'

type Props = { title: string }

export default function Consumer({ title }: Props): JSX.Element {
    return (
        <FoldCard title={title} col={1}>
            <div className={style['consumer']}>
                <div className={style['consumer-content']}>
                    <Avatar shape="round" size='2.7rem'>
                        W
                    </Avatar>
                    <Avatar shape="round" size='2.7rem'>
                        W
                    </Avatar>
                    <Avatar shape="round" size='2.7rem'>
                        W
                    </Avatar>
                    <Avatar shape="round" size='2.7rem'>
                        W
                    </Avatar>
                </div>
                <button className={style['consumer-btn']}>查看全部</button>
            </div>
        </FoldCard>
    )
}
