import { useEffect, useState } from "react";
import axios from "../axios";

type subscribeInvitation = {
    iid: string,
    uid: string,
    pid: string,
    uName: string,
    pName: string,
    title: string,
    text: string,
    date: Date
}

export default function () {

    const [selectState, setSelectState] = useState('0')
    const [listState, setListState] = useState([])
    const [pageState, setPageState] = useState(1)
    const [sumState, setSumState] = useState(1)

    const getList = async () => {
        try {
            if (selectState == '1') {
                const res = await axios.get('admin/invitation/getSubscribeInvitation', { page: pageState - 1 }) as { res: number, iSum: number, subscribeInvitations: subscribeInvitation[] }
                if (res.res == 1) {
                    setSumState(res.iSum)
                    setListState(res.subscribeInvitations)
                    console.log(listState)
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getList()
    }, [selectState, pageState])

    return {
        selectState, setSelectState, listState, setPageState, sumState
    }
}