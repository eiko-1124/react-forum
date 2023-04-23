import React, { useEffect } from 'react'
import style from '@/styles/admin/PersonalCenter.module.scss'
import { Divider } from 'tdesign-react'
import MenuItem from 'tdesign-react/es/menu/MenuItem'
import HeadMenu from 'tdesign-react/es/menu/HeadMenu'
import usePersonCenter from '@/core/admin/usePersonCenter'
import { useRouter } from 'next/router'
import FansInfo from './FansInfo'
import FansInvitation from './FansInvitation'
import FansPlate from './FansPlate'
import FansCollect from './FansCollect'
import FansFriend from './FansFriend'

const classStyles = `
<style>
.personalCenter-menu .t-menu--light{
    background-color: transparent;
}
</style>
`;

export default function FansCenter(): JSX.Element {
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
                        <span>收藏</span>
                    </MenuItem>
                    <MenuItem value={'5'}>
                        <span>好友</span>
                    </MenuItem>
                </HeadMenu>
            </div>
            <div className={style['personalCenter-content']}>
                <Divider style={{ margin: '0rem' }}></Divider>
                {state.menuState === '1' && <FansInfo></FansInfo>}
                {state.menuState === '2' && <FansInvitation></FansInvitation>}
                {state.menuState === '3' && <FansPlate></FansPlate>}
                {state.menuState === '4' && <FansCollect></FansCollect>}
                {state.menuState === '5' && <FansFriend></FansFriend>}
            </div>
        </div>
    )
}
