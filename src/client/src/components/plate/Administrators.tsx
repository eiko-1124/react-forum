import React from 'react'
import style from '@/styles/plate/Administrators.module.scss'
import { Avatar, Button, Divider, Input } from 'tdesign-react'

export default function Administrators(): JSX.Element {
    const arr = new Array(8).fill(0)
    arr.forEach((ele, index) => arr[index] = ele + index)
    return (
        <div className={style['administrators']}>
            <Divider
                align="center"
                dashed={false}
                layout="horizontal"
                className={style['administrators-horizontal']}
            >管理团队</Divider>
            <div className={style['administrators-content']}>
                {arr.map((key) => {
                    return <div className={style['administrators-avater']} key={key}>
                        <Avatar shape="round" size='2.7rem'></Avatar>
                        <label>你好</label>
                    </div>
                })}
            </div>
        </div>
    )
}
