import React from 'react'
import { Button } from 'tdesign-react'
import style from '@/styles/plate/Publish.module.scss'

export default function Publish(): JSX.Element {
    return (
        <div className={style['publish']}>
            <Button variant="outline" className={style['publish-btn']} theme="success" ghost>
                发帖
            </Button>
        </div>
    )
}
