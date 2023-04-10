import React from 'react'
import styles from '@/styles/communal/Main.module.scss'
import Tool from '@/components/communal/Tool'
import Header from '@/components/communal/Header'
import User from '@/components/communal/User'
import PersonalCenter from '@/components/admin/PersonalCenter'

export default function Admin(): JSX.Element {
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
                            <PersonalCenter></PersonalCenter>
                        </section>
                    </section>
                    <section className={styles['main-post']}>
                    </section>
                </section>
            </div>
        </div>
    )
}
