import React from 'react'
import style from '@/styles/communal/Card.module.scss'
import { Divider } from 'tdesign-react'

type invitation = {
    iid: string,
    uid: string,
    pid: string,
    uName: string,
    pName: string,
    title: string,
    text: string,
    date: Date
}

export default function Card({ data }: { data: invitation }): JSX.Element {
    return (
        <div className={style['card']}>
            <h6>{data.pName}</h6>
            <h4>{data.title}</h4>
            <p>{data.text}</p>
            <Divider className={style['card-divider']}></Divider>
        </div>
    )
}
