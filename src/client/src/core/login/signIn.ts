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

type form = {
    name?: string,
    email?: string,
    pswd: string
}

export const signInForm = (setSignInState: React.Dispatch<React.SetStateAction<boolean>>, setTipsState: React.Dispatch<React.SetStateAction<string>>, setLoadingState: React.Dispatch<React.SetStateAction<boolean>>): Function => {

    const signIn = async (user: element, pswd: element, router: NextRouter): Promise<void> => {
        const userValue = user.current.inputElement.value
        const pswdValue = pswd.current.inputElement.value
        const form = checkForm(userValue, pswdValue)
        if (!form) {
            setSignInState(false)
            setTipsState('')
            return
        }
        const res = await goSignIn(form as form)
        if (res === -1) {
            setSignInState(true)
            netWorkError(setTipsState)
        } else if (res === 1) {
            setSignInState(true)
            netWorkSuccess(setTipsState, setLoadingState, router)
        } else if (res === 2) {
            setSignInState(false)
            setTipsState('')
        }
    }
    return signIn
}

const checkForm = (userValue: string, pswdValue: string): (boolean | form) => {
    if (userValue.length === 0 || pswdValue.length === 0) return false
    const pswd = md5(pswdValue)
    if (/[\w]+@[A-Za-z]+(\.[A-Za-z0-9]+){1,2}/.test(userValue)) {
        return {
            email: userValue,
            pswd
        }
    }
    return {
        name: userValue,
        pswd
    }
}

const goSignIn = async (form: form): Promise<number> => {
    try {
        const res: { res: number } = await axios.post('/login/signIn',
            form) as { res: number }
        return res.res
    } catch (error: unknown) {
        console.log(error)
        return -1
    }
}

const netWorkError = (setTipsState: React.Dispatch<React.SetStateAction<string>>): void => {
    setTipsState('登录失败，网络错误')
}

const netWorkSuccess = (setTipsState: React.Dispatch<React.SetStateAction<string>>, setLoadingState: React.Dispatch<React.SetStateAction<boolean>>, router: NextRouter): void => {
    setTipsState('登录成功，准备跳转')
    setLoadingState(true)
    router.replace('/')
}