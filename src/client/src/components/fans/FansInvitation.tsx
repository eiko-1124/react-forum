import { Button, Dialog, Input, List, Pagination, Space } from 'tdesign-react';
import ListItem from 'tdesign-react/es/list/ListItem';
import ListItemMeta from 'tdesign-react/es/list/ListItemMeta';
import style from '@/styles/admin/PersonInvitation.module.scss'
import usePersonInvitation from '@/core/admin/usePersonInvitation';
import Editor from '../plate/Editor';

export default function FansInvitation(): JSX.Element {

    const { listState, listSumState, pageChange, deleteInvitation, visible, setVisible, editer, getInvitationDetail, titleState, setTitleState, updateInvitation, textState, goInvitation } = usePersonInvitation()

    return (
        <div className={style['PersonInvitation']}>
            {listState.length > 0 && <List className={style['PersonInvitation-list']}>
                {listState.map((item) => (
                    <ListItem key={item.iid}>
                        <ListItemMeta title={<div style={{ cursor: 'pointer' }} onClick={() => goInvitation(item.plate, item.iid)}>{item.title}</div>} description={item.text} />
                        <Space>
                            <Button theme="primary" variant="base" onClick={() => getInvitationDetail(item.iid)}>修改</Button>
                            <Button theme="danger" variant="base" onClick={() => { deleteInvitation(item.iid) }}>删除</Button>
                        </Space>
                    </ListItem>
                ))}
            </List>}
            {
                listState.length === 0 && <p style={{ display: 'flex', height: '20rem', alignItems: 'center', justifyContent: 'center' }}>~~用户还没有发布内容~~</p>
            }
            <Dialog
                header="修改"
                visible={visible}
                style={{ minWidth: '50rem' }}
                onClose={() => setVisible(false)}
                onConfirm={updateInvitation}
                placement='top'
            >
                <div style={{ width: '40rem' }}>
                    <div style={{ display: 'flex', marginBottom: '0.5rem', alignItems: 'center' }}>
                        <label style={{ flexShrink: '0' }}>标题：</label>
                        <Input value={titleState} onChange={setTitleState}></Input>
                    </div>
                    <div>
                        <Editor excludeKeys={["undo", // 撤销
                            "redo", // 重做
                            "fullScreen", "todo",]} styles={{
                                height: '25rem',
                                maxHeight: '90vh'
                            }} ref={editer} defaultText={textState}></Editor>
                    </div>
                </div>
            </Dialog>
            {listSumState > 0 && <div className={style['PersonInvitation-more']}>
                <Pagination className={style['PersonInvitation-pagination']} total={listSumState} defaultPageSize={6} totalContent={false} showPageSize={false} onChange={val => pageChange(val)}></Pagination>
            </div>}
        </div >
    )
}
