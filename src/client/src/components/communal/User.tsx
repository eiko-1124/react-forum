import style from '@/styles/communal/User.module.scss'
import Info from '../user/Info'
import UserClassify from '../user/UserClassify'
import Notify from '../user/Notify'
import { ChevronRightIcon } from 'tdesign-icons-react'
import Consumer from '../user/Consumer'
export default function (): JSX.Element {

    return (
        <div className={style.user}>
            <Info></Info>
            <div className={style['user-double-dashed']}></div>
            <div className={style['user-double-dashed']}></div>
            <UserClassify></UserClassify>
            <Notify></Notify>
            <Consumer title='我关注的'></Consumer>
            <Consumer title='关注我的'></Consumer>
            <div className={style['user-btn']}><h4>帖子管理</h4><ChevronRightIcon className={style['user-arrow']} size='large' /></div>
            <div className={style['user-btn']}><h4>收藏/历史</h4><ChevronRightIcon className={style['user-arrow']} size='large' /></div>
        </div>
    )
}