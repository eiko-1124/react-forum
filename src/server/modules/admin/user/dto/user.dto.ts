export interface userInfoRes {
    res: number,
    info?: queryInfoRes
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

export interface setNameRes {
    res: number
}

export interface setAvatarRes {
    res: number,
    url: string
}
