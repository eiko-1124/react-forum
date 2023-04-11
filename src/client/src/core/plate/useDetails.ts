import axios from "../axios"

export default function (setSubscribe: Function) {

    const getSubscribeStatus = async (pid: string) => {
        try {
            const res = await axios.get('/local/plate/getSubscribe', { pid }) as { res: number }
            if (res.res === 1) setSubscribe(true)
            else setSubscribe(false)
        } catch (error) {
            console.log(error)
            setSubscribe(false)
        }
    }

    const setSubscribeStatus = async (pid: string, state: boolean) => {
        try {
            const res = await axios.get('/local/plate/setSubscribe', { pid }) as { res: number }
            if (res.res === 1) setSubscribe(!state)
        } catch (error) {
            console.log(error)
        }
    }

    return {
        getSubscribeStatus,
        setSubscribeStatus
    }
}