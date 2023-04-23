import React, { useEffect, useState } from 'react'
import { Avatar, Button, Collapse, Divider, MessagePlugin } from 'tdesign-react'
import CollapsePanel from 'tdesign-react/es/collapse/CollapsePanel'
import style from '@/styles/admin/PersonPlate.module.scss'
import { useRouter } from 'next/router'
import axios from '@/core/axios'
import { stateMethod } from '@/core/state'

type friend = {
    uid: string,
    name: string,
    avatar: string
}

export default function FansFriend(): JSX.Element {

    const route = useRouter()
    const [subcribers, setSubcribes] = useState([])
    const [fans, setFans] = useState([])

    const getFriends = async () => {
        try {
            const res = await axios.get('admin/user/getFriends', {}) as { res: number, subscribers: friend[], fans: friend[] }
            if (res.res == 1) {
                setSubcribes(res.subscribers)
                setFans(res.fans)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const unFriend = async (uid: string) => {
        const id = route.query['id']
        try {
            const res = await axios.post('admin/user/unFriend', { uid1: id, uid2: uid }) as { res: number }
            if (res.res == 1) {
                getFriends()
                MessagePlugin.info('删除成功', 3000)
                stateMethod.setInfo()
            } else MessagePlugin.info('删除失败', 3000)
        } catch (error) {
            console.log(error)
        }
    }

    const goChat = (uid: string) => {
        const id = route.query['id']
        route.push({
            pathname: `/admin/8/${id}`,
            query: {
                uid
            }
        })
    }

    useEffect(() => {
        getFriends()
    }, [route.query])

    return (
        <div>
            <Collapse
                borderless={true}
                defaultExpandAll={false}
                expandIcon
                expandIconPlacement="left"
                expandMutex={false}
                expandOnRowClick
            >
                <CollapsePanel
                    destroyOnCollapse={false}
                    disabled={undefined}
                    expandIcon={undefined}
                    header="我关注的"
                >
                    <div className={style['personPlate-plates']}>
                        {subcribers.map(item => {
                            return <div className={style['personPlate-plate']} key={item.uid}>
                                <Avatar shape="round" size='3rem' style={{ marginRight: '0.5rem' }} image={item.avatar}></Avatar>
                                <div className={style['personPlate-text']}>
                                    <p>{item.name}</p>
                                </div>
                                <Divider layout="vertical" style={{ height: '100%', borderLeftColor: 'darkcyan' }}></Divider>
                                <Button className={style['personPlate-cancal']} style={{ marginRight: '0.2rem' }} theme="success" onClick={() => goChat(item.uid)}>
                                    <label>私聊</label>
                                </Button>
                                <Button className={style['personPlate-cancal']} theme="danger" onClick={() => unFriend(item.uid)}>
                                    <label>删除</label>
                                </Button>
                            </div>
                        })}
                    </div>
                </CollapsePanel>
                <CollapsePanel
                    destroyOnCollapse={false}
                    disabled={undefined}
                    expandIcon={undefined}
                    header="关注我的"
                    value="default"
                ><div className={style['personPlate-plates']}>
                        {fans.map(item => {
                            return <div className={style['personPlate-plate']} key={item.uid}>
                                <Avatar shape="round" size='3rem' style={{ marginRight: '0.5rem' }} image={item.avatar}></Avatar>
                                <div className={style['personPlate-text']}>
                                    <p>{item.name}</p>
                                </div>
                                <Divider layout="vertical" style={{ height: '100%', borderLeftColor: 'darkcyan' }}></Divider>
                                <Button className={style['personPlate-cancal']} theme="success" onClick={() => goChat(item.uid)}>
                                    <label>私聊</label>
                                </Button>
                            </div>
                        })}
                    </div>
                </CollapsePanel>
            </Collapse>
        </div>
    )
}
