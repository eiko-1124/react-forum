import React from 'react'
import { Button } from 'tdesign-react'
import style from '@/styles/plate/Publish.module.scss'
import mainStyle from '@/styles/communal/Main.module.scss'

export default function Publish(): JSX.Element {

    const scrollToBottom = () => {
        const main: Element = document.querySelector(`.${mainStyle['main']}`)
        main.scrollTo(0, main.scrollHeight)
    }

    return (
        <div className={style['publish']}>
            <Button variant="outline" className={style['publish-btn']} theme="success" ghost onClick={scrollToBottom}>
                发帖
            </Button>
        </div>
    )
}
