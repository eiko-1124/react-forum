import axios from "../axios";
import { state, stateMethod } from "../state";

export default function () {

    const defaultData = {
        info: {
            name: '用户A',
            avatar: null,
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
        if (!state.info) {
            try {
                const res = await axios.get('/local/user/getUserInfo', {})
                if (res['res'] == 1) {
                    setDataState(res['data'])
                    state.info = res['data']
                }
            } catch (error) {
                console.log(error)
            }
        }
        else setDataState(state.info)
        stateMethod.setInfoName = (name: string) => {
            setDataState({
                ...state.info,
                info: {
                    ...state.info['info'],
                    name
                },
            })
        }
        stateMethod.setInfoAvatar = (avatar: string) => {
            setDataState({
                ...state.info,
                info: {
                    ...state.info['info'],
                    avatar
                },
            })
        }

        stateMethod.setPublish = (publish: number) => {
            setDataState({
                ...state.info,
                info: {
                    ...state.info['info'],
                    publish
                },
            })
        }

        stateMethod.setInfo = async () => {
            try {
                const res = await axios.get('/local/user/getUserInfo', {})
                if (res['res'] == 1) {
                    setDataState(res['data'])
                    state.info = res['data']
                }
            } catch (error) {
                console.log(error)
            }
        }
    }

    return {
        defaultData,
        getUserInfo
    }
}

