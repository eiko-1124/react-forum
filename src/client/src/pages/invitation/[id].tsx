import Header from '@/components/communal/Header'
import Tool from '@/components/communal/Tool'
import User from '@/components/communal/User'
import Substance from '@/components/invitation/Substance'
import Comments from '@/components/invitation/Comments'
import styles from '@/styles/communal/Main.module.scss'
import React from 'react'

export default function Invitation(): JSX.Element {
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
                            <Substance></Substance>
                            <Comments></Comments>
                        </section>
                        <section className={styles['main-ranking']}>
                            <section className={styles['main-ranking-sticky']}>
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
