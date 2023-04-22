import { useRef, useState } from "react"
import { MessagePlugin } from "tdesign-react"
import axios from "../axios"
import Router from "next/router"
import { stateMethod } from "../state"

export default () => {
    const uploadRef = useRef()
    const [file, setFile] = useState([])
    const [name, setName] = useState('')
    const [introduction, setIntroduction] = useState('')
    const [tag, setTag] = useState('技术')

    const createNewPlate = async (): Promise<void> => {
        const checkRes: boolean = checkForm()
        if (checkRes) {
            try {
                const form: FormData = new FormData()
                form.append('name', name)
                form.append('file', file[0].raw)
                form.append('tag', tag)
                form.append('introduction', introduction)
                const res = await axios.form('admin/plate/createNewPlate', form) as { res: number, id?: string }
                if (res.res === 1) {
                    Router.push(`/plate/${res.id}`)
                    stateMethod.setInfo()
                }
                else MessagePlugin.info('创建出错', 3 * 1000)
            } catch (error) {
                console.log(error)
            }
        }
    }

    const checkForm = (): boolean => {
        const set: Set<Function> = new Set()
        const fileChecker = (): boolean => {
            if (file.length === 0) {
                MessagePlugin.info('上传头像', 3 * 1000)
                return false
            }
            return true
        }
        const nameChecker = (): boolean => {
            if (name.length < 2) {
                MessagePlugin.info('名字长度不能低于2', 3 * 1000)
                return false
            }
            return true
        }
        const introductionChecker = (): boolean => {
            if (introduction.length < 10) {
                MessagePlugin.info('简介长度不能低于10', 3 * 1000)
                return false
            }
            return true
        }
        set.add(fileChecker)
        set.add(nameChecker)
        set.add(introductionChecker)
        return Array.from(set).every(fn => (fn as Function)())
    }

    return {
        uploadRef,
        state: {
            file,
            name,
            introduction,
            tag
        },
        setState: {
            setFile,
            setName,
            setIntroduction,
            setTag
        },
        methods: {
            createNewPlate
        },
    }
}