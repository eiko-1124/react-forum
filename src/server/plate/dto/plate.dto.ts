export interface simpleSearchRes {
    res: number
    target?: {
        id: string
        name: string
        introduction: string
    },
    list?: {
        id: string,
        name: string
    }[]
}

export interface createNewPlateRes {
    res: number,
    id?: string
}

export interface detailsRes {
    res: number,
    target?: {
        id: string,
        name: string,
        introduction: string,
        usum: number,
        isum: number,
        avatar: string,
        tag: string
    }
}