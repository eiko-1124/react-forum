import Header from '@/components/communal/Header'
import Notice from '@/components/communal/Notice'
import Ranking from '@/components/communal/Ranking'
import Tool from '@/components/communal/Tool'
import User from '@/components/communal/User'
import PostComment from '@/components/invitation/PostComment'
import Substance from '@/components/invitation/Substance'
import Administrators from '@/components/plate/Administrators'
import axios from '@/core/axios'
import styles from '@/styles/communal/Main.module.scss'
import { GetStaticPaths, GetStaticProps } from 'next'
import React from 'react'

type Props = {
    admins?: admins,
    notice?: string,
    invitation?: invitation,
    owner?: owner,
    comments?: comments
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
    date: string
}

type admins = {
    uid: string,
    avatar: string,
    name: string
}[]

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

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: 'blocking'
    }
}

export const getStaticProps: GetStaticProps = async (content) => {
    const pid: string = content.params['pid'] as string
    const iid: string = content.params['id'] as string
    let props: Props = {}
    try {
        const invitation = await axios.get('/local/invitation/getInvitation', { pid, iid }) as { res: number, invitation: invitation, owner: owner, isCollect: number, isLike: number }
        if (invitation.res === 1) {
            props.invitation = invitation.invitation,
                props.owner = invitation.owner
        }
        else throw new Error()
        const admins = await axios.get('/local/plate/getAdmins', { pid }) as { res: number, admins: admins }
        if (admins.res === 1) props.admins = admins.admins
        else throw new Error()
        const notice = await axios.get('/local/plate/getNotice', { pid }) as { res: number, notice: string }
        if (notice.res === 1) props.notice = notice.notice
        else throw new Error()
        const comments = await axios.get('/local/comment/getComment', { iid, pid, page: 0, uid: 'undefine' }) as { res: number, comments: comments }
        if (comments.res === 1) props.comments = comments.comments
        else throw new Error()
    } catch (error) {
        console.log(error)
        return { notFound: true }
    }
    return { props }
}

export default function Invitation({ invitation, owner, admins, notice, comments }: Props): JSX.Element {
    const bgStr = 'url(http://localhost:3000/static/background/1.jpg)'
    return (
        <div className={styles.main} style={{ backgroundImage: bgStr }}>
            <Tool></Tool>
            <Header></Header>
            <div className={styles['main-content']}>
                <aside className={styles['main-aside']}>
                    <User></User>
                </aside>
                <section className={styles['main-body']}>
                    <section className={styles['main-invitation']}>
                        <section className={styles['main-recommend']}>
                            <Substance invitation={invitation} owner={owner} comments={comments}></Substance>
                            <PostComment></PostComment>
                        </section>
                        <section className={styles['main-ranking']}>
                            <section className={styles['main-ranking-sticky']}>
                                <Ranking></Ranking>
                                <Administrators admins={admins}></Administrators>
                                <Notice text={notice}></Notice>
                            </section>
                        </section>
                    </section>
                    <section className={styles['main-post']}>
                    </section>
                </section>
            </div>
        </div>
    )
}
