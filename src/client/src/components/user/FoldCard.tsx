import React, { useState } from 'react'
import style from '@/styles/user/FoldCard.module.scss'
import { ChevronRightIcon } from 'tdesign-icons-react'

type Props = {
    title: string
    children: JSX.Element | JSX.Element[],
    col: number
}

export default function FoldCard({ children, title, col }: Props): JSX.Element {

    const [collapseState, setCollapseState] = useState(false)

    const collapse = () => {
        setCollapseState(!collapseState)
    }

    return (
        <div className={style['foldCard']}>
            <div className={style['foldCard-title']} onClick={collapse}>
                <h4>{title}</h4><ChevronRightIcon className={style['foldCard-arrow']} size='large' />
            </div>
            <div className={style['foldCard-content'] + (collapseState ? ' ' + style['foldCard-collapse'] : '')} style={{ 'gridTemplateColumns': `repeat(${col},1fr)` }}>{children}</div>
        </div>
    )
}
