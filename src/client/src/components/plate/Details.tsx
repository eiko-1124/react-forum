import React from 'react'
import style from '@/styles/plate/Details.module.scss'
import { Avatar, Button, Divider, Tag } from 'tdesign-react'

type Props = {
    title: string, vSlot?: JSX.Element, target: {
        pid: string,
        name: string,
        introduction: string,
        usum: number,
        isum: number,
        avatar: string,
        tag: string
    }
}

export default function Details({ title, vSlot, target }: Props): JSX.Element {
    return (
        <div className={style['details']}>
            <div className={style['details-title']}>
                <Divider
                    align="center"
                    dashed={false}
                    layout="horizontal"
                    className={style['details-horizontal']}
                >{title}</Divider>
            </div>
            <div className={style['details-content']}>
                <Avatar className={style['details-avatar']} shape="round" size='10rem' image={target.avatar}>
                </Avatar>
                <div className={style['details-info']}>
                    <Button theme="success" variant="base">
                        已关注
                    </Button>
                    {vSlot}
                    <h3>{target.name}</h3>
                    <p>
                        <Tag className={style['details-tag']} theme="primary" variant="light">版主:lysmane</Tag>
                        <Tag className={style['details-tag']} theme="primary" variant="light">关注:{target.usum}</Tag>
                        <Tag className={style['details-tag']} theme="primary" variant="light">帖子:{target.isum}</Tag>
                        <Tag className={style['details-tag']} theme="warning" variant="light" shape="mark">{target.tag}</Tag></p>
                    <p className={style['details-info-introdution']}>
                        简介:{target.introduction}
                    </p>
                </div>
            </div>
        </div>
    )
}
