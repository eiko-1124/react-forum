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