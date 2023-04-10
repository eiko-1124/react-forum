import useClassify from '@/core/home/useClassify'
import style from '@/styles/home/Classify.module.scss'
import { useEffect, useState } from 'react'
import { PageFirstIcon, PageLastIcon, RootListIcon, UserIcon } from 'tdesign-icons-react'
import { Avatar, Divider, Tag } from 'tdesign-react'
export default function (): JSX.Element {

    const { getPlateSum, getPlateList, getPrePage, getNextPage } = useClassify()
    const [listState, setListState] = useState([])
    const [listSumState, setListSumState] = useState(1)
    const [listPageState, setListPageState] = useState(0)
    let init: boolean = false

    useEffect(() => {
        if (!init) {
            init = true
            getPlateSum(setListSumState)
            getPlateList(listPageState, setListState)
        }
    }, [])

    return <div className={style['classify']}>
        <div className={style['classify-title']}>
            <Divider
                align="center"
                dashed={false}
                layout="horizontal"
                className={style['classify-horizontal']}
            >热门板块</Divider>
            <div className={style['classify-btns']}>
                <Tag style={{ cursor: 'pointer' }} theme="success" variant="outline" onClick={() => getPrePage(listPageState, setListPageState, setListState)}><PageFirstIcon /></Tag>
                <Tag style={{ margin: '0rem 0.2rem' }} theme="success">{listPageState + 1}&nbsp;/&nbsp;{Math.ceil(listSumState / 12)}</Tag>
                <Tag style={{ cursor: 'pointer' }} theme="success" variant="outline" onClick={() => getNextPage(listPageState, listSumState, setListPageState, setListState)}><PageLastIcon size='1.5rem' /></Tag>
            </div>
        </div>
        <div className={style['classify-content']}>
            {listState.map(plate => {
                return <div className={style['classify-float']} key={plate.pid}>
                    <Avatar style={{ cursor: 'pointer' }} shape="round" size='4rem' image={plate.avatar}>
                    </Avatar>
                    <div className={style['classify-info']}>
                        <p className={style['classify-info-name']}>{plate.name}</p>
                        <p className={style['classify-info-opacity']}><UserIcon />{plate.subscribe}</p>
                        <p className={style['classify-info-opacity']}><RootListIcon />{plate.invitation}</p>
                    </div>
                </div>
            })}
        </div>
        {listState.length < 9 && <div className={style['classify-more']}>
            <p>~没有更多了~</p>
        </div>}
    </div>
}