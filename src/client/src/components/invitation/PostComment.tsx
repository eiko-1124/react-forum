import React from 'react'
import style from '@/styles/invitation/PostComment.module.scss'
import { Button, Divider, Input } from 'tdesign-react'

export default function PostComment(): JSX.Element {
    return (
        <div className={style['postComment']}>
            <div className={style['postComment-title']}>
                <Divider
                    align="center"
                    dashed={false}
                    layout="horizontal"
                    className={style['postComment-horizontal']}
                >回复</Divider>
            </div>
            <Input></Input>
            <Button>发布</Button>
        </div>
    )
}
