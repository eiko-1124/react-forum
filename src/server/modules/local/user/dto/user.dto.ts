export interface userInfoRes {
    res: number,
    data: {
        info?: queryInfoRes,
        plates?: queryPlateRes[],
        subscribers?: querySubscribersRes[],
        fans?: queryFansRes[]
    }
}

export interface queryInfoRes {
    name: string,
    avatar: string,
    publish: number,
    like: number,
    reply: number,
    subscribe: number,
    fans: number
}

export interface queryPlateRes {
    pid: string,
    name: string,
    level: number
}

export interface querySubscribersRes {
    uid: string,
    name: string,
    avatar: string
}

export interface queryFansRes {
    uid: string,
    name: string,
    avatar: string
}