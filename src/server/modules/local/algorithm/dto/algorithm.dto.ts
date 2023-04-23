export interface tag {
    tag: string
}

export interface rating {
    uid: string,
    tag: string,
    rating: number
}

export interface invitationSite {
    action: number,
    time: Date
}