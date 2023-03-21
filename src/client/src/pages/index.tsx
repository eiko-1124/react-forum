import Tool from '@/components/communal/Tool'
import Classify from '@/components/home/Classify'
import Header from '@/components/communal/Header'
import Notice from '@/components/home/Notice'
import Ranking from '@/components/home/Ranking'
import Recommend from '@/components/communal/Recommend'
import User from '@/components/communal/User'
import styles from '@/styles/communal/Main.module.scss'

export default function Home() {

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
                        <Classify></Classify>
                    </section>
                    <section className={styles['main-section']}>
                        <section className={styles['main-recommend']}>
                            <Recommend labels={['推荐', '关注']}></Recommend>
                        </section>
                        <section className={styles['main-ranking']}>
                            <section className={styles['main-ranking-sticky']}>
                                <Ranking></Ranking>
                                <Notice></Notice>
                            </section>
                        </section>
                    </section>
                </section>
            </div>
        </div>
    )
}
