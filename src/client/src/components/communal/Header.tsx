import { Avatar, Button, Image, Input } from 'tdesign-react'
import { SearchIcon } from 'tdesign-icons-react'
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
            />
            {state.panelState && <div className={style['header-input-panel']}>
                <ul>
                    {state.targetState && <li className={style['header-input-li']} onClick={() => methods.goPlate(state.targetState.id)}>
                        <Avatar shape="round" size='4rem'>
                            W
                        </Avatar>
                        <div className={style['header-input-target']}>
                            <h4>{state.targetState.name}</h4>
                            <p>{state.targetState.introduction}</p>
                        </div>
                    </li>}
                    {state.listState.map(site => {
                        return <li className={style['header-input-li']} key={site.name} onClick={() => methods.goPlate(site.id)}><p>{site.name}</p></li>
                    })}
                </ul>
            </div>}
        </div>
        <Button theme="primary" variant="base" className={style['header-input-btn']}>
            <SearchIcon></SearchIcon>
        </Button>
        <Image
            className={style['header-icon']}
            src="http://localhost:3000/static/icon/crow-2.png"
            loading=' '
        />
    </div>
    )
}