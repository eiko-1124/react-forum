import React from 'react'
import style from '@/styles/plate/Post.module.scss'
import { Button, Divider, Input } from 'tdesign-react'
import { ImageIcon, LinkIcon, SoundIcon, VideoIcon } from 'tdesign-icons-react'
import dynamic from 'next/dynamic'

export default function Post(): JSX.Element {

    const MyEditer = dynamic(() => import('@/components/plate/Editor'), { ssr: false })

    return (
        <div className={style['post']}>
            <div className={style['post-title']}>
                <Divider
                    align="center"
                    dashed={false}
                    layout="horizontal"
                    className={style['post-horizontal']}
                >发布帖子</Divider>
            </div>
            <div className={style['post-input-title']}>
                <label>标题</label>
                <Input placeholder='填写标题'></Input>
            </div>
            <MyEditer></MyEditer>
            <Button style={{ marginTop: '0.5rem' }} theme="primary" variant="base">
                发布
            </Button>
        </div>
    )
}
