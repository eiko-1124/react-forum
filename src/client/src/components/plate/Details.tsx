import React from 'react'
import style from '@/styles/plate/Details.module.scss'
import { Avatar, Button, Divider } from 'tdesign-react'

export default function Details(): JSX.Element {
    return (
        <div className={style['details']}>
            <div className={style['details-title']}>
                <Divider
                    align="center"
                    dashed={false}
                    layout="horizontal"
                    className={style['details-horizontal']}
                >板块</Divider>
            </div>
            <div className={style['details-content']}>
                <Avatar className={style['details-avatar']} shape="round" size='10rem'>
                    W
                </Avatar>
                <div className={style['details-info']}>
                    <Button theme="success" variant="base">
                        已关注
                    </Button>
                    <h4>第一个论坛</h4>
                    <p><button>版主:lysmane</button></p>
                    <p><button>关注:20000</button><button>帖子:20000</button></p>
                    <p className={style['details-info-introdution']}>
                        这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介
                        这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介
                        这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介
                        这是简介这是简介这是简介这是简介这是简介这是简介这是简介
                    </p>
                </div>
            </div>
        </div>
    )
}
