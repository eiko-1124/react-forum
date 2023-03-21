export interface signInRes {
    res: number
    name?: string
    id?: string
}

export interface registerRes {
    res: number
}

export interface hasUserRes {
    res: number
}

export interface signInForm {
    name?: string,
    pswd: string,
    email?: string
}

export interface registerForm {
    name: string,
    pswd: string,
    email: string
}

export interface sendVerifyCodeRes {
    res: number,
    code?: string,
    email?: string
}

export interface recoverForm {
    name?: string,
    email: string,
    pswd?: string
}

export interface recoverRes {
    res: number,
    name?: string,
    id?: string
}