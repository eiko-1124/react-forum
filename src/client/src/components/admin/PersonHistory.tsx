import React from 'react'
import { Button, List, Pagination, Space } from 'tdesign-react';
import ListItem from 'tdesign-react/es/list/ListItem';
import ListItemMeta from 'tdesign-react/es/list/ListItemMeta';
import style from '@/styles/admin/PersonInvitation.module.scss'

export default function PersonHistory(): JSX.Element {
    const listData = [
        { id: 1, content: '列表内容列表内容列表内容' },
        { id: 2, content: '列表内容列表内容列表内容' },
        { id: 3, content: '列表内容列表内容列表内容' },
        { id: 4, content: '列表内容列表内容列表内容' },
    ];
    return (
        <div className={style['PersonInvitation']}>
            <List className={style['PersonInvitation-list']}>
                {listData.map((item) => (
                    <ListItem key={item.id}>
                        <ListItemMeta title="列表主内容" description={item.content} />
                        <Space>
                            <Button theme="danger" variant="base">删除</Button>
                        </Space>
                    </ListItem>
                ))}
            </List>
            <div className={style['PersonInvitation-more']}>
                <Pagination className={style['PersonInvitation-pagination']} total={100} defaultPageSize={5} totalContent={false} showPageSize={false}></Pagination>
            </div>
        </div>
    )
}
