import Header from '@/components/communal/Header'
import Tool from '@/components/communal/Tool'
import User from '@/components/communal/User'
import React from 'react'
import styles from '@/styles/communal/Main.module.scss'
import Details from '@/components/plate/Details'
import { Button } from 'tdesign-react'
import SearchList from '@/components/search/SearchList'
import InvitationList from '@/components/search/InvitationList'
import UserList from '@/components/search/UserList'
import CreatePlate from '@/components/search/CreatePlate'
import { GetStaticPaths, GetStaticProps } from 'next'
import axios from '@/core/axios'
import { useRouter } from 'next/router'

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
    owner?: {
        uid: string,
        name: string
    },
    plates: {
        pid: string,
        name: string,
        sSum: number,
        iSum: number,
        avatar: string
    }[],
    plateSum: number,
    users: {
        uid: string,
        name: string,
        avatar: string
    }[],
    userSum: number
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: 'blocking'
    }
}

export const getStaticProps: GetStaticProps = async (content) => {
    const keyWord: string = content.params['keyWord'] as string
    let props = {}
    try {
        const res: Props = await axios.get('/local/search/all', { keyWord, page: 0 }) as Props
        if (res.res === 1) props = res
    } catch (error) {
        console.log(error)
    }
    return { props }
}

export default function Search({ target, owner, plates, plateSum, users, userSum }: Props): JSX.Element {

    const router = useRouter()

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
                        {target && <Details target={target} owner={owner} title='搜索结果' vSlot={<Button style={{ marginLeft: '0.1rem' }} onClick={() => router.push({ pathname: '/plate/[pid]', query: { pid: target.pid } })}>进入</Button>}></Details>}
                        {!target && <CreatePlate></CreatePlate>}
                        <SearchList list={plates} listSum={plateSum}></SearchList>
                    </section>
                    <section className={styles['main-section']}>
                        <section className={styles['main-recommend']}>
                            <InvitationList></InvitationList>
                        </section>
                        <section className={styles['main-ranking']}>
                            <section className={styles['main-ranking-sticky']}>
                                <UserList list={users} listSum={userSum}></UserList>
                            </section>
                        </section>
                    </section>
                </section>
            </div>
        </div>
    )
}
