export interface simpleSearchRes {
    res: number
    target?: {
        pid: string
        name: string
        introduction: string
    },
    list?: {
        pid: string,
        name: string
    }[]
}

export interface allRes {
    res: number,
    target?: target,
    owner?: owner,
    plates?: plates[],
    plateSum?: number,
    users?: users[],
    userSum?: number,
    invitations?: invitations[],
    invitationSum?: number
}

export interface target {
    pid: string,
    name: string,
    introduction: string
    avatar: string,
    tag: string,
    sSum: number,
    iSum: number,
    owner: string
}

export interface owner {
    uid: string,
    name: string
}

export interface plates {
    pid: string,
    name: string,
    avatar: string,
    sSum: number,
    iSum: number,
}

export interface users {
    uid: string,
    name: string,
    avatar: string
}

export interface invitations {
    iid: string,
    uid: string,
    pid: string,
    uName: string,
    pName: string,
    title: string,
    text: string,
    date: Date
}

export interface stationRes {
    res: number,
    sSum: number,
    stations: station[]
}

export interface station {
    iid: string,
    title: string,
    plate: string
    date: Date
}