import React from 'react'
import style from '@/styles/invitation/Comment.module.scss'
import { Avatar, Button, Divider, Input, Popup } from 'tdesign-react'
import useComment from '@/core/invitation/useComment'
import { getDate } from '@/core/utils'
import { CloseIcon, MoreIcon } from 'tdesign-icons-react'

type Props = {
    owner: {
        uid: string,
        name: string,
        leval: number,
        avatar: string,
        admin: boolean,
        owner: boolean,
        floorer: boolean
    },
    comment: comment,
    replys: reply[],
    pOwner: string,
    rote: {
        admin: boolean,
        owner: boolean
    }
}

type comment = {
    cid: string,
    text: string,
    floor: number,
    lSum: number,
    rSum: number,
    date: string,
    isLike: boolean
}

type reply = {
    cid1: string,
    text: string,
    date: string,
    uid1: string,
    uid2: string,
    name1?: string,
    name2?: string
}

export default function Comment({ owner, comment, replys, pOwner, rote }: Props): JSX.Element {

    const { state, methods } = useComment(replys, comment, pOwner)

    return (
        <div className={style['comment']}>
            <div className={style['comment-landlord']}>
                <Avatar shape="round" size='5rem' image={owner.avatar}></Avatar>
                <p className={style['comment-name']}>{owner.name}</p>
                <p>等级{owner.leval}</p>
                <p>{owner.floorer ? '楼主' : (owner.owner ? '版主' : (owner.admin ? '管理员' : ''))}</p>
            </div>
            <div className={style['comment-content']}>
                <div className={style['comment-content-text']}>
                    <div dangerouslySetInnerHTML={{ __html: comment.text }}></div>
                    <Popup
                        attach="body"
                        content={<div style={{ display: 'flex', flexDirection: 'column' }}>
                            <Button theme="default" variant="text">
                                查看
                            </Button> {(rote.admin || rote.owner) && <Button theme="default" variant="text" onClick={methods.deleteComment}>
                                删除
                            </Button>}
                        </div>}
                        destroyOnClose={false}
                        hideEmptyPopup={false}
                        placement="left"
                        trigger="hover"
                    >
                        <MoreIcon style={{ position: 'absolute', right: '0rem', top: '0.5rem', cursor: 'pointer' }} />
                    </Popup>
                </div>
                <div className={style['comment-options']}>
                    <div className={style['comment-options-labels']}>
                        <label>{comment.floor}楼</label>
                        <label>{getDate(comment.date)}</label>
                    </div>
                    <div className={style['comment-options-btns']}>
                        <Button className={style['comment-options-btn']} size="small" variant="outline" theme={state.isLikeState ? 'warning' : 'success'} ghost onClick={methods.setLike}>点赞：{state.lSumState}</Button>
                        <Button className={style['comment-options-btn']} size="small" variant="outline" theme="success" ghost onClick={methods.setComment}>评论：{state.rSumState}</Button>
                    </div>
                </div>
                {state.hasReplyState && <div className={style['comment-reply']}>
                    {
                        state.replyState.map((reply, index) => {
                            return <div key={reply.cid1}>
                                <div>
                                    <label className={style['comment-reply-user']}>{reply.name1}</label>
                                    {reply.uid2 !== owner.uid && <label className={style['comment-reply-static']}>回复</label>}
                                    {reply.uid2 !== owner.uid && <label className={style['comment-reply-user']}>{reply.name2}</label>}
                                    <label className={style['comment-reply-static']}>:</label>
                                    <label style={{ wordBreak: 'break-all' }} dangerouslySetInnerHTML={{ __html: reply.text }}></label>
                                </div>
                                <div className={style['comment-reply-btn']}>
                                    <label>{getDate(reply.date)}</label>
                                    <label onClick={() => methods.setRUserState({ uid: reply.uid1, name: reply.name1 })}>回复</label>
                                    {(rote.admin || rote.owner) && <label style={{ color: 'darkcyan', cursor: 'pointer' }} onClick={() => methods.deleteReply(reply.cid1, index)}>删除</label>}
                                </div>
                            </div>
                        })
                    }
                    <div className={style['comment-reply-more']}>
                        {comment.rSum > 2 && state.retractState && <div className={style['comment-reply-message']} onClick={() => methods.getReplys(0)}>
                            <label>共{state.rSumState}条回复,</label><label style={{ color: 'darkcyan', cursor: 'pointer' }} onClick={() => methods.goFans(owner.uid)}>点击查看</label>
                        </div>}
                        {comment.rSum > 8 && !state.retractState && <div className={style['comment-reply-message']}>
                            <label>{new Array(Math.ceil(comment.rSum / 8)).fill(0).map((num, index) => {
                                return <label style={{ margin: '0.2rem', color: 'darkcyan', cursor: 'pointer' }} key={index} onClick={() => methods.getReplys(index)}>{index + 1}</label>
                            })}</label>
                        </div>}
                    </div>
                    {state.rUserState.uid.length != 0 && <div style={{ transform: 'scale(0.85) translateX(-7.5%)' }}><label>回复</label><label>{state.rUserState.name}</label><label style={{ marginLeft: '0.5rem', color: 'darkcyan', cursor: 'pointer' }} onClick={() => methods.setRUserState({ uid: '', name: '' })}>取消</label></div>}
                    <div style={{ display: 'flex' }}><Input style={{ marginRight: '0.2rem' }} value={state.valueState} onChange={(val) => methods.setValueState(val)}></Input>
                        <Button onClick={() => { methods.postReply(comment.cid) }}>发布</Button></div>
                </div>}
                <Divider className={style['comment-divider']}></Divider>
            </div>
        </div>
    )
}
