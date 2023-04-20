import React from 'react'
import style from '@/styles/plate/Administrators.module.scss'
import { Avatar, Divider } from 'tdesign-react'

type admins = {
    uid: string,
    avatar: string,
    name: string
}[]

export default function Administrators({ admins }: { admins: admins }): JSX.Element {
    return (
        <div className={style['administrators']}>
            <Divider
                align="center"
                dashed={false}
                layout="horizontal"
                className={style['administrators-horizontal']}
            >管理团队</Divider>
            <div className={style['administrators-content']}>
                {admins.map(admin => {
                    return <div className={style['administrators-avater']} key={admin.uid}>
                        <Avatar shape="round" size='2.7rem' image={admin.avatar}></Avatar>
                        <label>{admin.name}</label>
                    </div>
                })}
            </div>
        </div>
    )
}
