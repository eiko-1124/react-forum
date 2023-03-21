import React from 'react'
import style from '@/styles/user/UserClassify.module.scss'
import { Divider } from 'tdesign-react'
import FoldCard from './FoldCard'

export default function UserClassify(): JSX.Element {

    const classify = [0, 1, 2, 3, 4, 5]

    return (
        <FoldCard title='关注板块' col={2}>
            {classify.map(key => {
                return <div className={style['user-classify']} key={key}>
                    <p>一个两个</p>
                    <div className={style['user-classify-grade']}>
                        <Divider className={style['user-classify-vertical']} layout="vertical"></Divider>
                        <label>6级</label>
                    </div>
                </div>
            })}
        </FoldCard>
    )
}
