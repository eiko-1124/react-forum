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

export interface detailsRes {
    res: number,
    target?: details,
    owner?: owner
}

export interface details {
    pid: string,
    name: string,
    introduction: string,
    sSum: number,
    iSum: number,
    avatar: string,
    tag: string,
    owner: string
}

export interface owner {
    uid: string,
    name: string
}

export interface noticeRes {
    res: number,
    notice: string
}

export interface subscribeRes {
    res: number
}

export interface adminRes {
    res: number
    admins: admin[]
}

export interface admin {
    uid: string,
    avater: string,
    name: string
}

export interface rankingRes {
    res: number,
    ranking: ranking
}

export interface ranking {
    exp: number,
    level: number,
    maxExp?: number,
    note: Date
}