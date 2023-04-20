import React, { useState } from 'react'
import { Divider } from 'tdesign-react'
import style from '@/styles/plate/Placements.module.scss'
import { ChevronRightIcon, LinkUnlinkIcon } from 'tdesign-icons-react'

type tops = {
    iid: string,
    title: string
}[]

export default function Placement({ tops }: { tops: tops }): JSX.Element {
    const [foldState, setFoldState] = useState(false)

    return (
        <div className={style['placements']}>
            <div className={style['placements-title']}>
                <Divider
                    align="center"
                    dashed={false}
                    layout="horizontal"
                    className={style['placements-horizontal']}
                >置顶区</Divider>
                <button className={style['placements-btn']} onClick={() => { setFoldState(!foldState) }}>
                    <ChevronRightIcon className={style['placements-btn-icon'] + (foldState ? '' : ` ${style['placement-btn-rotate']}`)} size='1.4rem' />
                </button>
            </div>
            <ul className={style['placements-content'] + (foldState ? ` ${style['placements-hidden']}` : '')}>
                {tops.map(top => {
                    return <li key={top.iid}><label>[置顶]</label><label><LinkUnlinkIcon size='1.2rem' /></label><p>{top.title}</p></li>
                })}
                {tops.length === 0 && <p style={{ margin: '0rem 1rem 0.5rem' }}>~暂无置顶~</p>}
            </ul>
        </div>
    )
}
