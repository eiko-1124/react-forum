import React from 'react'
import { Avatar, Divider, Tag } from 'tdesign-react'
import style from '@/styles/user/Info.module.scss'

export default function Info(): JSX.Element {
    return (
        <div>
            <Divider
                align="center"
                dashed={false}
                layout="horizontal"
                className={style['user-horizontal']}
            >DMEIKO</Divider>
            <Avatar className={style['user-avatar']} shape="round" size='5rem' image='http://localhost:3000/static/avatar/fire-keeper.png' />
            <div className={style['user-labels']}>
                <Tag theme="success" variant="light">
                    发布<label className={style['user-label']}>0</label>
                </Tag>
                <Divider className={style['user-vertical']} layout="vertical"></Divider>
                <Tag theme="success" variant="light">
                    回复<label className={style['user-label']}>0</label>
                </Tag>
                <Divider className={style['user-vertical']} layout="vertical"></Divider>
                <Tag theme="success" variant="light">
                    点赞<label className={style['user-label']}>0</label>
                </Tag>
            </div>
            <div className={style['user-labels']}>
                <Tag theme="success" variant="light">
                    关注<label className={style['user-label']}>0</label>
                </Tag>
                <Divider className={style['user-vertical']} layout="vertical"></Divider>
                <Tag theme="success" variant="light">
                    粉丝<label className={style['user-label']}>0</label>
                </Tag>
            </div>
        </div>
    )
}
