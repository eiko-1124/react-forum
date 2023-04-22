import React, { useState } from 'react'
import style from '@/styles/communal/tool.module.scss'
import { CaretUpIcon } from 'tdesign-icons-react'
import useTools from '@/core/communal/useTools'

export default function Tool(): JSX.Element {

    const [toolState, setToolState] = useState(false)
    const { toolLogin, toolPerson } = useTools()

    return (
        <div className={style['tools']} onClick={() => setToolState(!toolState)}>
            <CaretUpIcon className={style['tools-icon']} size='3rem' style={{ cursor: 'pointer' }} />
            <div onClick={toolLogin} className={style['tool'] + (toolState ? ` ${style['tool-1']}` : '')}>登录</div>
            <div className={style['tool'] + (toolState ? ` ${style['tool-2']}` : '')}>背景</div>
            <div className={style['tool'] + (toolState ? ` ${style['tool-3']}` : '')}>顶部</div>
            <div onClick={toolPerson} className={style['tool'] + (toolState ? ` ${style['tool-4']}` : '')}>设置</div>
        </div>
    )
}
