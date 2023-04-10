import React from 'react'
import style from '@/styles/invitation/Comment.module.scss'
import { Avatar, Button, Divider, Input } from 'tdesign-react'
import useComment from '@/core/invitation/useComment'

type Props = {
    text: string,
    num: number,
    user: {
        name: string,
        rank: number
    }
}

export default function Comment({ text, user, num }: Props): JSX.Element {

    const { state, methods } = useComment()

    return (
        <div className={style['comment']}>
            <div className={style['comment-landlord']}>
                <Avatar shape="round" size='5rem'></Avatar>
                <p>{user.name}</p>
                <p>等级{user.rank}</p>
            </div>
            <div className={style['comment-content']}>
                <p>{text}</p>
                <div className={style['comment-options']}>
                    <div className={style['comment-options-labels']}>
                        <label>{num}楼</label>
                        <label>2022-11-24</label>
                    </div>
                    <Button className={style['comment-options-btn']} size="small" variant="outline" theme="success" ghost>点赞</Button>
                    <Button className={style['comment-options-btn']} size="small" variant="outline" theme="success" ghost onClick={methods.setComment}>评论</Button>
                </div>
                {state.commentState && <div className={style['comment-reply']}>
                    <div>
                        <label className={style['comment-reply-user']}>a用户</label>
                        <label className={style['comment-reply-static']}>回复</label>
                        <label className={style['comment-reply-user']}>b用户</label>
                        <label className={style['comment-reply-static']}>:</label>
                        <label style={{ wordBreak: 'break-all' }}>嗡嗡嗡嗡嗡嗡嗡嗡嗡嗡嗡嗡嗡嗡嗡22222wwwwwwwwwwaaaaaa2这是评论的内容</label>
                    </div>
                    <div className={style['comment-reply-btn']}><label>2023-2-2</label><label>回复</label></div>
                    <div className={style['comment-reply-more']}>
                        <div className={style['comment-reply-message']}>
                            <label>还有3条回复,</label><label style={{ color: 'darkcyan', cursor: 'pointer' }}>点击查看</label>
                        </div>
                        <Button size="small" variant="outline" theme="success" ghost>我也说一句</Button>
                    </div>
                    <div style={{ transform: 'scale(0.85) translateX(-7.5%)' }}><label>回复</label><label>用户A</label></div>
                    <Input style={{ marginTop: '0.1rem' }}></Input>
                </div>}
                <Divider className={style['comment-divider']}></Divider>
            </div>
        </div>
    )
}
