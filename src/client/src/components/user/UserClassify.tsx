import React from 'react'
import style from '@/styles/user/UserClassify.module.scss'
import { Divider } from 'tdesign-react'
import FoldCard from './FoldCard'

type Props = {
    plates: plate[]
}

type plate = {
    pid: string,
    name: string,
    level: number
}

export default function UserClassify({ plates }: Props): JSX.Element {

    return (
        <FoldCard title='关注板块' col={2}>
            <>
                {plates.map(plate => {
                    return <div className={style['user-classify']} key={plate.pid}>
                        <p>{plate.name}</p>
                        <div className={style['user-classify-grade']}>
                            <Divider className={style['user-classify-vertical']} layout="vertical"></Divider>
                            <label>{plate.level}级</label>
                        </div>
                    </div>
                })}
                {plates.length === 0 && <p className={style['user-classify-text']}>暂无~</p>}
                <div className={style['user-classify-btn']}>
                    <button>查看全部</button>
                </div>
            </>
        </FoldCard>
    )
}
