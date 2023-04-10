import React from 'react'
import style from '@/styles/search/SearchList.module.scss'
import { Avatar, Divider, Pagination } from 'tdesign-react'
import { RootListIcon, UserIcon } from 'tdesign-icons-react'

type Props = {
    list: {
        pid: string,
        name: string,
        usum: number,
        isum: number,
        avatar: string
    }[],
    listSum: number
}

export default function SearchList({ list, listSum }: Props): JSX.Element {

    return (
        <div className={style['searchList']}>
            <div className={style['searchList-title']}>
                <Divider
                    align="center"
                    dashed={false}
                    layout="horizontal"
                    className={style['searchList-horizontal']}
                >其他结果</Divider>
            </div>
            {list.length > 0 && <div className={style['searchList-content']}>
                {list.map(site => {
                    return <div className={style['searchList-float']} key={site.pid}>
                        <Avatar shape="round" size='4rem' image={site.avatar}>
                        </Avatar>
                        <div className={style['searchList-info']}>
                            <p className={style['searchList-info-name']}>{site.name}</p>
                            <p className={style['searchList-info-opacity']}><UserIcon />{site.usum}</p>
                            <p className={style['searchList-info-opacity']}><RootListIcon />{site.isum}</p>
                        </div>
                    </div>
                })}
            </div>}
            {listSum > 6 && <div className={style['searchList-more']}>
                <Pagination className={style['searchList-pagination']} total={listSum} defaultPageSize={12} totalContent={false} showPageSize={false}></Pagination>
            </div>}
            {listSum <= 6 && <div className={style['searchList-end']}>
                没有更多了
            </div>}
        </div>
    )
}
