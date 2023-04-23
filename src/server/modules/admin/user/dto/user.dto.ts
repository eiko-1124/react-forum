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

export interface getFriendsRes {
    res: number,
    subscribers?: friend[],
    fans?: friend[]
}

export interface friend {
    uid: string,
    name: string,
    avatar: string
}

export interface unFriendRes {
    res: number
}

export interface setFriendRes {
    res: number
}

export interface getUserBlackListRes {
    res: number,
    blackList?: userBlackList[]
}

export interface getPlateBlackListRes {
    res: number,
    plate?: {
        pid: string,
        name: string,
        blackList?: userBlackList[]
    }[]
}

export interface userBlackList {
    uid: string,
    name: string,
    avatar: string
}

export interface unUserBlackList {
    res: number
}

export interface setUserBlackList {
    res: number
}

export interface unPlateBlackList {
    res: number
}

export interface setPlateBlackList {
    res: number
}