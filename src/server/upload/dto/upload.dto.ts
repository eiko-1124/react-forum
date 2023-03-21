export interface uploadImageRes {
    errno: number,
    data?: {
        url: string,
        alt?: string,
        href?: string
    },
    message?: string
}

export interface uploadVideoRes {
    errno: number,
    data?: {
        url: string,
        poster?: string
    },
    message?: string
}