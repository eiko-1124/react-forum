import React from 'react'
import style from '@/styles/search/UserList.module.scss'
import { Avatar, Divider } from 'tdesign-react'

export default function UserList(): JSX.Element {
    return (
        <div className={style['userList']}>
            <Divider
                align="center"
                dashed={false}
                layout="horizontal"
                className={style['userList-horizontal']}
            >用户</Divider>
            <div>
                <div className={style['userList-site']}>
                    <Avatar shape="round" size='4rem'>
                        W
                    </Avatar>
                    <label>hello</label>
                </div>
            </div>
        </div>
    )
}
