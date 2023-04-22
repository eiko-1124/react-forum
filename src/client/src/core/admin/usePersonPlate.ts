import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import axios from "../axios"
import { getCookie } from "../utils"
import jwt from "jsonwebtoken";
import { MessagePlugin } from "tdesign-react";
import { stateMethod } from "../state";

type plate = {
    pid: string,
    name: string,
    level: string,
    avatar: string
}

export interface adminPlate {
    pid: string,
    name: string,
    admins?: admin[]
}

export interface admin {
    uid: string,
    name: string,
    level: string,
    avatar: string
}

export default function () {

    const route = useRouter()
    const [palteState, setPlateState] = useState([])
    const [palteStateA, setPlateStateA] = useState([])
    const [palteStateO, setPlateStateO] = useState([])

    useEffect(() => {
        getPlates()
        getPlatesA()
        getPlatesO()
    }, [route.query])

    const getPlates = async () => {
        try {
            const res = await axios.get('admin/plate/getAdminPlates', {}) as { res: number, adminPlates: plate[] }
            if (res.res == 1) {
                setPlateState(res.adminPlates)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const getPlatesA = async () => {
        try {
            const res = await axios.get('admin/plate/getAdminPlatesA', {}) as { res: number, adminPlates: plate[] }
            if (res.res == 1) {
                setPlateStateA(res.adminPlates)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const getPlatesO = async () => {
        try {
            const res = await axios.get('admin/plate/getAdminPlatesO', {}) as { res: number, adminPlatesO: adminPlate[] }
            if (res.res == 1) {
                setPlateStateO(res.adminPlatesO)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const unSubscribe = async (pid: string) => {
        const token = getCookie('token')
        let uid: string = 'undefined'
        if (token) uid = jwt.decode(token)['id']
        try {
            const res = await axios.post('admin/plate/unSubscribe', { uid, pid }) as { res: number }
            if (res.res == 1) {
                MessagePlugin.info('取消成功', 3 * 1000)
                getPlates()
                stateMethod.setInfo()
            } else if (res.res == 2) {
                MessagePlugin.info('版主或者管理员不能撤销关注', 3 * 1000)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const unAdim1 = async (pid: string) => {
        const token = getCookie('token')
        let uid: string = 'undefined'
        if (token) uid = jwt.decode(token)['id']
        try {
            const res = await axios.post('admin/plate/unAdmin1', { uid, pid }) as { res: number }
            if (res.res == 1) {
                MessagePlugin.info('辞职成功', 3 * 1000)
                getPlatesA()
            } else if (res.res == 2) {
                MessagePlugin.info('版主不能辞职', 3 * 1000)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const unAdim2 = async (pid: string, uid: string) => {
        try {
            const res = await axios.post('admin/plate/unAdmin2', { uid, pid }) as { res: number }
            if (res.res == 1) {
                MessagePlugin.info('撤销成功', 3 * 1000)
                getPlatesO()
            }
        } catch (error) {
            console.log(error)
        }
    }

    const unOwner = async (pid: string, uid: string) => {
        try {
            const res = await axios.post('admin/plate/unOwner', { uid, pid }) as { res: number }
            if (res.res == 1) {
                MessagePlugin.info('转让成功', 3 * 1000)
                getPlatesO()
            }
        } catch (error) {
            console.log(error)
        }
    }

    return {
        palteState,
        palteStateA,
        palteStateO,
        unAdim1,
        unAdim2,
        unSubscribe,
        unOwner
    }
}