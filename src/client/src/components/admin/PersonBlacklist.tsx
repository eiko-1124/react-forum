import React, { useEffect, useState } from 'react'
import { Avatar, Button, Collapse, Divider, MessagePlugin } from 'tdesign-react'
import CollapsePanel from 'tdesign-react/es/collapse/CollapsePanel'
import style from '@/styles/admin/PersonPlate.module.scss'
import axios from '@/core/axios'
import { useRouter } from 'next/router'

type userBlackList = {
    uid: string,
    name: string,
    avatar: string
}

type plate = {
    pid: string,
    name: string,
    blackList?: userBlackList[]
}[]

export default function PersonBlacklist(): JSX.Element {

    const route = useRouter()
    const [userBlackList, setUserBlackList] = useState([])
    const [plateBlackList, setPlateBlackList] = useState([])

    const getUserBlackList = async () => {
        try {
            const res = await axios.get('admin/user/getUserBlackList', {}) as { res: number, blackList: userBlackList[] }
            if (res.res == 1) {
                setUserBlackList(res.blackList)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const getPlateBlackList = async () => {
        try {
            const res = await axios.get('admin/user/getPlateBlackList', {}) as { res: number, plate: plate[] }
            if (res.res == 1) {
                setPlateBlackList(res.plate)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const unUserBlackList = async (uid: string) => {
        const id = route.query['id']
        try {
            const res = await axios.post('admin/user/unUserBlackList', { uid1: id, uid2: uid }) as { res: number }
            if (res.res == 1) {
                getUserBlackList()
                MessagePlugin.info('移除成功', 3000)
            } else MessagePlugin.info('移除失败', 3000)
        } catch (error) {
            console.log(error)
        }
    }

    const unPlateBlackList = async (pid: string, uid: string) => {
        const id = route.query['id']
        try {
            const res = await axios.post('admin/user/unPlateBlackList', { pid, uid }) as { res: number }
            if (res.res == 1) {
                getPlateBlackList()
                MessagePlugin.info('移除成功', 3000)
            } else MessagePlugin.info('移除失败', 3000)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getUserBlackList()
        getPlateBlackList()
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
                    header="用户黑名单"
                >
                    <div className={style['personPlate-plates']}>
                        {userBlackList.map(item => {
                            return <div className={style['personPlate-plate']} key={item.uid}>
                                <Avatar shape="round" size='3rem' style={{ marginRight: '0.5rem' }} image={item.avatar}></Avatar>
                                <div className={style['personPlate-text']}>
                                    <p>{item.name}</p>
                                </div>
                                <Divider layout="vertical" style={{ height: '100%', borderLeftColor: 'darkcyan' }}></Divider>
                                <Button className={style['personPlate-cancal']} theme="danger" onClick={() => unUserBlackList(item.uid)}>
                                    <label>移除</label>
                                </Button>
                            </div>
                        })}
                    </div>
                </CollapsePanel>
                <CollapsePanel
                    destroyOnCollapse={false}
                    disabled={undefined}
                    expandIcon={undefined}
                    header="板块黑名单"
                    value="default"
                >
                    <Collapse
                        borderless={true}
                        defaultExpandAll={false}
                        expandIcon
                        expandIconPlacement="left"
                        expandMutex={false}
                        expandOnRowClick
                    >
                        {plateBlackList.map(site => {
                            return <CollapsePanel
                                destroyOnCollapse={false}
                                disabled={undefined}
                                expandIcon={undefined}
                                header={site.name + '黑名单'}
                                key={site.pid}
                            ><div className={style['personPlate-plates']}>
                                    {site.blackList.map(item => {
                                        return <div className={style['personPlate-plate']} key={item.uid}>
                                            <Avatar shape="round" size='3rem' style={{ marginRight: '0.5rem' }} image={item.avatar}></Avatar>
                                            <div className={style['personPlate-text']}>
                                                <p>{item.name}</p>
                                            </div>
                                            <Divider layout="vertical" style={{ height: '100%', borderLeftColor: 'darkcyan' }}></Divider>
                                            <Button className={style['personPlate-cancal']} theme="danger" onClick={() => unPlateBlackList(site.pid, item.uid)}>
                                                <label>移除</label>
                                            </Button>
                                        </div>
                                    })}
                                </div>
                            </CollapsePanel>
                        })}
                    </Collapse>
                </CollapsePanel>
            </Collapse>
        </div>
    )
}
