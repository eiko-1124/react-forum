export interface TopRes {
    res: number,
    tops: tInvitation[]
}

export interface tInvitation {
    iid: string,
    title: string
}

export interface invitationRes {
    res: number,
    invitation?: dInvitation,
    owner?: owner,
}

export interface dInvitation {
    iid: string,
    owner: string,
    text: string,
    title: string,
    top: number,
    quality: number,
    acSum?: number,
    coSum?: number,
    lSum?: number,
    pSum?: number
    date: Date
}

export interface owner {
    uid: string,
    name: string,
    avatar: string,
    level?: number
}


export interface substanceRes {
    res: number,
    vSum?: number,
    isCollect?: number,
    isLike?: number
}