export interface publishRes {
    res: number,
    id?: string
}

export interface likeRes {
    res: number,
    lSum?: number
}

export interface collectRes {
    res: number,
    cSum?: number
}

export interface adminInvitationRes {
    res: number,
    pSum: number,
    adminInvitations: adminInvitation[]
}

export interface adminInvitation {
    iid: string,
    title: string,
    text: string,
    plate: string,
    floor?: string
}

export interface deleteRes {
    res: number
}

export interface invitationDetailRes {
    res: number,
    title: string,
    text: string
}

export interface updateInvitationRes {
    res: number
}

export interface getSubscribeInvitationRes {
    res: number,
    iSum: number,
    subscribeInvitations: subscribeInvitation[]
}

export interface subscribeInvitation {
    iid: string,
    uid: string,
    pid: string,
    uName: string,
    pName: string,
    title: string,
    text: string,
    date: Date
}