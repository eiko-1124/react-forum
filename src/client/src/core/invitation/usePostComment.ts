import { useRouter } from "next/router"
import { useRef } from "react"
import { MessagePlugin } from "tdesign-react"
import axios from "../axios"
import { stateMethod } from "../state"

type owner = {
    uid: string,
    name: string,
    leval: number,
    avatar: string,
    admin: boolean,
    owner: boolean,
    floorer: boolean
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

type reply = {
    cid1: string,
    text: string,
    date: string,
    uid1: string,
    uid2: string,
    name1?: string,
    name2?: string
}

export default function () {
    const editer = useRef(null)
    const route = useRouter()

    const postComment = async () => {
        const editerValue: string = editer.current.getValue()
        if (!editerValue) MessagePlugin.info('内容不能为空', 3 * 1000)
        else {
            const res = await axios.post('admin/comment/postComment', {
                iid: route.query['id'],
                text: editerValue
            }) as { res: number, comment: comment, owner: owner, replys: reply }
            if (res.res == 1) {
                stateMethod.addCommit({
                    comment: res.comment,
                    owner: res.owner,
                    replys: res.replys
                })
                MessagePlugin.info('发送成功', 3 * 1000)
                stateMethod.setInfo()
                editer.current.clear()
            }
            else if (res.res == 12) MessagePlugin.info('您在板块的黑名单内', 3 * 1000)
            else if (res.res == 13) MessagePlugin.info('您在用户的黑名单内', 3 * 1000)
            else MessagePlugin.info('发送失败', 3 * 1000)
        }
    }

    return {
        editer,
        postComment
    }
}