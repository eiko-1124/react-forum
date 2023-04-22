import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import axios from "../axios";
import { MessagePlugin } from "tdesign-react";
import { stateMethod } from "../state";
import * as echarts from 'echarts';

type infoRes = {
    name: string,
    avatar: string,
    fans: number,
    like: number,
    reply: number,
    subscribe: number,
    publish: number
}

export interface preference {
    name: string,
    sum: string,
    pid: string
}

export default function () {
    const route = useRouter()

    const [infoState, setInfoState] = useState({
        name: '',
        avatar: null,
        fans: 0,
        like: 0,
        reply: 0,
        subscribe: 0,
        publish: 0
    } as infoRes)

    const uploadRef = useRef()
    const [file, setFile] = useState([])

    useEffect(() => {
        getInfo()
        setChart()
    }, [route.query])

    const getInfo = async () => {
        const res = await axios.get('admin/user/getUserInfo', {}) as { res: number, info: infoRes }
        if (res.res === 1) {
            setInfoState(res.info)
        } else route.push('/404')
    }

    const setName = async () => {
        try {
            const res = await axios.post('admin/user/setName', { name: infoState.name }) as { res: number }
            if (res.res == 1) {
                MessagePlugin.info('修改完成', 3000);
                stateMethod.setInfoName(infoState.name)
            }
            else MessagePlugin.info('修改失败', 3000);
        } catch (error) {
            console.log(error)
        }
    }

    const setAvatar = async () => {
        if (file.length === 0) return
        const form: FormData = new FormData()
        form.append('file', file[0].raw)
        const res = await axios.form('admin/user/setAvatar', form) as { res: number, url: string }
        if (res.res == 1) {
            MessagePlugin.info('修改完成', 3000);
            setInfoState({ ...infoState, avatar: res.url })
            stateMethod.setInfoAvatar(res.url)
            setFile([])
        }
        else MessagePlugin.info('修改失败', 3000);
    }

    const setChart = async () => {
        const target: HTMLElement = document.querySelector('.personInfo-chart')
        let myChart = echarts.getInstanceByDom(target)
        if (!myChart) myChart = echarts.init(target)
        let options = {}
        try {
            const res = await axios.get('admin/plate/getPreference', {}) as { res: number, preference: preference[] }
            if (res.res === 1) {
                options['series'] = {
                    type: 'pie',
                    data: [],
                    radius: '50%'
                }
                res.preference.map(site => {
                    options['series'].data.push({
                        value: site.sum,
                        name: site.name,
                        pid: site.pid
                    })
                })
            }
        } catch (error) {
            console.log(error)
        }
        myChart.setOption(options);
        myChart.on('click', (params) => {
            route.push(`/plate/${params.data['pid']}`)
        })
    }

    return {
        infoState,
        setInfoState,
        uploadRef,
        file,
        setFile,
        setName,
        setAvatar
    }
}