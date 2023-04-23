import React from 'react'
import style from '@/styles/invitation/Substance.module.scss'
import { Avatar, Button, Divider, Pagination, Popup } from 'tdesign-react'
import Comment from './Comment'
import { getDate } from '@/core/utils'
import useSubstance from '@/core/invitation/useSubstance'
import { MoreIcon } from 'tdesign-icons-react'
type Props = {
    invitation: invitation,
    owner: owner,
    comments: comments
}

type owner = {
    uid: string,
    name: string,
    avatar: string,
    level: number
}

type invitation = {
    id: string,
    title: string,
    text: string,
    acSum: number,
    coSum: number,
    lSum: number,
    pSum: number,
    date: string,
    top: number,
    quality: number
}

type comments = {
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
    replys: reply[]
}[]

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

export default function Substance({ invitation, owner, comments }: Props): JSX.Element {

    const {
        vSumState,
        commentsState,
        likeState,
        lSumState,
        ASumState,
        CSumState,
        roteState,
        topState,
        qualityState,
        setLike,
        getComments,
        setCollect,
        collectState,
        goFans,
        deleteInvitation,
        setTop,
        setQuality
    } = useSubstance({ owner, comments, invitation })

    return (
        <div className={style['substance']}>
            <div className={style['substance-title']}>
                <Divider
                    align="center"
                    dashed={false}
                    layout="horizontal"
                    className={style['substance-horizontal']}
                >帖子</Divider>
            </div>
            <h3 style={{ paddingRight: '1rem', position: 'relative' }}>{invitation.title}<Popup
                attach="body"
                content={<div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Button theme="default" variant="text" onClick={() => goFans(owner.uid)}>
                        查看
                    </Button>
                    {roteState.admin && <Button theme="default" variant="text" onClick={() => setTop()}>
                        {topState ? '取消置顶' : '置顶'}
                    </Button>}
                    {roteState.admin && <Button theme="default" variant="text" onClick={() => setQuality()}>
                        {qualityState ? '取消加精' : '加精'}
                    </Button>}{(roteState.owner || roteState.admin) && <Button theme="default" variant="text" onClick={() => deleteInvitation()}>
                        删除
                    </Button>}
                </div>}
                destroyOnClose={false}
                hideEmptyPopup={false}
                placement="left"
                trigger="hover"
            >
                <MoreIcon style={{ position: 'absolute', right: '0rem', top: '0.5rem', cursor: 'pointer' }} />
            </Popup></h3>
            <div className={style['substance-container']}>
                <div className={style['substance-landlord']}>
                    <Avatar shape="round" size='5rem' image={owner.avatar}></Avatar>
                    <p className={style['substance-name']}>{owner.name}</p>
                    <p>等级{owner.level}</p>
                    <p>楼主</p>
                </div>
                <div dangerouslySetInnerHTML={{ __html: invitation.text }}></div>
            </div>
            <div className={style['substance-options']}>
                <div className={style['substance-options-btns']}>
                    <Button className={style['substance-options-btn']} size="small" variant="outline" theme="success" ghost>只看楼主 </Button>
                    <Button className={style['substance-options-btn']} size="small" variant="outline" theme={collectState ? 'warning' : 'success'} ghost onClick={setCollect}>收藏：{CSumState}</Button>
                    <Button className={style['substance-options-btn']} size="small" variant="outline" theme={likeState ? 'warning' : 'success'} ghost onClick={setLike}>点赞：{lSumState}</Button>
                </div>
                <div className={style['substance-options-labels']}>
                    <label>1楼</label>
                    <label>{getDate(invitation.date)}</label>
                    <label>浏览量：{vSumState}</label>
                    <label>评论：{ASumState}</label>
                </div>
            </div>
            <Divider style={{ margin: '0rem', marginBottom: '0.5rem' }}></Divider>
            {commentsState.map(comment => {
                return <Comment rote={roteState} pOwner={owner.uid} comment={comment.comment} owner={comment.owner} replys={comment.replys} key={comment.comment.cid}></Comment>
            })}
            <div className={style['substance-more']}>
                <Pagination className={style['substance-pagination']} total={invitation.pSum} defaultPageSize={12} totalContent={false} showPageSize={false} onCurrentChange={getComments}></Pagination>
            </div>
        </div>
    )
}
