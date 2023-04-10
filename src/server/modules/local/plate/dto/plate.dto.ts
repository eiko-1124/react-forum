export interface plateListRes {
    res: number,
    plates?: plateAbstract[]
}

export interface plateAbstract {
    pid: string,
    name: string,
    avater: string,
    subscribe: number,
    invitation: number
}

export interface plateSumRes {
    res: number,
    sum?: number
}