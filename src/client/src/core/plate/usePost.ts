import { useRef } from "react"
import axios from "../axios"
import { MessagePlugin } from "tdesign-react"
import Router from "next/router"
import { stateMethod } from "../state"

export default function () {

    const title = useRef(null)
    const editer = useRef(null)

    const submit = async () => {
        const editerValue: string = editer.current.getValue()
        const titleValue: string = title.current.inputElement.value
        if (editerValue.length === 0) {
            MessagePlugin.info('内容不能为空', 3 * 1000)
            return
        }
        if (titleValue.length < 6) {
            MessagePlugin.info('标题至少五个字', 3 * 1000)
            return
        }
        const pid = Router.query['pid']
        try {
            const res = await axios.post('admin/invitation/publish', { pid, title: titleValue, text: editerValue }) as { res: number, id?: number }
            if (res.res == 12) MessagePlugin.info('您在黑名单之中', 3 * 1000)
            else if (res.res === 1) {
                MessagePlugin.info('发布成功', 3 * 1000)
                stateMethod.setInfo()
                Router.push(`/invitation/${pid}/${res.id}`)
            }
            else throw new Error('post error')
        } catch (error) {
            console.log(error)
            MessagePlugin.info('发布失败', 3 * 1000)
        }
    }
    const methods = {
        submit
    }

    return { methods, title, editer }
}