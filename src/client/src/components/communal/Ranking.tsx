import style from '@/styles/communal/Ranking.module.scss'
import { Divider } from 'tdesign-react'

export default function (): JSX.Element {

    const nums = new Array(10).fill(0)
    nums.forEach((num, index) => nums[index] = num + index)
    return <div className={style['ranking']}>
        <Divider
            align="center"
            dashed={false}
            layout="horizontal"
            className={style['ranking-horizontal']}
        >榜单</Divider>
        <ul className={style['ranking-list']}>
            {nums.map(key => {
                return <li key={key}><span>{key}</span><label>??????一二三??????一二三??????一二三</label></li>
            })}
        </ul>
    </div>
}