import { NextRouter, useRouter } from "next/router"
import { getCookie } from "../utils"
import jwt from "jsonwebtoken";

export default () => {
    const router: NextRouter = useRouter()

    const toolLogin = (): void => {
        router.push('/login')
    }

    const toolPerson = (): void => {
        const token = getCookie('token')
        let id: string = 'undefined'
        if (token) id = jwt.decode(token)['id']
        router.push(`/admin/1/${id}`)
    }

    return { toolLogin, toolPerson }
}