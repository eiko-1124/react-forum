import md5 from "js-md5"
import axios from "../axios"
import { NextRouter } from "next/router"

type element = {
    current: {
        inputElement: {
            value: string
        }
    }
}

type params = {
    name?: string,
    email?: string
}

type form = {
    name?: string,
    email: string
    pswd: string
}

type setState = {
    setUserState: React.Dispatch<React.SetStateAction<boolean>>,
    setCodeState: React.Dispatch<React.SetStateAction<boolean>>,
    setPswdState: React.Dispatch<React.SetStateAction<boolean>>,
    setDPswdState: React.Dispatch<React.SetStateAction<boolean>>,
    setTipsState: React.Dispatch<React.SetStateAction<string>>,
    setLoadingState: React.Dispatch<React.SetStateAction<boolean>>
}

let timer = null
let verifyTimer = null
let second = 60
let code = null
let vEmail = null
let sendingCode = false
export const setVerificationCode = async (user: element, setTimerState: React.Dispatch<React.SetStateAction<string>>, setUserState: React.Dispatch<React.SetStateAction<boolean>>): Promise<void> => {
    const userValue = user.current.inputElement.value
    if (userValue.length == 0) return
    const isUser = await hasUser(userValue)
    if (!isUser) {
        setUserState(false)
    } else {
        setUserState(true)
        setTime(setTimerState, userValue)
    }
}

const setTime = async (setTimerState: React.Dispatch<React.SetStateAction<string>>, userValue: string) => {
    if (sendingCode) return
    if (!timer) {
        second = 60
        sendingCode = true
        const isGotCode = await sendVerifyCode(userValue)
        sendingCode = false
        if (isGotCode) {
            timer = setInterval(() => {
                if (second != 0) {
                    second--
                    setTimerState(second + '')
                } else {
                    setTimerState('发送验证码')
                    clearInterval(timer)
                    timer = null
                    second = 60
                }
            }, 1000)
        }
    }
}

const hasUser = async (user: string): Promise<boolean> => {
    const params: params = {}
    if (/[\w]+@[A-Za-z]+(\.[A-Za-z0-9]+){1,2}/.test(user)) params.email = user
    else params.name = user
    try {
        const res = await axios.lGet('/local/login/hasUser', params) as { res: number }
        if (res.res === 1) return true
        else return false
    } catch (error) {
        console.log(error)
        return false
    }

}

const sendVerifyCode = async (user: string): Promise<boolean> => {
    const params: params = {}
    if (/[\w]+@[A-Za-z]+(\.[A-Za-z0-9]+){1,2}/.test(user)) params.email = user
    else params.name = user
    try {
        const res = await axios.lGet('/local/login/sendVerifyCode', params) as { res: number, code: string, email: string }
        if (res.res !== 1) return false
        code = res.code
        vEmail = res.email
        clearTimeout(verifyTimer)
        verifyTimer = setTimeout(() => {
            code = null
            vEmail = null
        }, 300000)
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}

export const retrieveForm = (setState: setState) => {
    const retrieve = async (user: element, code: element, pswd: element, dPswd: element, router: NextRouter): Promise<void> => {
        const userValue = user.current.inputElement.value
        const codeValue = code.current.inputElement.value
        const pswdValue = pswd.current.inputElement.value
        const dPswdValue = dPswd.current.inputElement.value

        const checker = formCheck()
        const checkRes = new Array()
        checkRes.push(checker('user', userValue))
        checkRes.push(checker('code', codeValue))
        checkRes.push(checker('pswd', pswdValue))
        checkRes.push(checker('dPswd', pswdValue, dPswdValue))
        setState.setUserState(checkRes[0])
        setState.setCodeState(checkRes[1])
        setState.setPswdState(checkRes[2])
        setState.setDPswdState(checkRes[3])
        if (checkRes.reduce((prev: boolean, cur: boolean): boolean => prev && cur, true)) {
            const form: form = {
                pswd: pswdValue,
                email: vEmail
            }
            if (/[\w]+@[A-Za-z]+(\.[A-Za-z0-9]+){1,2}/.test(userValue)) {
                if (userValue !== vEmail) {
                    setState.setTipsState('用户已更改')
                    return
                }
            }
            else form.name = userValue
            const res = await recover(form)
            recoverRes(res, setState, router)
        }
    }
    return retrieve
}

const formCheck = (): Function => {
    const map = new Map()
    const pswdCheck = (pswd: string): boolean => {
        return (pswd.length > 7 && pswd.length < 17)
    }
    const dPswdCheck = (pswd: string, dPswd: string): boolean => {
        return (pswd == dPswd)
    }
    const codeCheck = (vCode: string): boolean => {
        return vCode === code
    }

    const userCheck = (user: string): boolean => {
        return user.length > 0
    }

    map.set('pswd', pswdCheck)
    map.set('dPswd', dPswdCheck)
    map.set('code', codeCheck)
    map.set('user', userCheck)
    return (attr: string, ...rest: string[]): boolean => {
        const checker = map.get(attr)
        const res = checker(...rest)
        return res
    }
}

const recover = async (form: form): Promise<number> => {
    try {
        const res: { res: number } = await axios.lPost('/local/login/recover', {
            ...form,
            pswd: md5(form.pswd)
        }) as { res: number }
        return res.res
    } catch (error: unknown) {
        console.log(error)
        return -1
    }
}

const recoverRes = (res: number, setState: setState, router: NextRouter): void => {
    if (res === 1) {
        setState.setTipsState('修改成功，准备跳转')
        setState.setLoadingState(true)
        router.replace('/')
    }
    else if (res == -1) setState.setTipsState('修改失败，网络错误')
    else setState.setTipsState('未知错误')
}