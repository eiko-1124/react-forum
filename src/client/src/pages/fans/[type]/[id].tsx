import React from 'react'
import styles from '@/styles/communal/Main.module.scss'
import Tool from '@/components/communal/Tool'
import Header from '@/components/communal/Header'
import User from '@/components/communal/User'
import FansCenter from '@/components/fans/FansCenter'

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
                    <section className={styles['main-invitation']} style={{ height: '100%' }}>
                        <section className={styles['main-recommend']}>
                            <FansCenter></FansCenter>
                        </section>
                    </section>
                </section>
            </div>
        </div>
    )
}
