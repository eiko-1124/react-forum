import { useState } from "react";

export default function () {
    const [commentState, setCommentState] = useState(false)

    const setComment = () => {
        setCommentState(!commentState)
    }

    return {
        state: {
            commentState
        },
        methods: {
            setComment
        }
    }
}