export interface subscribeRes {
    res: number
}

export interface noteRes {
    res: number,
    ranking?: {
        exp: number,
        level: number,
        maxExp?: number,
        note: Date
    }
}

export interface createNewPlateRes {
    res: number,
    id?: string
}