export interface chatUserRes {
    res: number,
    chatUsers: chatUser[]
}

export interface chatUser {
    uid: string,
    name: string,
    avatar: string,
    text: string,
    nSum: number,
    date: Date
}

export interface unReadRes {
    res: number,
    messages: message[]
}

export interface message {
    hid: string
    uid1: string
    name1: string,
    avatar1: string,
    uid2: string
    name2: string,
    avatar2: string,
    text: string,
    date: Date
}

export interface historyRes {
    res: number,
    messages: message[]
}

export interface setMessageRes {
    res: number
}

export interface newChatRes {
    res: number,
    chatUser?: chatUser
}