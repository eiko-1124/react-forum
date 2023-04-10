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

type Props = {
    res: number,
    target?: {
        pid: string,
        name: string,
        introduction: string,
        usum: number,
        isum: number,
        avatar: string,
        tag: string
    },
    plateLists: {
        pid: string,
        name: string,
        usum: number,
        isum: number,
        avatar: string
    }[],
    plateSum: number
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

export default function Search({ target, plateLists, plateSum }: Props): JSX.Element {

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
                        {target && <Details target={target} title='搜索结果' vSlot={<Button style={{ marginLeft: '0.1rem' }}>进入</Button>}></Details>}
                        {!target && <CreatePlate></CreatePlate>}
                        <SearchList list={plateLists} listSum={plateSum}></SearchList>
                    </section>
                    <section className={styles['main-section']}>
                        <section className={styles['main-recommend']}>
                            <InvitationList></InvitationList>
                        </section>
                        <section className={styles['main-ranking']}>
                            <section className={styles['main-ranking-sticky']}>
                                <UserList></UserList>
                            </section>
                        </section>
                    </section>
                </section>
            </div>
        </div>
    )
}
