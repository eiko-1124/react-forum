import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "../axios";
import { MessagePlugin } from "tdesign-react";

type reply = {
    cid1: string,
    text: string,
    date: string,
    uid1: string,
    uid2: string,
    name1?: string,
    name2?: string
}

type comment = {
    cid: string,
    text: string,
    floor: number,
    lSum: number,
    rSum: number,
    date: string,
    isLike: boolean
}

export default function (replys: reply[], comment: comment) {

    const route = useRouter()
    const [valueState, setValueState] = useState('')
    const [hasReplyState, sethasReplyState] = useState(replys.length != 0)
    const [isLikeState, setisLikeState] = useState(comment.isLike)
    const [lSumState, setLSumState] = useState(comment.lSum)
    const [rSumState, setRSumState] = useState(comment.rSum)
    const [replyState, setReplyState] = useState(replys)
    const [rUserState, setRUserState] = useState({ uid: '', name: '' })
    const [retractState, setRetractState] = useState(true)

    useEffect(() => {
        setisLikeState(comment.isLike)
        setLSumState(comment.lSum)
        setRSumState(comment.rSum)
    }, [comment])

    const setComment = () => {
        sethasReplyState(!hasReplyState)
    }

    const postReply = async (cid: string) => {
        try {
            const params = {
                iid: route.query['id'],
                text: valueState,
                cid
            }
            if (rUserState.uid.length != 0) params['uid2'] = rUserState.uid
            const res = await axios.post('admin/comment/postReply', params) as { res: number, reply: reply }
            if (res.res === 1) {
                setReplyState([...replyState, res.reply])
                setRSumState(rSumState + 1)
                MessagePlugin.info('评论成功', 3 * 1000)
            }
            else MessagePlugin.info('评论失败', 3 * 1000)
        } catch (error) {
            console.log(error)
        }
    }

    const getReplys = async (page: number) => {
        if (retractState) setRetractState(false)
        try {
            const res = await axios.get('local/comment/getReplys', { cid: comment.cid, page }) as { res: number, replys: reply[] }
            if (res.res === 1) setReplyState(res.replys)
        } catch (error) {
            console.log(error)
        }
    }

    return {
        state: {
            hasReplyState,
            replyState,
            valueState,
            isLikeState,
            lSumState,
            rSumState,
            rUserState,
            retractState
        },
        methods: {
            setComment,
            postReply,
            setValueState,
            getReplys,
            setRUserState
        }
    }
}