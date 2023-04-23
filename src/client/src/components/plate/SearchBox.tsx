import React, { useState } from 'react'
import style from '@/styles/plate/SearchBox.module.scss'
import { Button, Dialog, Divider, Input, List, Pagination } from 'tdesign-react'
import ListItem from 'tdesign-react/es/list/ListItem'
import ListItemMeta from 'tdesign-react/es/list/ListItemMeta'
import { useRouter } from 'next/router'
import axios from '@/core/axios'
import { getDate } from '@/core/utils'

type station = {
    iid: string,
    title: string,
    plate: string
    date: Date
}

export default function SearchBox(): JSX.Element {

    const route = useRouter()
    const [keyWordState, setKeyWordState] = useState('')
    const [visibleState, setVisibleState] = useState(false)
    const [searchList, setSearchList] = useState([])
    const [listSum, setListSum] = useState(0)
    const goInvitation = (pid: string, iid: string) => {
        route.push(`/invitation/${pid}/${iid}`)
    }
    const pageChange = async (page: number) => {
        page = page - 1
        const pid = route.query['pid']
        try {
            const res = await axios.get('/local/search/station', { keyWord: keyWordState, pid, page }) as { res: number, sSum: number, stations: station[] }
            if (res.res == 1) {
                setSearchList(res.stations)
                setListSum(res.sSum)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const search = () => {
        pageChange(1)
        setVisibleState(true)
    }

    return (
        <div className={style['searchBox']}>
            <Divider
                align="center"
                dashed={false}
                layout="horizontal"
                className={style['searchBox-horizontal']}
            >站内搜索</Divider>
            <Input value={keyWordState} onChange={(val) => setKeyWordState(val)}></Input>
            <Button className={style['searchBox-btn']} onClick={search}>搜索</Button>
            <Dialog
                header="搜索结果"
                visible={visibleState}
                onClose={() => setVisibleState(false)}
                placement='top'
                cancelBtn={null}
                confirmBtn={null}
            ><div>
                    {searchList.length > 0 && <List>
                        {searchList.map((item) => (
                            <ListItem key={item.iid} style={{ padding: '0.2rem', cursor: 'pointer' }} >
                                <div onClick={() => goInvitation(item.plate, item.iid)}><h3>{item.title}</h3>
                                    <p style={{ transform: 'scale(0.8) translateX(-10%)' }}>{getDate(item.date)}</p></div>
                            </ListItem>
                        ))}
                    </List>}
                    {
                        searchList.length === 0 && <p style={{ display: 'flex', height: '20rem', alignItems: 'center', justifyContent: 'center' }}>~~没有更多了~~</p>
                    }
                    <Pagination total={listSum} defaultPageSize={8} totalContent={false} showPageSize={false} onChange={({ current }) => { pageChange(current) }}></Pagination>
                </div>
            </Dialog>
        </div>
    )
}
