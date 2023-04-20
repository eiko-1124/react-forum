import React, { useEffect, useState } from 'react'
import style from '@/styles/plate/Details.module.scss'
import { Avatar, Button, Divider, Tag } from 'tdesign-react'
import useDetails from '@/core/plate/useDetails'

type Props = {
    title: string, vSlot?: JSX.Element, target: {
        pid: string,
        name: string,
        introduction: string,
        sSum: number,
        iSum: number,
        avatar: string,
        tag: string
    },
    owner: {
        uid: string,
        name: string
    }
}

export default function Details({ title, vSlot, target, owner }: Props): JSX.Element {

    const [subscribeState, setSubscribeState] = useState(false)
    const { getSubscribeStatus, setSubscribeStatus } = useDetails(setSubscribeState)
    let init: boolean = false

    useEffect(() => {
        if (!init) {
            init = true
            getSubscribeStatus(target.pid)
        }
    }, [])

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
                    <Button theme={subscribeState ? "success" : "primary"} variant="base" onClick={() => setSubscribeStatus(target.pid, target.name, subscribeState)}>
                        {subscribeState ? '已关注' : '未关注'}
                    </Button>
                    {vSlot}
                    <h3>{target.name}</h3>
                    <p>
                        <Tag className={style['details-tag']} theme="primary" variant="light">版主:{owner.name}</Tag>
                        <Tag className={style['details-tag']} theme="primary" variant="light">关注:{target.sSum}</Tag>
                        <Tag className={style['details-tag']} theme="primary" variant="light">帖子:{target.iSum}</Tag>
                        <Tag className={style['details-tag']} theme="warning" variant="light" shape="mark">{target.tag}</Tag></p>
                    <p className={style['details-info-introdution']}>
                        简介:{target.introduction}
                    </p>
                </div>
            </div>
        </div>
    )
}
