import React from 'react'
import { Divider } from 'tdesign-react'
import style from '@/styles/communal/Notice.module.scss'

export default function Notice({ text }: { text?: string }): JSX.Element {
    return (
        <div className={style['notice']}>
            <Divider
                align="center"
                dashed={false}
                layout="horizontal"
                className={style['notice-horizontal']}
            >公告</Divider>
            <div className={style['notice-content']}>
                {text ? text : '愉快地玩耍吧！！'}
            </div>
        </div>
    )
}
