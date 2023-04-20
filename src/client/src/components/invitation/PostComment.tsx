import React from 'react'
import style from '@/styles/invitation/PostComment.module.scss'
import { Button, Divider } from 'tdesign-react'
import Editor from '../plate/Editor'
import usePostComment from '@/core/invitation/usePostComment'

export default function PostComment(): JSX.Element {
    const { editer, postComment } = usePostComment()
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
            <Editor excludeKeys={
                [
                    "blockquote",
                    "underline", // 下划线
                    "fontSize", // 字号
                    "fontFamily", // 字体
                    "lineHeight", // 行高
                    "bulletedList", // 无序列表
                    "numberedList", // 有序列表
                    "todo", // 代办
                    // 对齐
                    "group-justify",
                    // 缩进
                    "group-indent",
                    // 上传视频
                    "group-video",
                    "insertTable",// 插入表格
                    "divider", // 分割线
                    "undo", // 撤销
                    "redo", // 重做
                    "fullScreen"
                ]} styles={{
                    height: '15rem',
                    maxHeight: '50vh'
                }} ref={editer}></Editor>
            <Button style={{ marginTop: '0.5rem' }} onClick={postComment}>发布</Button>
        </div>
    )
}
