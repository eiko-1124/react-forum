export interface postCommentRes {
    res: number,
    replys: [],
    comment?: comment,
    owner?: owner
}

export interface comment {
    cid: string,
    text: string,
    floor: number,
    lSum: number,
    rSum: number,
    date: Date,
    isLike: boolean
}

export interface owner {
    uid: string,
    name: string,
    leval: number,
    avatar: string,
    admin: boolean,
    owner: boolean,
    floorer: boolean
}

export interface replyRes {
    res: number,
    reply?: reply
}

export interface reply {
    cid1: string,
    text: string,
    date: Date,
    uid1: string,
    uid2: string,
    name1?: string,
    name2?: string
}