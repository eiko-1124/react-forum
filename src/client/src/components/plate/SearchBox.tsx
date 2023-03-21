import React from 'react'
import style from '@/styles/plate/SearchBox.module.scss'
import { Button, Divider, Input } from 'tdesign-react'

export default function SearchBox(): JSX.Element {
    return (
        <div className={style['searchBox']}>
            <Divider
                align="center"
                dashed={false}
                layout="horizontal"
                className={style['searchBox-horizontal']}
            >站内搜索</Divider>
            <Input></Input>
            <Button className={style['searchBox-btn']}>搜索</Button>
        </div>
    )
}
