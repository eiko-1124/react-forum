import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import axios from "../axios"
import { stateMethod } from "../state"
import { MessagePlugin } from "tdesign-react"
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
    pSum: number,
    date: string,
    top: number,
    quality: number
}

export default function ({ owner, comments, invitation }: Props) {
    const route = useRouter()
    const [vSumState, setVSumState] = useState(0)
    const [lSumState, setlSumState] = useState(0)
    const [CSumState, setCSumState] = useState(0)
    const [ASumState, setASumState] = useState(0)
    const [likeState, setLikeState] = useState(false)
    const [collectState, setCollectState] = useState(false)
    const [commentsState, setCommentState] = useState(comments)
    const [topState, setTopState] = useState(invitation.top == 1)
    const [qualityState, setQualityState] = useState(invitation.quality == 1)
    const [roteState, setRoteState] = useState({
        admin: false,
        owner: false
    })

    useEffect(() => {
        setlSumState(invitation.lSum)
        setCSumState(invitation.coSum)
        setASumState(invitation.acSum)
        let promise = new Promise(async (resolve) => {
            const subRes: substanceRes = await axios.get('/local/invitation/getSubstance', { iid: route.query['id'] }) as substanceRes
            resolve(subRes)
        })
        promise.then((Res: substanceRes) => {
            if (Res.res === 1) {
                setVSumState(Res.vSum)
                setLikeState(Res.isLike == 1)
                setCollectState(Res.isCollect == 1)
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
        getRote()
    }, [route.query])

    const getRote = async () => {
        try {
            const res = await axios.get('local/invitation/getRote', { iid: route.query['iid'] }) as { res: number, admin: boolean, owner: boolean }
            if (res.res == 1) {
                setRoteState({
                    admin: res.admin,
                    owner: res.owner
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    const setLike = async () => {
        const res = await axios.post('admin/invitation/setLike', {
            iid: route.query['id'],
            owner: owner.uid,
            flag: likeState ? false : true
        }) as { res: number, lSum: number }
        if (res.res === 1) {
            setLikeState(!likeState)
            setlSumState(res.lSum)
            stateMethod.setInfo()
        }
    }

    const setCollect = async () => {
        const res = await axios.post('admin/invitation/setCollect', {
            iid: route.query['id'],
            flag: collectState ? false : true,
            floor: commentsState[0].comment.floor
        }) as { res: number, cSum: number }
        if (res.res === 1) {
            setCollectState(!collectState)
            setCSumState(res.cSum)
            stateMethod.setInfo()
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

    const deleteInvitation = async () => {
        try {
            const res = await axios.post('/admin/invitation/deleteAdminInvitation', { iid: route.query['id'] }) as { res: number }
            if (res.res === 1) {
                MessagePlugin.info('删除成功', 3000)
                route.replace(`/plate/${route.query['pid']}`)
            } else MessagePlugin.info('删除失败', 3000)
        } catch (error) {
            console.log(error)
        }
    }

    const setTop = async () => {
        try {
            const res = await axios.post('admin/invitation/setTop', { iid: route.query['id'], flag: topState }) as { res: number }
            if (res.res == 1) {
                setTopState(!topState)
                MessagePlugin.info('操作成功')
            } else MessagePlugin.info('操作失败')
        } catch (error) {
            console.log(error)
        }
    }

    const setQuality = async () => {
        try {
            const res = await axios.post('admin/invitation/setQuality', { iid: route.query['id'], flag: topState }) as { res: number }
            if (res.res == 1) {
                setQualityState(!qualityState)
                MessagePlugin.info('操作成功')
            } else MessagePlugin.info('操作失败')
        } catch (error) {
            console.log(error)
        }
    }

    const goFans = (cid: string) => {
        route.push(`/fans/1/${cid}`)
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
        setASumState(ASumState + 1)
    }

    stateMethod.deleteCommit = (cid: string) => {
        for (let i = 0; i < commentsState.length; i++) {
            if (commentsState[i].comment.cid == cid) {
                commentsState.splice(i, 1)
                setCommentState([...commentsState])
            }
        }
    }

    return {
        vSumState,
        commentsState,
        likeState,
        collectState,
        lSumState,
        ASumState,
        CSumState,
        roteState,
        topState,
        qualityState,
        setLike,
        getComments,
        setCollect,
        goFans,
        deleteInvitation,
        setTop,
        setQuality
    }
}