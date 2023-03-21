import React, { useState } from 'react'
import { Divider } from 'tdesign-react'
import style from '@/styles/plate/Placements.module.scss'
import { ChevronRightIcon, LayersIcon, LinkUnlinkIcon } from 'tdesign-icons-react'

export default function Placement(): JSX.Element {
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
                <li><label>[置顶]</label><label><LinkUnlinkIcon size='1.2rem' /></label><p>这是一条置顶消息</p></li>
                <li><label>[置顶]</label><label><LinkUnlinkIcon size='1.2rem' /></label><p>这是一条置顶消息</p></li>
                <li><label>[置顶]</label><label><LinkUnlinkIcon size='1.2rem' /></label><p>这是一条置顶消息</p></li>
            </ul>
        </div>
    )
}
