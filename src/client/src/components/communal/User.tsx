import style from '@/styles/communal/User.module.scss'
import Info from '../user/Info'
import UserClassify from '../user/UserClassify'
import Notify from '../user/Notify'
import { ChevronRightIcon } from 'tdesign-icons-react'
import Consumer from '../user/Consumer'
import { useEffect, useState } from 'react'
import useUserInfo from '@/core/communal/useUserInfo'

export default function (): JSX.Element {

    const { defaultData, getUserInfo } = useUserInfo()
    const [dataState, setDataState] = useState(defaultData)
    let init: boolean = false

    useEffect(() => {
        if (!init) {
            init = true
            getUserInfo(setDataState)
        }
    }, [])

    return (
        <div className={style.user}>
            <Info {...dataState.info}></Info>
            <div className={style['user-double-dashed']}></div>
            <div className={style['user-double-dashed']}></div>
            <UserClassify plates={dataState.plates}></UserClassify>
            <Notify></Notify>
            <Consumer friends={dataState.subscribers} title='我关注的'></Consumer>
            <Consumer friends={dataState.fans} title='关注我的'></Consumer>
            <div className={style['user-btn']}><h4>帖子管理</h4><ChevronRightIcon className={style['user-arrow']} size='large' /></div>
            <div className={style['user-btn']}><h4>收藏/历史</h4><ChevronRightIcon className={style['user-arrow']} size='large' /></div>
        </div>
    )
}