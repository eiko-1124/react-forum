import { NextRouter } from "next/router"
import axios from "../axios"
import md5 from "js-md5"

type element = {
    current: {
        inputElement: {
            value: string
        }
    }
}

type form = {
    name: string,
    email: string,
    pswd: string
}

type registerState = {
    name: boolean;
    email: boolean;
    pswd: boolean;
    dPswd: boolean;
}

type replaceState = {
    name: boolean,
    email: boolean
}

export const registerForm = (setRegisterState: React.Dispatch<React.SetStateAction<registerState>>, setReplaceState: React.Dispatch<React.SetStateAction<replaceState>>, setTipsState: React.Dispatch<React.SetStateAction<string>>, setLoadingState: React.Dispatch<React.SetStateAction<boolean>>): Function => {
    const register = async (userName: element, email: element, pswd: element, dPswd: element, router: NextRouter): Promise<void> => {
        const nameValue: string = userName.current.inputElement.value
        const emailValue: string = email.current.inputElement.value
        const pswdValue: string = pswd.current.inputElement.value
        const dPswdValue: string = dPswd.current.inputElement.value

        const checker = formCheck()
        const state: registerState = {
            name: checker('name', nameValue),
            email: checker('email', emailValue),
            pswd: checker('pswd', pswdValue),
            dPswd: checker('dPswd', pswdValue, dPswdValue)
        }
        setRegisterState(state)

        const checkRes = Object.values(state).reduce((prev: boolean, cur: boolean): boolean => prev && cur, true)
        if (checkRes) {
            const res = await goRegister({
                name: nameValue,
                email: emailValue,
                pswd: pswdValue
            })
            console.log(res)
            if (res === -1) {
                netWorkError(setTipsState)
            } else if (res === 1) {
                netWorkSuccess(setTipsState, setLoadingState, router)
            } else if (res == 2) {
                setReplaceState({
                    name: true,
                    email: false
                })
            } else if (res === 3) {
                setReplaceState({
                    name: false,
                    email: true
                })
            }
        }
        else setReplaceState({
            name: state.name,
            email: state.email
        })
    }

    return register
}

const formCheck = (): Function => {
    const map = new Map()
    const pswdCheck = (pswd: string): boolean => {
        return (pswd.length > 7 && pswd.length < 17)
    }
    const dPswdCheck = (pswd: string, dPswd: string): boolean => {
        return (pswd == dPswd)
    }
    const emailCheck = (email: string): boolean => {
        return /[\w]+@[A-Za-z]+(\.[A-Za-z0-9]+){1,2}/.test(email)
    }

    const nameCheck = (name: string): boolean => {
        return name.length > 0
    }

    map.set('pswd', pswdCheck)
    map.set('dPswd', dPswdCheck)
    map.set('email', emailCheck)
    map.set('name', nameCheck)
    return (attr: string, ...rest: string[]): boolean => {
        const checker = map.get(attr)
        const res = checker(...rest)
        return res
    }
}

const goRegister = async (form: form): Promise<number> => {
    try {
        const res: { res: number } = await axios.lPost('local/login/register', {
            ...form,
            pswd: md5(form.pswd)
        }) as { res: number }
        return res.res
    } catch (error: unknown) {
        console.log(error)
        return -1
    }
}

const netWorkError = (setTipsState: React.Dispatch<React.SetStateAction<string>>): void => {
    setTipsState('注册失败，网络错误')
}

const netWorkSuccess = (setTipsState: React.Dispatch<React.SetStateAction<string>>, setLoadingState: React.Dispatch<React.SetStateAction<boolean>>, router: NextRouter): void => {
    setTipsState('注册成功，准备跳转')
    setLoadingState(true)
    router.replace('/')
}