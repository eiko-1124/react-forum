import React, { useEffect } from 'react'
import style from '@/styles/admin/PersonalCenter.module.scss'
import { Divider } from 'tdesign-react'
import MenuItem from 'tdesign-react/es/menu/MenuItem'
import HeadMenu from 'tdesign-react/es/menu/HeadMenu'
import usePersonCenter from '@/core/admin/usePersonCenter'
import { useRouter } from 'next/router'
import PersonInfo from './PersonInfo'
import PersonInvitation from './PersonInvitation'
import PersonHistory from './PersonHistory'
import PersonCollect from './PersonCollect'
import PersonNoticy from './PersonNoticy'
import PersonPlate from './PersonPlate'
import PersonFriend from './PersonFriend'
import PersonBlacklist from './PersonBlacklist'
import PersonChat from './PersonChat'

const classStyles = `
<style>
.personalCenter-menu .t-menu--light{
    background-color: transparent;
}
</style>
`;

export default function PersonalCenter(): JSX.Element {
    const bgStr = 'url(http://localhost:3000/static/background/1.jpg)'

    const route = useRouter()

    const { state, methods } = usePersonCenter()

    useEffect(() => {
        document.head.insertAdjacentHTML('beforeend', classStyles);
    }, [])

    return (
        <div className={style['personalCenter']}>
            <Divider
                align="center"
                dashed={false}
                layout="horizontal"
                className={style['personalCenter-horizontal']}
            >管理中心</Divider>
            <div className={style['personalCenter-bg']} style={{ backgroundImage: bgStr }}></div>
            <div className={'personalCenter-menu ' + style['personalCenter-menu']}>
                <HeadMenu
                    value={state.menuState}
                    onChange={(val: string) => methods.menuChange(val)}
                    style={{ marginRight: 20 }}
                >
                    <MenuItem value={'1'}>
                        <span>用户</span>
                    </MenuItem>
                    <MenuItem value={'2'}>
                        <span>帖子</span>
                    </MenuItem>
                    <MenuItem value={'3'}>
                        <span>板块</span>
                    </MenuItem>
                    <MenuItem value={'4'}>
                        <span>历史</span>
                    </MenuItem>
                    <MenuItem value={'5'}>
                        <span>收藏</span>
                    </MenuItem>
                    <MenuItem value={'6'}>
                        <span>消息</span>
                    </MenuItem>
                    <MenuItem value={'7'}>
                        <span>好友</span>
                    </MenuItem>
                    <MenuItem value={'8'}>
                        <span>私聊</span>
                    </MenuItem>
                    <MenuItem value={'9'}>
                        <span>黑名单</span>
                    </MenuItem>
                </HeadMenu>
            </div>
            <div className={style['personalCenter-content']}>
                <Divider style={{ margin: '0rem' }}></Divider>
                {state.menuState === '1' && <PersonInfo></PersonInfo>}
                {state.menuState === '2' && <PersonInvitation></PersonInvitation>}
                {state.menuState === '3' && <PersonPlate></PersonPlate>}
                {state.menuState === '4' && <PersonHistory></PersonHistory>}
                {state.menuState === '5' && <PersonCollect></PersonCollect>}
                {state.menuState === '6' && <PersonNoticy></PersonNoticy>}
                {state.menuState === '7' && <PersonFriend></PersonFriend>}
                {state.menuState === '8' && <PersonChat></PersonChat>}
                {state.menuState === '9' && <PersonBlacklist></PersonBlacklist>}
            </div>
        </div>
    )
}
