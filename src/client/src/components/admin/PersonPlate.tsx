import React from 'react'
import { Avatar, Button, Collapse, Divider } from 'tdesign-react'
import CollapsePanel from 'tdesign-react/es/collapse/CollapsePanel'
import style from '@/styles/admin/PersonPlate.module.scss'
import usePersonPlate from '@/core/admin/usePersonPlate'

export default function PersonPlate() {

    const { palteState, palteStateA, palteStateO, unAdim1, unAdim2, unSubscribe, unOwner } = usePersonPlate()
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
                    header="关注"
                > <div className={style['personPlate-plates']}>
                        {palteState.map(site => {
                            return <div className={style['personPlate-plate']} key={site.pid}>
                                <Avatar shape="round" size='3rem' style={{ marginRight: '0.5rem' }} image={site.avatar}></Avatar>
                                <div className={style['personPlate-text']}>
                                    <p>{site.name}</p>
                                    <p>活跃度：{site.level}</p>
                                </div>
                                <Divider layout="vertical" style={{ height: '100%', borderLeftColor: 'darkcyan' }}></Divider>
                                <Button className={style['personPlate-cancal']} theme="danger" onClick={() => unSubscribe(site.pid)}>
                                    <label>取消</label>
                                </Button>
                            </div>
                        })}
                    </div>
                </CollapsePanel>
                <CollapsePanel
                    destroyOnCollapse={false}
                    disabled={undefined}
                    expandIcon={undefined}
                    header="管理员"
                    value="default"
                ><div className={style['personPlate-plates']}>
                        {palteStateA.map(site => {
                            return <div className={style['personPlate-plate']} key={site.pid}>
                                <Avatar shape="round" size='3rem' style={{ marginRight: '0.5rem' }} image={site.avatar}></Avatar>
                                <div className={style['personPlate-text']}>
                                    <p>{site.name}</p>
                                    <p>活跃度：{site.level}</p>
                                </div>
                                <Divider layout="vertical" style={{ height: '100%', borderLeftColor: 'darkcyan' }}></Divider>
                                <Button className={style['personPlate-cancal']} theme="danger" onClick={() => unAdim1(site.pid)}>
                                    <label>辞职</label>
                                </Button>
                            </div>
                        })}
                    </div>
                </CollapsePanel>
                <CollapsePanel
                    destroyOnCollapse={false}
                    disabled={undefined}
                    expandIcon={undefined}
                    header="版主"
                >
                    <Collapse
                        borderless={true}
                        defaultExpandAll={false}
                        expandIcon
                        expandIconPlacement="left"
                        expandMutex={false}
                        expandOnRowClick
                    >
                        {palteStateO.map(site => {
                            return <CollapsePanel
                                destroyOnCollapse={false}
                                disabled={undefined}
                                expandIcon={undefined}
                                header={site.name + '管理员'}
                                key={site.pid}
                            ><div className={style['personPlate-plates']}>
                                    {site.admins.map(item => {
                                        return <div className={style['personPlate-plate']} key={item.uid}>
                                            <Avatar shape="round" size='3rem' style={{ marginRight: '0.5rem' }} image={item.avatar}></Avatar>
                                            <div className={style['personPlate-text']}>
                                                <p>{item.name}</p>
                                                <p>活跃度：{item.level}</p>
                                            </div>
                                            <Divider layout="vertical" style={{ height: '100%', borderLeftColor: 'darkcyan' }}></Divider>
                                            <Button className={style['personPlate-cancal']} theme="danger" onClick={() => unAdim2(site.pid, item.uid)}>
                                                <label>撤销</label>
                                            </Button>
                                            <Button className={style['personPlate-cancal']} style={{ marginLeft: '0.2rem' }} theme="success" onClick={() => unOwner(site.pid, item.uid)}>
                                                <label>转让</label>
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
