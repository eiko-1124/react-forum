import { Avatar, Button, Image, Input } from 'tdesign-react'
import { HomeIcon, SearchIcon } from 'tdesign-icons-react'
import style from '@/styles/communal/Header.module.scss'
import useHeader from '@/core/communal/useHeader'
import { useRef } from 'react'

export default function (): JSX.Element {

    const { state, methods } = useHeader()
    const keyWord = useRef()

    return (<div className={style.header}>
        <Image
            className={style['header-icon']}
            src="http://localhost:3000/static/icon/crow-1.png"
            loading=' '
        />
        <div className={style['header-input-content']}>
            <Input
                placeholder="请输入关键词搜索"
                ref={keyWord}
                onFocus={methods.onFocus}
                onBlur={methods.disFocus}
                onChange={() => methods.simpleSearch(keyWord)}
                onEnter={() => methods.goSearch(keyWord)}
            />
            {state.panelState && <div className={style['header-input-panel']}>
                <ul>
                    {state.targetState && <li className={style['header-input-li']} onClick={() => methods.goPlate(state.targetState.pid)}>
                        <Avatar shape="round" size='4rem' image={state.targetState.avatar}>
                        </Avatar>
                        <div className={style['header-input-target']}>
                            <h4>{state.targetState.name}</h4>
                            <p>{state.targetState.introduction}</p>
                        </div>
                    </li>}
                    {state.listState.map(site => {
                        return <li className={style['header-input-li']} key={site.pid} onClick={() => methods.goPlate(site.pid)}><p>{site.name}</p></li>
                    })}
                </ul>
            </div>}
        </div>
        <Button theme="primary" variant="base" className={style['header-input-btn']} onClick={() => methods.goSearch(keyWord)}>
            <SearchIcon></SearchIcon>
        </Button>
        <Button theme="primary" variant="base" className={style['header-input-btn']} onClick={methods.goHome}>
            <HomeIcon />
        </Button>
        <Image
            className={style['header-icon']}
            src="http://localhost:3000/static/icon/crow-2.png"
            loading=' '
        />
    </div>
    )
}