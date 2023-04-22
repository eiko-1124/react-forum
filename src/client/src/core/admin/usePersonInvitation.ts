import { useEffect, useRef, useState } from "react";
import axios from "../axios";
import { useRouter } from "next/router";
import { MessagePlugin } from "tdesign-react";
import { stateMethod } from "../state";

type invitation = {
    iid: string,
    title: string,
    text: string,
    plate: string
}

export default function () {

    const route = useRouter()
    const [visible, setVisible] = useState(false);
    const [listState, setListState] = useState([])
    const [listSumState, setListSumState] = useState(0)
    const [pageState, setPageState] = useState(0)
    const [selectState, setSelectState] = useState('')
    const [titleState, setTitleState] = useState('')
    const [textState, setTextState] = useState('')
    const editer = useRef()

    useEffect(() => {
        getList(pageState)
    }, [route.query])

    const getList = async (page: number) => {
        try {
            const res = await axios.get('admin/invitation/getAdminInvitationList', { page }) as { res: number, pSum: number, adminInvitations: invitation[] }
            if (res.res == 1) {
                setListState(res.adminInvitations)
                setListSumState(res.pSum)
                stateMethod.setPublish && stateMethod.setPublish(res.pSum)
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
            const res = await axios.post('admin/invitation/deleteAdminInvitation', { iid }) as { res: number }
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

    const getInvitationDetail = async (iid: string) => {
        setSelectState(iid)
        try {
            const res = await axios.get('admin/invitation/getInvitationDetail', { iid }) as { res: number, title: string, text: string }
            if (res.res == 1) {
                setTitleState(res.title)
                // @ts-ignore
                if (editer.current) editer.current.setText(res.text)
                else setTextState(res.text)
                setVisible(true)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const updateInvitation = async () => {
        // @ts-ignore
        const editerValue: string = editer.current.getValue()
        if (editerValue.length === 0) {
            MessagePlugin.info('内容不能为空', 3 * 1000)
            return
        }
        if (titleState.length < 6) {
            MessagePlugin.info('标题至少五个字', 3 * 1000)
            return
        }
        try {
            const res = await axios.post('admin/invitation/updateInvitation', { iid: selectState, title: titleState, text: editerValue }) as { res: number }
            if (res.res !== 1) throw new Error('post error')
            else MessagePlugin.info('修改成功', 3 * 1000)
            setVisible(false)
            getList(pageState)
        } catch (error) {
            console.log(error)
            MessagePlugin.info('发布失败', 3 * 1000)
        }
    }

    const goInvitation = (pid: string, iid: string) => {
        route.push(`/invitation/${pid}/${iid}`)
    }

    return {
        listState,
        listSumState,
        visible,
        pageChange,
        deleteInvitation,
        setVisible,
        editer,
        getInvitationDetail,
        setSelectState,
        titleState,
        setTitleState,
        updateInvitation,
        textState,
        goInvitation
    }
}