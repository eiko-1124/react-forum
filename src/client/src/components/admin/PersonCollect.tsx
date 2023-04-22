import React from 'react'
import { Button, List, Pagination, Space } from 'tdesign-react';
import ListItem from 'tdesign-react/es/list/ListItem';
import ListItemMeta from 'tdesign-react/es/list/ListItemMeta';
import style from '@/styles/admin/PersonInvitation.module.scss'
import usePersonCollect from '@/core/admin/usePersonCollect';

export default function PersonCollect() {
    const { listState, listSumState, pageChange, deleteInvitation, goInvitation } = usePersonCollect()

    return (
        <div className={style['PersonInvitation']}>
            {listState.length > 0 && <List className={style['PersonInvitation-list']}>
                {listState.map((item) => (
                    <ListItem key={item.iid}>
                        <ListItemMeta title={<div style={{ cursor: 'pointer' }} onClick={() => goInvitation(item.plate, item.iid)}>{item.title}</div>} description={item.text} />
                        <Space>
                            <Button theme="danger" variant="base" onClick={() => { deleteInvitation(item.iid) }}>删除</Button>
                        </Space>
                    </ListItem>
                ))}
            </List>}
            {
                listState.length === 0 && <p style={{ display: 'flex', height: '20rem', alignItems: 'center', justifyContent: 'center' }}>~~用户还没有发布内容~~</p>
            }
            {listSumState > 0 && <div className={style['PersonInvitation-more']}>
                <Pagination className={style['PersonInvitation-pagination']} total={listSumState} defaultPageSize={6} totalContent={false} showPageSize={false} onChange={val => pageChange(val)}></Pagination>
            </div>}
        </div >
    )
}
