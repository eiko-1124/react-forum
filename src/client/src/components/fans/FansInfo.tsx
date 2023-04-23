import React, { useState } from 'react'
import { Avatar, Button, Input, Tag, Upload } from 'tdesign-react'
import style from '@/styles/admin/PersonInfo.module.scss'
import usePersonInfo from '@/core/admin/usePersonInfo'

export default function FansInfo(): JSX.Element {
    const { infoState, setInfoState, uploadRef, file, setFile, setName, setAvatar } = usePersonInfo()
    return (
        <div className={style['personInfo']}>
            <div>
                <div className={style['personInfo-name']}>
                    <label>用户名：</label>
                    <Input value={infoState.name} onChange={val => setInfoState({ ...infoState, name: val })}></Input>
                    <Button variant="outline" theme="success" ghost style={{ margin: '0rem 0.5rem' }} onClick={setName}>
                        修改
                    </Button>
                </div>
                <div className={style['personInfo-avatar']}>
                    <label>头像：</label>
                    <Avatar shape="round" size='7rem' image={infoState.avatar}></Avatar>
                    <Upload
                        ref={uploadRef}
                        files={file}
                        onChange={setFile}
                        theme={"image"}
                        accept="image/*"
                        autoUpload={false}
                        style={{
                            marginLeft: '0.5rem'
                        }}
                    />
                    <Button variant="outline" theme="success" ghost style={{ margin: '0rem 0.5rem' }} onClick={setAvatar}>
                        修改
                    </Button>
                </div>
                <div className={style['personInfo-statistics']}>
                    <label>统计：</label>
                    <ul>
                        <li>
                            <Tag theme="success" variant="dark">
                                发布帖子：{infoState.publish}
                            </Tag>
                        </li>
                        <li>
                            <Tag theme="success" variant="dark">
                                收到回复：{infoState.reply}
                            </Tag>
                        </li>
                        <li>
                            <Tag theme="success" variant="dark">
                                收到点赞：{infoState.like}
                            </Tag>
                        </li>
                        <li>
                            <Tag theme="success" variant="dark">
                                关注者：{infoState.subscribe}
                            </Tag>
                        </li>
                        <li>
                            <Tag theme="success" variant="dark">
                                粉丝：{infoState.fans}
                            </Tag>
                        </li>
                    </ul>
                </div>
            </div>
            <div className={style['personInfo-preference']}>
                <label>偏好：</label>
                <div className='personInfo-chart' style={{ height: '20rem', width: '100%' }}>
                </div>
            </div>
            <div></div>
        </div>
    )
}
