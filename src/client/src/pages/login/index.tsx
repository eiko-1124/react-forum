import React, { useRef, useState } from 'react'
import { Button, Divider, Input, Loading } from 'tdesign-react'
import style from '@/styles/login/Login.module.scss'
import Waves from '@/components/login/Waves'
import Retrieve from '@/components/login/Retrieve'
import { registerForm } from '@/core/login/register'
import { signInForm } from '@/core/login/signIn'
import { useRouter } from 'next/router'

export default function index(): JSX.Element {

    const [selectState, setSelectState] = useState(true)
    const [retrieveState, setRetrieveState] = useState(false)
    const [signInFormState, setSignInFormState] = useState(true)
    const [registerFormState, setRegisterFormState] = useState({
        name: true,
        email: true,
        pswd: true,
        dPswd: true
    })
    const [replaceState, setReplaceState] = useState({
        name: false,
        email: false
    })
    const [tipsState, setTipsState] = useState('')
    const [loadingState, setLoadingState] = useState(false)

    const userName = useRef()
    const pswd = useRef()
    const rUserName = useRef()
    const rEmail = useRef()
    const rPswd = useRef()
    const rDPswd = useRef()

    const signIn = signInForm(setSignInFormState, setTipsState, setLoadingState)
    const register = registerForm(setRegisterFormState, setReplaceState, setTipsState, setLoadingState)

    const registerWarning: Array<string | Array<string>> = [['命名不能为空', '用户名已注册'], ['邮箱格式错误', '邮箱已注册'], '密码长度为8~16位', '确认密码出错']

    const router = useRouter()

    return (
        <div className={style['login']}>
            <div className={style['login-box']}>
                <h1>lysname.cn</h1>
                {!retrieveState && <div className={style['login-content'] + (selectState ? ` ${style['login-in']}` : ` ${style['login-register']}`)}>
                    <div className={style['login-btns']}>
                        <button className={selectState ? style['login-btn-select'] : ''} onClick={() => setSelectState(true)}>登录</button>
                        <Divider layout='vertical'></Divider>
                        <button className={selectState ? '' : style['login-btn-select']} onClick={() => setSelectState(false)}>注册</button>
                        <div className={style['login-tips']}>{tipsState}</div>
                    </div>
                    {selectState && <div className={style['login-lines']}>
                        <div className={style['login-line-1']}>
                            <label>用户:</label><Input ref={userName} placeholder='邮箱/用户名' status={signInFormState ? 'default' : 'error'} tips={signInFormState ? '' : '用户或密码错误'}></Input>
                        </div>
                        <div className={style['login-line-1']}>
                            <label>密码:</label><Input ref={pswd} placeholder='密码' type='password' status={signInFormState ? 'default' : 'error'} tips={signInFormState ? '' : '用户或密码错误'}></Input>
                        </div>
                    </div>}
                    {selectState && <div className={style['login-options']}>
                        <Button className={style['login-option']} onClick={() => signIn(userName, pswd, router)}>登录</Button>
                        <Button className={style['login-option']} onClick={() => setRetrieveState(true)}>忘记密码</Button>
                        <Loading className={style['login-loading']} loading={loadingState} text="拼命加载中..." size="small"></Loading>
                    </div>}
                    {!selectState && <div className={style['login-lines']}>
                        <div className={style['login-line-2']}>
                            <label>用户名:</label><Input ref={rUserName} placeholder='唯一标识' status={registerFormState.name && !replaceState.name ? 'default' : 'error'} tips={registerFormState.name ? (replaceState.name ? registerWarning[0][1] : '') : registerWarning[0][0]}></Input>
                        </div>
                        <div className={style['login-line-2']}>
                            <label>邮箱:</label><Input ref={rEmail} placeholder='确保邮箱唯一且有效' status={registerFormState.name && !replaceState.email ? 'default' : 'error'} tips={registerFormState.email ? (replaceState.email ? registerWarning[1][1] : '') : registerWarning[1][0]}></Input>
                        </div>
                        <div className={style['login-line-2']}>
                            <label>密码:</label><Input ref={rPswd} placeholder='密码' type='password' status={registerFormState.pswd ? 'default' : 'error'} tips={registerFormState.pswd ? '' : registerWarning[2]}></Input>
                        </div>
                        <div className={style['login-line-2']}>
                            <label>确认密码:</label><Input ref={rDPswd} placeholder='确认密码' type='password' status={registerFormState.dPswd ? 'default' : 'error'} tips={registerFormState.dPswd ? '' : registerWarning[3]}></Input>
                        </div>
                    </div>}
                    {!selectState && <div className={style['login-options']}>
                        <Button className={style['login-option']} onClick={() => register(rUserName, rEmail, rPswd, rDPswd, router)}>注册</Button>
                        <Button className={style['login-option']} onClick={() => setRetrieveState(true)}>忘记密码</Button>
                        <Loading className={style['login-loading']} loading={loadingState} text="拼命加载中..." size="small"></Loading>
                    </div>}
                </div>}
                {retrieveState && <Retrieve setRetrieveState={setRetrieveState}></Retrieve>}
            </div>
            <Waves></Waves>
        </div>
    )
}
