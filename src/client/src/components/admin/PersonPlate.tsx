import React from 'react'
import { Button, Collapse } from 'tdesign-react'
import CollapsePanel from 'tdesign-react/es/collapse/CollapsePanel'
import style from '@/styles/admin/PersonPlate.module.scss'

export default function PersonPlate() {
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
                    header="管理员"
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
                        <CollapsePanel
                            destroyOnCollapse={false}
                            disabled={undefined}
                            expandIcon={undefined}
                            header="板块A"
                        ><div className={style['personPlate-plates']}>
                                <div className={style['personPlate-plate']}>
                                    <Button style={{ marginRight: '0.1rem' }} theme="success" variant="base">管理员：syd</Button><Button style={{ marginRight: '0.1rem' }} theme="danger" variant="base">撤销</Button><Button theme="primary" variant="base">转让</Button>
                                </div><div className={style['personPlate-plate']}>
                                    <Button style={{ marginRight: '0.1rem' }} theme="success" variant="base">管理员：syd</Button><Button style={{ marginRight: '0.1rem' }} theme="danger" variant="base">撤销</Button><Button theme="primary" variant="base">转让</Button>
                                </div><div className={style['personPlate-plate']}>
                                    <Button style={{ marginRight: '0.1rem' }} theme="success" variant="base">管理员：syd</Button><Button style={{ marginRight: '0.1rem' }} theme="danger" variant="base">撤销</Button><Button theme="primary" variant="base">转让</Button>
                                </div><div className={style['personPlate-plate']}>
                                    <Button style={{ marginRight: '0.1rem' }} theme="success" variant="base">管理员：syd</Button><Button style={{ marginRight: '0.1rem' }} theme="danger" variant="base">撤销</Button><Button theme="primary" variant="base">转让</Button>
                                </div><div className={style['personPlate-plate']}>
                                    <Button style={{ marginRight: '0.1rem' }} theme="success" variant="base">管理员：syd</Button><Button style={{ marginRight: '0.1rem' }} theme="danger" variant="base">撤销</Button><Button theme="primary" variant="base">转让</Button>
                                </div><div className={style['personPlate-plate']}>
                                    <Button style={{ marginRight: '0.1rem' }} theme="success" variant="base">管理员：syd</Button><Button style={{ marginRight: '0.1rem' }} theme="danger" variant="base">撤销</Button><Button theme="primary" variant="base">转让</Button>
                                </div>
                            </div>
                        </CollapsePanel>
                        <CollapsePanel
                            destroyOnCollapse={false}
                            disabled={undefined}
                            expandIcon={undefined}
                            header="板块B"
                        >
                            这部分是每个折叠面板折叠或展开的内容，可根据不同业务或用户的使用诉求，进行自定义填充。可以是纯文本、图文、子列表等内容形式。
                        </CollapsePanel>
                    </Collapse>
                </CollapsePanel>
            </Collapse>
        </div>
    )
}
