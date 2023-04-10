import axios from "../axios";

export default function () {

    const defaultData = {
        info: {
            name: '用户A',
            avatar: 'http://localhost:3000/static/avatar/fire-keeper.png',
            publish: 0,
            like: 0,
            reply: 0,
            subscribe: 0,
            fans: 0
        },
        plates: [],
        subscribers: [],
        fans: []
    }

    const getUserInfo = async (setDataState: Function) => {
        const res = await axios.get('/local/user/getUserInfo', {})
        if (res['res'] == 1) {
            setDataState(res['data'])
        }
    }

    return {
        defaultData,
        getUserInfo
    }
}

