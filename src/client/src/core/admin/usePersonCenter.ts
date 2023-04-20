import { useRouter } from "next/router";
import { useEffect, useState } from "react";



export default function () {
    const route = useRouter()
    const [menuState, setMenuState] = useState('1')

    useEffect(() => {
        if (route.query['type']) {
            setMenuState(route.query['type'] as string)
        }
    }, [route.query])

    const menuChange = (val: string) => {
        if (val != route.query['type']) {
            route.push(`/admin/${val}/${route.query['id']}`)
        }
        setMenuState(val)
    }

    return {
        state: {
            menuState
        },
        methods: {
            menuChange
        }
    }
}