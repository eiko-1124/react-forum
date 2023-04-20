import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import axios from "../axios"
import { stateMethod } from "../state"
type Props = {
    owner: owner,
    comments: comments,
    invitation: invitation
}

type owner = {
    uid: string,
    name: string,
    avatar: string,
    level: number
}

type substanceRes = {
    res: number,
    vSum?: number,
    isCollect?: number,
    isLike?: number
}

type commentsRes = {
    res: number
    comments: comments
}

type comments = {
    owner: {
        uid: string,
        name: string,
        leval: number,
        avatar: string,
        admin: boolean,
        owner: boolean,
        floorer: boolean
    },
    comment: comment,
    replys: reply[]
}[]

type comment = {
    cid: string,
    text: string,
    floor: number,
    lSum: number,
    rSum: number,
    date: string,
    isLike: boolean
}

type reply = {
    cid1: string,
    text: string,
    date: string,
    uid1: string,
    uid2: string,
    name1?: string,
    name2?: string
}

type invitation = {
    id: string,
    title: string,
    text: string,
    acSum: number,
    coSum: number,
    lSum: number,
    pSum: number
    date: string
}

export default function ({ owner, comments, invitation }: Props) {
    const route = useRouter()
    const [vSumState, setVSumState] = useState(0)
    const [lSumState, setlSumState] = useState(0)
    const [likeState, setLikeState] = useState(0)
    const [collectState, setCollectState] = useState(0)
    const [commentsState, setCommentState] = useState(comments)

    useEffect(() => {
        setlSumState(invitation.lSum)
        let promise = new Promise(async (resolve) => {
            const subRes: substanceRes = await axios.get('/local/invitation/getSubstance', { iid: route.query['id'] }) as substanceRes
            resolve(subRes)
        })
        promise.then((Res: substanceRes) => {
            if (Res.res === 1) {
                setVSumState(Res.vSum)
                setLikeState(Res.isLike)
                setCollectState(Res.isCollect)
            }
        })
        promise = new Promise(async (resolve) => {
            const commentsRes: commentsRes = await axios.get('/local/comment/getComment', { iid: route.query['id'], pid: route.query['pid'], page: 0 }) as commentsRes
            resolve(commentsRes)
        })
        promise.then((Res: commentsRes) => {
            if (Res.res === 1) {
                setCommentState(Res.comments)
            }
        })
    }, [route.query])

    const setLike = async () => {
        const res = await axios.post('admin/invitation/setLike', {
            iid: route.query['id'],
            owner: owner.uid,
            flag: likeState ? false : true
        }) as { res: number, lSum: number }
        if (res.res === 1) {
            setLikeState(res.lSum)
            setlSumState(res.lSum)
        }
    }

    const getComments = async (page: number) => {
        try {
            page = page - 1
            const res: commentsRes = await axios.get('/local/comment/getComment', { iid: route.query['id'], pid: route.query['pid'], page }) as commentsRes
            if (res.res === 1) {
                setCommentState(res.comments)
            }
        } catch (error) {
            console.log(error)
        }
    }

    stateMethod.addCommit = (comment: {
        owner: {
            uid: string,
            name: string,
            leval: number,
            avatar: string,
            admin: boolean,
            owner: boolean,
            floorer: boolean
        },
        comment: comment,
        replys: reply[]
    }) => {
        setCommentState([...commentsState, comment])
    }

    return {
        vSumState,
        commentsState,
        likeState,
        lSumState,
        setLike,
        getComments
    }
}