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

type Props = {
    res: number,
    target?: {
        pid: string,
        name: string,
        introduction: string,
        sSum: number,
        iSum: number,
        avatar: string,
        tag: string
    },
    owner: {
        uid: string,
        name: string
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: 'blocking'
    }
}

export const getStaticProps: GetStaticProps = async (content) => {
    const id: string = content.params['pid'] as string
    let props: Props
    try {
        const res: Props = await axios.get('/local/plate/getDetails', { pid: id }) as Props
        if (res.res === 1) props = res
        else return { notFound: true }
    } catch (error) {
        console.log(error)
        return { notFound: true }
    }
    return { props }
}

export default function index({ target, owner }: Props): JSX.Element {
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
                            <Placement></Placement>
                            <Recommend labels={['精华区', '推荐', '最新']}></Recommend>
                        </section>
                        <section className={styles['main-ranking']}>
                            <section className={styles['main-ranking-sticky']}>
                                <SearchBox></SearchBox>
                                <Notice></Notice>
                                <Grade></Grade>
                                <Publish></Publish>
                                <Administrators></Administrators>
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
