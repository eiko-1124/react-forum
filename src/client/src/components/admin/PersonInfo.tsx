import React, { useState } from 'react'
import { Avatar, Button, Input } from 'tdesign-react'
import style from '@/styles/admin/PersonInfo.module.scss'

export default function PersonInfo(): JSX.Element {
    const [nameState, setNameState] = useState('lysmane')
    return (
        <div className={style['personInfo']}>
            <div>
                <div className={style['personInfo-name']}>
                    <label>用户名：</label>
                    <Input value={nameState} onChange={val => setNameState(val)}></Input>
                    <Button variant="outline" theme="success" ghost style={{ margin: '0rem 0.5rem' }}>
                        修改
                    </Button>
                </div>
                <div className={style['personInfo-avatar']}>
                    <label>头像：</label>
                    <Avatar shape="round" size='8rem'></Avatar>
                    <Button variant="outline" theme="success" ghost style={{ margin: '0rem 0.5rem' }}>
                        修改
                    </Button>
                </div>
                <div className={style['personInfo-statistics']}>
                    <label>统计：</label>
                    <ul>
                        <li>
                            发布帖子：999
                        </li>
                        <li>
                            收到回复：999
                        </li>
                        <li>
                            收到点赞：999
                        </li>
                        <li>
                            关注者：999
                        </li>
                        <li>
                            粉丝：999
                        </li>
                    </ul>
                </div>
            </div>
            <div className={style['personInfo-preference']}>
                <label>偏好：</label>
            </div>
            <div></div>
        </div>
    )
}
