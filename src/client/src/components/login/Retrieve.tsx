import React, { useRef, useState } from 'react'
import style from '@/styles/login/Login.module.scss'
import { Button, Input, Loading } from 'tdesign-react'
import { retrieveForm, setVerificationCode } from '@/core/login/retrieve'
import { useRouter } from 'next/router'

type Props = { setRetrieveState: React.Dispatch<React.SetStateAction<boolean>> }

export default function retrieve({ setRetrieveState }: Props): JSX.Element {

    const [timerState, setTimerState] = useState('发送验证码')
    const [userState, setUserState] = useState(true)
    const [codeState, setCodeState] = useState(true)
    const [pswdState, setPswdState] = useState(true)
    const [dPswdState, setDPswdState] = useState(true)
    const [tipsState, setTipsState] = useState('')
    const [loadingState, setLoadingState] = useState(false)

    const user = useRef()
    const code = useRef()
    const pswd = useRef()
    const dPswd = useRef()

    const retrieve = retrieveForm({ setUserState, setCodeState, setPswdState, setDPswdState, setTipsState, setLoadingState })
    const router = useRouter()

    return (
        <div className={style['login-content'] + ` ${style['login-retrieve']}`}>
            <div className={style['login-btns']}>
                <div className={style['login-retrieve-label']}>找回</div>
                <div className={style['login-tips']}>{tipsState}</div>
            </div>
            <div className={style['login-lines']}>
                <div className={style['login-line-2']}>
                    <label>邮箱:</label><Input ref={user} placeholder='邮箱/用户名' status={userState ? 'default' : 'error'} tips={userState ? '' : '用户不存在'}></Input>
                </div>
                <div className={style['login-line-2']}>
                    <label>验证码:</label><Input ref={code} placeholder='验证码' status={codeState ? "default" : 'error'} tips={codeState ? '' : '验证码错误'}></Input><Button className={style['login-verify-btn']} onClick={() => setVerificationCode(user, setTimerState, setUserState)}>{timerState}</Button>
                </div>
                <div className={style['login-line-2']}>
                    <label>密码:</label><Input ref={pswd} placeholder='密码' type='password' status={pswdState ? 'default' : 'error'} tips={pswdState ? '' : '密码8~16位'}></Input>
                </div>
                <div className={style['login-line-2']}>
                    <label>确认密码:</label><Input ref={dPswd} placeholder='确认密码' type='password' status={dPswdState ? 'default' : 'error'} tips={dPswdState ? '' : '确认密码错误'}></Input>
                </div>
            </div>
            <div className={style['login-options']}>
                <Button className={style['login-option']} onClick={() => retrieve(user, code, pswd, dPswd, router)}>
                    <label>找回</label>
                </Button>
                <Button className={style['login-option']} onClick={() => setRetrieveState(false)}>
                    <label>返回</label>
                </Button>
                <Loading className={style['login-loading']} loading={loadingState} text="拼命加载中..." size="small"></Loading>
            </div>
        </div>
    )
}
