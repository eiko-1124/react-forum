import Tool from '@/components/communal/Tool'
import Classify from '@/components/home/Classify'
import Header from '@/components/communal/Header'
import Notice from '@/components/communal/Notice'
import Ranking from '@/components/communal/Ranking'
import Recommend from '@/components/communal/Recommend'
import User from '@/components/communal/User'
import styles from '@/styles/communal/Main.module.scss'
import useHome from '@/core/home/useHome'

export default function Home() {

    const bgStr = 'url(http://localhost:3000/static/background/1.jpg)'

    const {
        selectState, setSelectState, listState, sumState, setPageState
    } = useHome()

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
                            <Recommend sum={sumState} setSelect={setSelectState} list={listState} labels={['推荐', '关注']} setPage={setPageState}></Recommend>
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
