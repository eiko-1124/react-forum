import React from 'react'
import style from '@/styles/communal/Card.module.scss'
import { Divider } from 'tdesign-react'

export default function Card(): JSX.Element {
    return (
        <div className={style['card']}>
            <h6>动漫吧</h6>
            <h4>这是一个标题</h4>
            <p>这是一段简介。。。。。。。。。。</p>
            <Divider className={style['card-divider']}></Divider>
        </div>
    )
}
