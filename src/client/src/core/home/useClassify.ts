import axios from "../axios"

interface plateAbstract {
    pid: string,
    name: string,
    avater: string,
    subscribe: number,
    invitation: number
}

export default function () {
    const getPlateSum = async (setListSumState: Function) => {
        try {
            const res = await axios.get('/local/plate/getPlateSum', {}) as { res: number, sum: number }
            if (res.res == 1) setListSumState(res.sum)
        } catch (error) {
            console.log(error)
        }
    }

    const getPlateList = async (listPageState: number, setListState: Function) => {
        try {
            const res = await axios.get('/local/plate/getPlateList', {
                page: listPageState
            }) as { res: number, plates: plateAbstract[] }
            setListState(res.plates)
        } catch (error) {
            console.log(error)
        }
    }

    const getPrePage = async (listPage: number, setListPage: Function, setList: Function) => {
        if (listPage <= 0) return
        try {
            const res = await axios.get('/local/plate/getPlateList', {
                page: listPage - 1
            }) as { res: number, plates: plateAbstract[] }
            setListPage(listPage - 1)
            setList(res.plates)
        } catch (error) {
            console.log(error)
        }
    }

    const getNextPage = async (listPage: number, listSum: number, setListPage: Function, setList: Function) => {
        if (listPage >= Math.ceil(listSum / 12) - 1) return
        try {
            const res = await axios.get('/local/plate/getPlateList', {
                page: listPage + 1
            }) as { res: number, plates: plateAbstract[] }
            setListPage(listPage + 1)
            setList(res.plates)
        } catch (error) {
            console.log(error)
        }
    }

    return {
        getPlateSum,
        getPlateList,
        getPrePage,
        getNextPage
    }
}