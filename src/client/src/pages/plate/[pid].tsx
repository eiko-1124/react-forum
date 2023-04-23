import React from 'react'
import styles from '@/styles/communal/Main.module.scss'
import Tool from '@/components/communal/Tool'
import Header from '@/components/communal/Header'
import User from '@/components/communal/User'
import Details from '@/components/plate/Details'
import Recommend from '@/components/communal/Recommend'
import Placement from '@/components/plate/Placement'
import SearchBox from '@/components/plate/SearchBox'
import Grade from '@/components/plate/Grade'
import Publish from '@/components/plate/Publish'
import Administrators from '@/components/plate/Administrators'
import Notice from '@/components/communal/Notice'
import Post from '@/components/plate/Post'
import { GetStaticPaths, GetStaticProps } from 'next'
import axios from '@/core/axios'
import dynamic from 'next/dynamic'

type Props = {
    target?: target,
    owner?: owner,
    tops?: tops,
    admins?: admins,
    notice?: string
}

type target = {
    pid: string,
    name: string,
    introduction: string,
    sSum: number,
    iSum: number,
    avatar: string,
    tag: string
}

type owner = {
    uid: string,
    name: string
}

type tops = {
    iid: string,
    title: string
}[]

type admins = {
    uid: string,
    avatar: string,
    name: string
}[]

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: 'blocking'
    }
}

export const getStaticProps: GetStaticProps = async (content) => {
    const id: string = content.params['pid'] as string
    let props: Props = {}
    try {
        const details = await axios.get('/local/plate/getDetails', { pid: id }) as { res: number, target: target, owner: owner }
        if (details.res === 1) {
            props.owner = details.owner
            props.target = details.target
        }
        else throw new Error()
        const tops = await axios.get('/local/invitation/getTops', { pid: id }) as { res: number, tops: tops }
        if (tops.res === 1) props.tops = tops.tops
        else throw new Error()
        const admins = await axios.get('/local/plate/getAdmins', { pid: id }) as { res: number, admins: admins }
        if (admins.res === 1) props.admins = admins.admins
        else throw new Error()
        const notice = await axios.get('/local/plate/getNotice', { pid: id }) as { res: number, notice: string }
        if (notice.res === 1) props.notice = notice.notice
        else throw new Error()
    } catch (error) {
        console.log(error)
        return { notFound: true }
    }
    return { props }
}

const MySearchBox = dynamic(() => import('@/components/plate/SearchBox'), { ssr: false })

export default function index({ target, owner, tops, admins, notice }: Props): JSX.Element {
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
                    <section className={styles['main-classify']}>
                        <Details target={target} owner={owner} title='板块'></Details>
                    </section>
                    <section className={styles['main-section']}>
                        <section className={styles['main-recommend']}>
                            <Placement tops={tops}></Placement>
                            {/* <Recommend labels={['精华区', '推荐', '最新']}></Recommend> */}
                        </section>
                        <section className={styles['main-ranking']}>
                            <section className={styles['main-ranking-sticky']}>
                                <MySearchBox></MySearchBox>
                                <Notice text={notice} writable></Notice>
                                <Grade pid={target.pid}></Grade>
                                <Publish></Publish>
                                <Administrators admins={admins}></Administrators>
                            </section>
                        </section>
                    </section>
                    <section className={styles['main-post']}>
                        <Post></Post>
                    </section>
                </section>
            </div>
        </div>
    )
}
