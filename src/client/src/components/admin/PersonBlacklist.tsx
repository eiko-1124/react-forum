import React from 'react'
import { Button, Collapse } from 'tdesign-react'
import CollapsePanel from 'tdesign-react/es/collapse/CollapsePanel'
import style from '@/styles/admin/PersonPlate.module.scss'

export default function PersonBlacklist(): JSX.Element {
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
                        <div className={style['personPlate-plate']}>
                            <Button style={{ marginRight: '0.1rem' }} theme="success" variant="base">板块：syd</Button><Button theme="danger" variant="base">取消</Button>
                        </div><div className={style['personPlate-plate']}>
                            <Button style={{ marginRight: '0.1rem' }} theme="success" variant="base">板块：syd</Button><Button theme="danger" variant="base">取消</Button>
                        </div><div className={style['personPlate-plate']}>
                            <Button style={{ marginRight: '0.1rem' }} theme="success" variant="base">板块：syd</Button><Button theme="danger" variant="base">取消</Button>
                        </div><div className={style['personPlate-plate']}>
                            <Button style={{ marginRight: '0.1rem' }} theme="success" variant="base">板块：syd</Button><Button theme="danger" variant="base">取消</Button>
                        </div><div className={style['personPlate-plate']}>
                            <Button style={{ marginRight: '0.1rem' }} theme="success" variant="base">板块：syd</Button><Button theme="danger" variant="base">取消</Button>
                        </div><div className={style['personPlate-plate']}>
                            <Button style={{ marginRight: '0.1rem' }} theme="success" variant="base">板块：syd</Button><Button theme="danger" variant="base">取消</Button>
                        </div>
                    </div>
                </CollapsePanel>
                <CollapsePanel
                    destroyOnCollapse={false}
                    disabled={undefined}
                    expandIcon={undefined}
                    header="关注我的"
                    value="default"
                ><div className={style['personPlate-plates']}>
                        <div className={style['personPlate-plate']}>
                            <Button style={{ marginRight: '0.1rem' }} theme="success" variant="base">板块：syd</Button><Button theme="danger" variant="base">辞职</Button>
                        </div><div className={style['personPlate-plate']}>
                            <Button style={{ marginRight: '0.1rem' }} theme="success" variant="base">板块：syd</Button><Button theme="danger" variant="base">辞职</Button>
                        </div><div className={style['personPlate-plate']}>
                            <Button style={{ marginRight: '0.1rem' }} theme="success" variant="base">板块：syd</Button><Button theme="danger" variant="base">辞职</Button>
                        </div><div className={style['personPlate-plate']}>
                            <Button style={{ marginRight: '0.1rem' }} theme="success" variant="base">板块：syd</Button><Button theme="danger" variant="base">辞职</Button>
                        </div><div className={style['personPlate-plate']}>
                            <Button style={{ marginRight: '0.1rem' }} theme="success" variant="base">板块：syd</Button><Button theme="danger" variant="base">辞职</Button>
                        </div><div className={style['personPlate-plate']}>
                            <Button style={{ marginRight: '0.1rem' }} theme="success" variant="base">板块：syd</Button><Button theme="danger" variant="base">辞职</Button>
                        </div>
                    </div>
                </CollapsePanel>
            </Collapse>
        </div>
    )
}
