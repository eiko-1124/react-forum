import React, { useEffect, useState } from 'react'
import style from '@/styles/plate/Grade.module.scss'
import { Button, Divider } from 'tdesign-react'
import { useRouter } from 'next/router';
import useGrade from '@/core/plate/useGrade';

export default function Grade({ pid }: { pid: string }): JSX.Element {

    const router = useRouter();
    const [rankingState, setRankingState] = useState({
        exp: 0,
        level: 1,
        maxExp: 50,
        note: false
    })
    const { getRanking, setNote } = useGrade(setRankingState)

    useEffect(() => {
        getRanking(pid)
    }, [router.query]);

    return (
        <div className={style['grade']}>
            <Divider
                align="center"
                dashed={false}
                layout="horizontal"
                className={style['grade-horizontal']}
            >ranking</Divider>
            <div className={style['grade-progress']}>
                <label>等级{rankingState.level}</label>
                <div className={style['grade-progress-track']}>
                    <div className={style['grade-progress-slider']} style={{ width: (rankingState.exp * 100 / rankingState.maxExp) + '%' }}><label>{rankingState.exp}/{rankingState.maxExp}</label></div>
                </div>
            </div>
            <Button className={style['grade-btn']} theme={rankingState.note ? 'warning' : "success"} variant="base" onClick={() => setNote(pid)}>{rankingState.note ? '已签到' : '未签到'}</Button>
        </div>
    )
}
