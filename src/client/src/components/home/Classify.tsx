import style from '@/styles/home/Classify.module.scss'
import { PageFirstIcon, PageLastIcon, RootListIcon, UserIcon } from 'tdesign-icons-react'
import { Avatar, Divider } from 'tdesign-react'
export default function (): JSX.Element {
    const nums = new Array(12).fill(0)
    nums.forEach((num, index) => {
        nums[index] = num + index
    })

    return <div className={style['classify']}>
        <div className={style['classify-title']}>
            <Divider
                align="center"
                dashed={false}
                layout="horizontal"
                className={style['classify-horizontal']}
            >热门板块</Divider>
            <div className={style['classify-btns']}>
                <PageFirstIcon size='1.5rem' />
                <div>1/17</div>
                <PageLastIcon size='1.5rem' />
            </div>
        </div>
        <div className={style['classify-content']}>
            {nums.map(key => {
                return <div className={style['classify-float']} key={key}>
                    <Avatar shape="round" size='4rem'>
                        W
                    </Avatar>
                    <div className={style['classify-info']}>
                        <p className={style['classify-info-name']}>123</p>
                        <p className={style['classify-info-opacity']}><UserIcon />123</p>
                        <p className={style['classify-info-opacity']}><RootListIcon />123</p>
                    </div>
                </div>
            })}
        </div>
    </div>
}