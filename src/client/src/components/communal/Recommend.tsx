import style from '@/styles/communal/Recommend.module.scss'
import Card from '../communal/Card'
import Divider from 'tdesign-react/es/divider/Divider'
import { useState } from 'react'
import { Pagination } from 'tdesign-react'
import HeadMenu from 'tdesign-react/es/menu/HeadMenu'
import MenuItem from 'tdesign-react/es/menu/MenuItem'

type Props = {
    labels: string[],
    list: Array<subscribeInvitation>,
    setSelect: Function,
    setPage: Function,
    sum: number
}

type subscribeInvitation = {
    iid: string,
    uid: string,
    pid: string,
    uName: string,
    pName: string,
    title: string,
    text: string,
    date: Date
}

export default function ({ labels, list, setSelect, setPage, sum }: Props): JSX.Element {
    const nums = new Array(10).fill(0)
    nums.forEach((num, index) => nums[index] = num + index)

    const [selectState, setSelectState] = useState('0')

    return <div className={style['recommend']}>
        <div className={style['recommend-tabs']}>
            <Divider
                align="center"
                dashed={false}
                layout="horizontal"
                className={style['recommend-horizontal']}
            >帖子推荐</Divider>
            <HeadMenu
                theme="light"
                value={selectState}
                onChange={(val: string) => { setSelectState(val), setSelect(val) }}
                className={style['recommend-menu']}
            >
                {labels.map((text, index) => {
                    return <MenuItem value={index + ''} key={index}>
                        <span>{text}</span>
                    </MenuItem>
                })}
            </HeadMenu>
        </div>
        <div>
            <div className={selectState == '0' ? '' : style['recommend-hidden']} >
                {/* {nums.map(key => <Card key={key}></Card>)} */}
            </div>
            <div className={selectState == '1' ? '' : style['recommend-hidden']} >
                {list.map(site => <Card data={site} key={site.iid}></Card>)}
                {list.length < 12 && <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '10rem', color: '#606266' }}>~没有更多了~</p>}
            </div>
        </div>
        <div className={style['recommend-more']}>
            <Pagination className={style['recommend-pagination']} total={sum} defaultPageSize={12} totalContent={false} showPageSize={false} onChange={({ current }) => setPage(current)}></Pagination>
        </div>
    </div>
}