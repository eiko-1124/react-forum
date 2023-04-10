import React from 'react'
import { Avatar, Divider, Tag } from 'tdesign-react'
import style from '@/styles/user/Info.module.scss'

type Props = {
    name: string,
    avatar: string,
    publish: number,
    like: number,
    reply: number,
    subscribe: number,
    fans: number
}

export default function Info(props: Props): JSX.Element {
    return (
        <div>
            <Divider
                align="center"
                dashed={false}
                layout="horizontal"
                className={style['user-horizontal']}
            >{props.name}</Divider>
            <Avatar className={style['user-avatar']} shape="round" size='5rem' image={props.avatar} />
            <div className={style['user-labels']}>
                <Tag theme="success" variant="light">
                    发布<label className={style['user-label']}>{props.publish}</label>
                </Tag>
                <Divider className={style['user-vertical']} layout="vertical"></Divider>
                <Tag theme="success" variant="light">
                    回复<label className={style['user-label']}>{props.reply}</label>
                </Tag>
                <Divider className={style['user-vertical']} layout="vertical"></Divider>
                <Tag theme="success" variant="light">
                    点赞<label className={style['user-label']}>{props.like}</label>
                </Tag>
            </div>
            <div className={style['user-labels']}>
                <Tag theme="success" variant="light">
                    关注<label className={style['user-label']}>{props.subscribe}</label>
                </Tag>
                <Divider className={style['user-vertical']} layout="vertical"></Divider>
                <Tag theme="success" variant="light">
                    粉丝<label className={style['user-label']}>{props.fans}</label>
                </Tag>
            </div>
        </div>
    )
}
