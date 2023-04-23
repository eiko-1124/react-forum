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

export interface PreferenceRes {
    res: number,
    preference: preference[]
}

export interface preference {
    name: string,
    sum: string,
    pid: string
}

export interface adminPlateRes {
    res: number,
    adminPlates?: adminPlate[]
}

export interface adminPlate {
    pid: string,
    name: string,
    level: string,
    avatar: string
}

export interface adminPlateORes {
    res: number,
    adminPlatesO: adminPlateO[]
}

export interface adminPlateO {
    pid: string,
    name: string,
    admins?: adminO[]
}

export interface adminO {
    uid: string,
    name: string,
    level: string,
    avatar: string
}

export interface unRes {
    res: number
}

export interface setNoticeRes {
    res: number
}

export interface isAdminRes {
    res: number
}