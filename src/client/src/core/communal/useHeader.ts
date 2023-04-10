import { useState } from "react"
import axios from "../axios"
import { useRouter } from "next/router"

type element = {
    current: {
        inputElement: {
            value: string
        }
    }
}

type list = { pid: string, name: string }[]
type target = { pid: string, name: string, introduction: string, avatar: string }

export default () => {

    const [panelState, setPanelState] = useState(false)
    const [listState, setListState] = useState([] as list)
    const [targetState, setTargetState] = useState(null as target)

    const router = useRouter()

    const onFocus = (): void => {
        setPanelState(true)
    }

    const disFocus = (): void => {
        setTimeout(() => setPanelState(false), 200)
    }

    const simpleSearch = async (input: element): Promise<void> => {
        const keyWord: string = input.current.inputElement.value
        if (keyWord.length === 0) {
            setTargetState(null)
            setListState([])
            return
        }
        try {
            const res = await axios.get('/local/search/simpleSearch', { keyWord }) as { res: number, target: target, list: list }
            if (res.res === 1) {
                setTargetState(res.target)
                setListState(res.list)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const goPlate = (pid: string): void => {
        router.push({
            pathname: '/plate/[pid]',
            query: { pid }
        })
    }

    const goSearch = (input: element) => {
        const keyWord: string = input.current.inputElement.value
        if (keyWord.length > 0) {
            router.push({
                pathname: '/search/[keyWord]',
                query: { keyWord }
            })
        }
    }

    const goHome = () => router.push('/')

    const state = {
        panelState,
        listState,
        targetState
    }

    const methods = {
        onFocus, disFocus, simpleSearch, goPlate, goSearch, goHome
    }

    return { state, methods }
}