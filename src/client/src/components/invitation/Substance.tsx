import React from 'react'
import style from '@/styles/invitation/Substance.module.scss'
import { Avatar, Button, Divider } from 'tdesign-react'
import Comment from './Comment'

export default function Substance(): JSX.Element {
    const nums = new Array(16).fill(0).map((x, i) => x + i + 2)
    return (
        <div className={style['substance']}>
            <div className={style['substance-title']}>
                <Divider
                    align="center"
                    dashed={false}
                    layout="horizontal"
                    className={style['substance-horizontal']}
                >帖子</Divider>
            </div>
            <h3>这是标题捏</h3>
            <div className={style['substance-container']}>
                <div className={style['substance-landlord']}>
                    <Avatar shape="round" size='5rem'></Avatar>
                    <p>用户A</p>
                    <p>等级1</p>
                </div>
                <p>这是内容啊笨蛋</p>
            </div>
            <div className={style['substance-options']}>
                <div className={style['substance-options-labels']}>
                    <label>1楼</label>
                    <label>2022-11-24</label>
                    <label>浏览量：999</label>
                    <label>评论：999</label>
                </div>
                <Button className={style['substance-options-btn']} size="small" variant="outline" theme="success" ghost>只看楼主 </Button>
                <Button className={style['substance-options-btn']} size="small" variant="outline" theme="success" ghost>收藏</Button>
                <Button className={style['substance-options-btn']} size="small" variant="outline" theme="success" ghost>点赞</Button>
            </div>
            <Divider style={{ margin: '0rem', marginBottom: '0.5rem' }}></Divider>
            <Comment user={{ name: '用户A', rank: 7 }} text={'这是内容这是内容'} num={1}></Comment>
            <Comment user={{ name: '用户A', rank: 7 }} text={'这是内容这是内容'} num={1}></Comment>
        </div>
    )
}
