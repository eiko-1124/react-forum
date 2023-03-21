import React from 'react'
import style from '@/styles/plate/Grade.module.scss'
import { Button, Divider, Progress } from 'tdesign-react'

export default function Grade(): JSX.Element {
    return (
        <div className={style['grade']}>
            <Divider
                align="center"
                dashed={false}
                layout="horizontal"
                className={style['grade-horizontal']}
            >ranking</Divider>
            <div className={style['grade-progress']}>
                <label>等级1</label>
                <div className={style['grade-progress-track']}>
                    <div className={style['grade-progress-slider']}><label>1/200</label></div>
                </div>
            </div>
            <Button className={style['grade-btn']} theme="success" variant="base">签到</Button>
        </div>
    )
}
