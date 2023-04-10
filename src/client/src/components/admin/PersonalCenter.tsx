import React, { useEffect } from 'react'
import style from '@/styles/admin/PersonalCenter.module.scss'
import { Divider, Avatar } from 'tdesign-react'
import MenuItem from 'tdesign-react/es/menu/MenuItem'
import HeadMenu from 'tdesign-react/es/menu/HeadMenu'

const classStyles = `
<style>
.personalCenter-menu .t-menu--light{
    background-color: transparent;
}
</style>
`;

export default function PersonalCenter(): JSX.Element {
    const bgStr = 'url(http://localhost:3000/static/background/1.jpg)'

    useEffect(() => {
        // 添加示例代码所需样式
        document.head.insertAdjacentHTML('beforeend', classStyles);
    }, []);

    return (
        <div className={style['personalCenter']}>
            <Divider
                align="center"
                dashed={false}
                layout="horizontal"
                className={style['personalCenter-horizontal']}
            >管理中心</Divider>
            <div className={style['personalCenter-bg']} style={{ backgroundImage: bgStr }}></div>
            <div className={'personalCenter-menu ' + style['personalCenter-menu']}>
                <HeadMenu
                    defaultValue={'0'}
                    style={{ marginRight: 20 }}
                >
                    <MenuItem value={'0'}>
                        <span>我的帖子</span>
                    </MenuItem>
                    <MenuItem value={'1'}>
                        <span>关注列表</span>
                    </MenuItem>
                    <MenuItem value={'2'}>
                        <span>历史/收藏</span>
                    </MenuItem>
                    <MenuItem value={'3'}>
                        <span>回复/点赞</span>
                    </MenuItem>
                    <MenuItem value={'4'}>
                        <span>好友</span>
                    </MenuItem>
                </HeadMenu>
            </div>
            <div className={style['personalCenter-content']}>
                <Divider style={{ margin: '0rem' }}></Divider>
            </div>
        </div>
    )
}
