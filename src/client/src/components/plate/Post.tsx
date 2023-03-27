import style from '@/styles/plate/Post.module.scss'
import { Button, Divider, Input } from 'tdesign-react'
import usePost from '@/core/plate/usePost'
import Editer from './Editor'

export default function Post(): JSX.Element {

    const { methods, title, editer } = usePost()

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
                <Input placeholder='填写标题' ref={title} maxlength={20}></Input>
            </div>
            <Editer ref={editer}></Editer>
            <Button style={{ marginTop: '0.5rem' }} theme="primary" variant="base" onClick={() => methods.submit()}>
                发布
            </Button>
        </div>
    )
}
