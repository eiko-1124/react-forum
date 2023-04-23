import React, { useEffect, useRef, useState } from 'react'
import { Avatar, Badge, Button, Divider, Menu, MessagePlugin } from 'tdesign-react'
import MenuItem from 'tdesign-react/es/menu/MenuItem'
import style from '@/styles/admin/PersonChat.module.scss'
import Editor from '../plate/Editor'
import axios from '@/core/axios'
import { useRouter } from 'next/router'
import jwt from "jsonwebtoken";
import { getCookie } from '@/core/utils'
import socket from '@/core/socket/socket'

type chatUser = {
    uid: string,
    name: string,
    avatar: string,
    text: string,
    nSum: number,
    date: Date
}

type message = {
    hid: string,
    uid1: string
    name1: string,
    avatar1: string,
    uid2: string
    name2: string,
    avatar2: string,
    text: string,
    date: Date
}

export default function PersonChat(): JSX.Element {

    const route = useRouter()
    const token = getCookie('token')
    let id: string = ''
    if (token) id = jwt.decode(token)['id']

    const [active, setActive] = useState('-1')
    const [aChat, setAChat] = useState([])
    const [bChat, setBChat] = useState([])
    const [chatList, setChatList] = useState([])
    const [messageList, setMessageList] = useState([])
    const editer = useRef(null)
    const getChat = async (resolve?: Function) => {
        try {
            const res = await axios.get('admin/chat/getChat', {}) as { res: number, chatUsers: chatUser[] }
            if (res.res == 1) {
                setBChat(res.chatUsers)
            }
            resolve && resolve()
        } catch (error) {
            console.log(error)
        }
    }

    let init = async () => {
        const uid: string = route.query['uid'] as string
        if (uid) {
            const res = await axios.get('admin/chat/getNewChat', { uid }) as { res: number, chatUser: chatUser }
            if (res.res == 1) {
                setAChat([res.chatUser])
                setActive(uid)
            }
        }
    }

    const getHistory = async () => {
        try {
            const res = await axios.get('admin/chat/getHistory', { uid: active, date: new Date() }) as { res: number, messages: message[] }
            if (res.res == 1) {
                getChat()
                setMessageList(res.messages)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const postMessage = () => {
        const text = editer.current.getValue()
        if (text.length == 0) return
        socket.emit('postMessage', {
            uid1: id,
            uid2: active,
            text
        })
    }

    const getMore = async () => {
        try {
            const res = await axios.get('admin/chat/getHistory', { uid: active, date: messageList[0].date }) as { res: number, messages: message[] }
            if (res.res == 1) {
                if (res.messages.length == 0) {
                    MessagePlugin.info('没有了', 3000)
                }
                else setMessageList([...res.messages, ...messageList])
            }
        } catch (error) {
            console.log(error)
        }
    }

    socket.on('postMessage', data => {
        if (data.res == 1) {
            setMessageList([...messageList, data.data])
            const a = style['personChat-win-container']
            const div = document.querySelector('.' + a)
            div.scrollTo(0, 1000)
        }
    })

    socket.on('newMessage', async (uid1) => {
        if (uid1 != active) getChat()
        else {
            const res = await axios.get('/admin/chat/getUnRead', { uid1 })
            console.log(res)
        }
    })

    useEffect(() => {
        new Promise((resolve) => {
            getChat(resolve)
        }).then(() => {
            init()
        })
    }, [route.query])

    useEffect(() => {
        getHistory()
    }, [active])

    useEffect(() => {
        if (aChat[0]) {
            let find: boolean = false
            for (let chat of bChat) {
                if (aChat[0].uid == chat.uid) {
                    find = true
                    setAChat([])
                    setChatList([...bChat])
                    break
                }
            }
            if (!find) setChatList([...aChat, ...bChat])
        }
        else setChatList([...bChat])
    }, [aChat, bChat])

    return (
        <div className={style['personChat']}>
            <Menu
                value={active}
                onChange={(v: string) => setActive(v)}
                style={{ marginRight: 20 }}
            >
                {chatList && chatList.map(chat => {
                    return <MenuItem value={chat.uid} style={{ height: '4rem', width: '100%' }} key={chat.uid}>
                        <div className={style['personChat-menu-item']}><Badge
                            count={chat.nSum} offset={[10, 10]}
                            size="small"
                        >
                            <Avatar shape="round" size='3rem' image={chat.avatar}></Avatar>
                        </Badge>
                            <div className={style['personChat-menu-item-info']}>
                                <h3>{chat.name}</h3>
                                <p>{chat.text}</p>
                            </div>
                        </div>
                    </MenuItem>
                })}
            </Menu>
            <div className={style['personChat-room']}>
                <Divider style={{ display: 'block', height: '100%' }} layout="vertical"></Divider>
                <div className={style['personChat-win']}>
                    <div className={style['personChat-win-container']}>
                        {messageList.length > 0 && <Button style={{ margin: '0.5rem auto' }} variant="dashed" theme="primary" ghost onClick={() => getMore()}>历史记录</Button>}
                        {messageList.map(message => {
                            return <div className={message.uid2 == id ? style['personChat-message-left'] : style['personChat-message-right']} key={message.hid}>
                                <div className={style['personChat-message']}><Avatar size='3rem' shape="round" image={message.avatar1}></Avatar>
                                    <h3>{message.name1}</h3></div>
                                <div className={style['personChat-message-text']} dangerouslySetInnerHTML={{ __html: message.text }}></div>
                            </div>
                        })}
                    </div>
                    <Editor excludeKeys={
                        [
                            "blockquote",
                            "underline", // 下划线
                            "fontSize", // 字号
                            "fontFamily", // 字体
                            "lineHeight", // 行高
                            "bulletedList", // 无序列表
                            "numberedList", // 有序列表
                            "todo", // 代办
                            // 对齐
                            "group-justify",
                            // 缩进
                            "group-indent",
                            // 上传视频
                            "group-video",
                            "insertTable",// 插入表格
                            "divider", // 分割线
                            "undo", // 撤销
                            "redo", // 重做
                            "fullScreen"
                        ]} styles={{
                            height: '15rem',
                            maxHeight: '50vh'
                        }} ref={editer}></Editor>
                    <Button style={{ margin: '0.25rem 0rem', width: '100%' }} onClick={postMessage}>发送</Button>
                </div>
            </div>
        </div>
    )
}
