import React, { useEffect, useRef, useState } from 'react'
import { Button, Dialog, Divider, MessagePlugin, Textarea } from 'tdesign-react'
import style from '@/styles/communal/Notice.module.scss'
import axios from '@/core/axios'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'

const MyDialog = dynamic(() => import('tdesign-react').then(mod => mod.Dialog), { ssr: false })

export default function Notice({ text, writable }: { text?: string, writable?: boolean }): JSX.Element {
    const [textState, setTextState] = useState(text)
    const [visibleState, setVisibleState] = useState(false)
    const [editState, setEditState] = useState(false)
    const noticeRef = useRef()

    const route = useRouter()
    const edit = async () => {
        try {
            const res = await axios.get('/admin/plate/isAdmin', { pid: route.query['pid'] }) as { res: number }
            if (res.res == 1) setEditState(true)
        } catch (error) {
            console.log(error)
        }
    }

    const editNotice = async () => {
        // @ts-ignore
        const notice = noticeRef.current.textareaElement.value
        try {
            const res = await axios.post('/admin/plate/setNotice', { notice, pid: route.query['pid'] }) as { res: number }
            if (res.res == 1) {
                MessagePlugin.info('修改成功', 3000)
                setVisibleState(false)
                setTextState(notice)
            } else MessagePlugin.info('修改失败', 3000)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        edit()
    }, [route.query])

    return (
        <div className={style['notice']}>
            <Divider
                align="center"
                dashed={false}
                layout="horizontal"
                className={style['notice-horizontal']}
            >公告</Divider>
            <div className={style['notice-content']}>
                {textState ? textState : '愉快地玩耍吧！！'}
            </div>
            {writable && editState && <Button style={{ width: '100%' }} onClick={() => setVisibleState(true)}>编辑</Button>}
            <MyDialog
                header="修改公告"
                visible={visibleState}
                onClose={() => setVisibleState(false)}
                placement='top'
                onConfirm={editNotice}
            >
                <Textarea autosize={{ minRows: 3, maxRows: 5 }} ref={noticeRef}>
                </Textarea>
            </MyDialog>
        </div>
    )
}
