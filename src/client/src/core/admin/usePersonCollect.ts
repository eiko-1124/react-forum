import { useEffect, useState } from "react";
import axios from "../axios";
import { useRouter } from "next/router";
import { MessagePlugin } from "tdesign-react";

type invitation = {
    iid: string,
    title: string,
    text: string,
    plate: string,
    floor: number
}

export default function () {

    const route = useRouter()
    const [listState, setListState] = useState([])
    const [listSumState, setListSumState] = useState(0)
    const [pageState, setPageState] = useState(0)

    useEffect(() => {
        getList(pageState)
    }, [route.query])

    const getList = async (page: number) => {
        try {
            const res = await axios.get('admin/invitation/getAdminCollectList', { page }) as { res: number, pSum: number, adminInvitations: invitation[] }
            if (res.res == 1) {
                setListState(res.adminInvitations)
                setListSumState(res.pSum)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const pageChange = ({ current }: { current: number }) => {
        getList(current - 1)
        setPageState(current - 1)
    }

    const deleteInvitation = async (iid: string) => {
        try {
            const res = await axios.post('admin/invitation/deleteAdminCollect', { iid }) as { res: number }
            if (res.res == 1) {
                if (listState.length != 1) getList(pageState)
                else if (pageState != 0) getList(pageState - 1)
                else {
                    setListState([])
                    setListSumState(0)
                }
                MessagePlugin.info('删除成功', 3000)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const goInvitation = (pid: string, iid: string) => {
        route.push(`/invitation/${pid}/${iid}`)
    }

    return {
        listState,
        listSumState,
        pageChange,
        deleteInvitation,
        goInvitation
    }
}