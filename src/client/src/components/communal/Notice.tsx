import React from 'react'
import { Divider } from 'tdesign-react'
import style from '@/styles/communal/Notice.module.scss'

export default function Notice(): JSX.Element {
    return (
        <div className={style['notice']}>
            <Divider
                align="center"
                dashed={false}
                layout="horizontal"
                className={style['notice-horizontal']}
            >公告</Divider>
            <div className={style['notice-content']}>
                愉快地玩耍吧！！
            </div>
        </div>
    )
}
