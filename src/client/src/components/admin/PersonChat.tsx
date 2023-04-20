import React, { useRef, useState } from 'react'
import { Avatar, Divider, Menu } from 'tdesign-react'
import MenuItem from 'tdesign-react/es/menu/MenuItem'
import style from '@/styles/admin/PersonChat.module.scss'
import Editor from '../plate/Editor'

export default function PersonChat(): JSX.Element {
    const [active, setActive] = useState('0')
    const editer = useRef(null)

    return (
        <div className={style['personChat']}>
            <Menu
                value={active}
                onChange={(v: string) => setActive(v)}
                style={{ marginRight: 20 }}
            >
                <MenuItem value={'0'} style={{ height: '4rem' }}>
                    <div className={style['personChat-menu-item']}>
                        <Avatar shape="round" size='3rem'></Avatar>
                        <div className={style['personChat-menu-item-info']}>
                            <h3>lysmane</h3>
                            <p>what？</p>
                        </div>
                    </div>
                </MenuItem>
                <MenuItem value={'1'} style={{ height: '4rem' }}>
                    <div className={style['personChat-menu-item']}>
                        <Avatar shape="round" size='3rem'></Avatar>
                        <div className={style['personChat-menu-item-info']}>
                            <h3>lysmane</h3>
                            <p>what？</p>
                        </div>
                    </div>
                </MenuItem>
                <MenuItem value={'2'} style={{ height: '4rem' }}>
                    <div className={style['personChat-menu-item']}>
                        <Avatar shape="round" size='3rem'></Avatar>
                        <div className={style['personChat-menu-item-info']}>
                            <h3>lysmane</h3>
                            <p>what？</p>
                        </div>
                    </div>
                </MenuItem>
                <MenuItem value={'3'} style={{ height: '4rem' }}>
                    <div className={style['personChat-menu-item']}>
                        <Avatar shape="round" size='3rem'></Avatar>
                        <div className={style['personChat-menu-item-info']}>
                            <h3>lysmane</h3>
                            <p>what？</p>
                        </div>
                    </div>
                </MenuItem>
                <MenuItem value={'4'} style={{ height: '4rem' }}>
                    <div className={style['personChat-menu-item']}>
                        <Avatar shape="round" size='3rem'></Avatar>
                        <div className={style['personChat-menu-item-info']}>
                            <h3>lysmane</h3>
                            <p>what？</p>
                        </div>
                    </div>
                </MenuItem>
                <MenuItem value={'5'} style={{ height: '4rem' }}>
                    <div className={style['personChat-menu-item']}>
                        <Avatar shape="round" size='3rem'></Avatar>
                        <div className={style['personChat-menu-item-info']}>
                            <h3>lysmane</h3>
                            <p>what？</p>
                        </div>
                    </div>
                </MenuItem>
                <MenuItem value={'6'} style={{ height: '4rem' }}>
                    <div className={style['personChat-menu-item']}>
                        <Avatar shape="round" size='3rem'></Avatar>
                        <div className={style['personChat-menu-item-info']}>
                            <h3>lysmane</h3>
                            <p>what？</p>
                        </div>
                    </div>
                </MenuItem>
                <MenuItem value={'7'} style={{ height: '4rem' }}>
                    <div className={style['personChat-menu-item']}>
                        <Avatar shape="round" size='3rem'></Avatar>
                        <div className={style['personChat-menu-item-info']}>
                            <h3>lysmane</h3>
                            <p>what？</p>
                        </div>
                    </div>
                </MenuItem>
                <MenuItem value={'8'} style={{ height: '4rem' }}>
                    <div className={style['personChat-menu-item']}>
                        <Avatar shape="round" size='3rem'></Avatar>
                        <div className={style['personChat-menu-item-info']}>
                            <h3>lysmane</h3>
                            <p>what？</p>
                        </div>
                    </div>
                </MenuItem>
                <MenuItem value={'9'} style={{ height: '4rem' }}>
                    <div className={style['personChat-menu-item']}>
                        <Avatar shape="round" size='3rem'></Avatar>
                        <div className={style['personChat-menu-item-info']}>
                            <h3>lysmane</h3>
                            <p>what？</p>
                        </div>
                    </div>
                </MenuItem>
            </Menu>
            <div className={style['personChat-room']}>
                <Divider style={{ display: 'block', height: '100%' }} layout="vertical"></Divider>
                <div className={style['personChat-win']}>
                    <div style={{ marginBottom: '0.5rem', height: '23.5rem', border: '1px solid #e8e8e8' }}></div>
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
                </div>
            </div>
        </div>
    )
}
