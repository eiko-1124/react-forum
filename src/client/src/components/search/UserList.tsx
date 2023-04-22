import React from 'react'
import style from '@/styles/search/UserList.module.scss'
import { Avatar, Divider, Pagination } from 'tdesign-react'

type Props = {
    list: {
        uid: string,
        name: string,
        avatar: string
    }[],
    listSum: number
}

export default function UserList({ list, listSum }: Props): JSX.Element {
    console.log(list, listSum)
    return (
        <div className={style['userList']}>
            <Divider
                align="center"
                dashed={false}
                layout="horizontal"
                className={style['userList-horizontal']}
            >用户</Divider>
            {
                list.map(site => {
                    return <div className={style['userList-site']} key={site.uid}>
                        <Avatar shape="round" size='4rem' image={site.avatar}>
                        </Avatar>
                        <label>{site.name}</label>
                    </div>
                })
            }
            {list.length < 8 && <p className={style['userList-nomore']}>~没有更多了~</p>}
            {listSum > 8 && <div className={style['userList-more']}>
                <Pagination className={style['userList-pagination']} total={listSum} defaultPageSize={8} totalContent={false} showPageSize={false}></Pagination>
            </div>}
        </div>
    )
}
