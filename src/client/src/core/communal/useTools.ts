import { NextRouter, useRouter } from "next/router"

export default () => {
    const router: NextRouter = useRouter()

    const toolLogin = (): void => {
        router.push('/login')
    }

    return { toolLogin }
}