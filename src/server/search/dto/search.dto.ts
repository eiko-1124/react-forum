export interface allRes {
    res: number,
    target?: {
        id: string,
        name: string,
        introduction: string,
        usum: number,
        isum: number,
        avatar: string,
        tag: string
    },
    plateSum?: number,
    plateLists?: {
        id: string,
        name: string,
        usum: number,
        isum: number,
        avatar: string
    }[],
    invitationSum?: number,
    invitationLists?: [],
    userSum?: number,
    userList?: []
}