import { MessagePlugin } from "tdesign-react"
import axios from "../axios"

export default function (setRanking: Function) {
    const getRanking = async (pid: string) => {
        try {
            const res = await axios.get('local/plate/getRanking', { pid }) as {
                res: number, ranking:
                {
                    exp: number,
                    level: number,
                    maxExp: number,
                    note: Date
                }
            }
            const today = new Date()
            const noteDay = new Date(res.ranking.note)
            const note = noteDay.getDate() === today.getDate() &&
                noteDay.getMonth() === today.getMonth() &&
                noteDay.getFullYear() === today.getFullYear()
            if (res.res === 1) setRanking({
                exp: res.ranking.exp,
                level: res.ranking.level,
                maxExp: res.ranking.maxExp,
                note
            })
        } catch (error) {
            console.log(error)
        }
    }

    const setNote = async (pid: string) => {
        try {
            const res = await axios.post('admin/plate/setNote', { pid }) as {
                res: number, ranking:
                {
                    exp: number,
                    level: number,
                    maxExp: number,
                    note: Date
                }
            }
            if (res.res === 1) setRanking({ ...res.ranking, note: true })
            else if (res.res === 2) MessagePlugin.info('请先关注本板块', 3 * 1000)
            else if (res.res === 3) MessagePlugin.info('今日已签到', 3 * 1000)
        } catch (error) {
            console.log(error)
        }
    }

    return {
        getRanking,
        setNote
    }
}