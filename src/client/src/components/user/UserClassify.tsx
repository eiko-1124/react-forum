import React from 'react'
import style from '@/styles/user/UserClassify.module.scss'
import { Divider } from 'tdesign-react'
import FoldCard from './FoldCard'
import { useRouter } from 'next/router'
import jwt from "jsonwebtoken";
import { getCookie } from '@/core/utils'

type Props = {
    plates: plate[]
}

type plate = {
    pid: string,
    name: string,
    level: number
}

export default function UserClassify({ plates }: Props): JSX.Element {

    const router = useRouter()

    const goAdmin = () => {
        const token = getCookie('token')
        let id: string = 'undefined'
        if (token) id = jwt.decode(token)['id']
        router.push(`/admin/1/${id}`)
    }

    return (
        <FoldCard title='关注板块' col={2}>
            <>
                {plates.map(plate => {
                    return <div className={style['user-classify']} key={plate.pid} onClick={() => router.push({ pathname: '/plate/[pid]', query: { pid: plate.pid } })}>
                        <p>{plate.name}</p>
                        <div className={style['user-classify-grade']}>
                            <Divider className={style['user-classify-vertical']} layout="vertical"></Divider>
                            <label>{plate.level}级</label>
                        </div>
                    </div>
                })}
                {plates.length === 0 && <p className={style['user-classify-text']}>暂无~</p>}
                <div className={style['user-classify-btn']}>
                    <button onClick={goAdmin}>查看全部</button>
                </div>
            </>
        </FoldCard>
    )
}
