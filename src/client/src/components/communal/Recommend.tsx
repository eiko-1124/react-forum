import style from '@/styles/communal/Recommend.module.scss'
import Card from '../communal/Card'
import Divider from 'tdesign-react/es/divider/Divider'
import { useState } from 'react'
import { Button, Pagination } from 'tdesign-react'

type Props = {
    labels: string[]
}

export default function ({ labels }: Props): JSX.Element {
    const nums = new Array(10).fill(0)
    nums.forEach((num, index) => nums[index] = num + index)

    const [selectState, setSelectState] = useState(0)

    return <div className={style['recommend']}>
        <div className={style['recommend-tabs']}>
            <Divider
                align="center"
                dashed={false}
                layout="horizontal"
                className={style['recommend-horizontal']}
            >帖子推荐</Divider>
            {
                labels.map((text, index) => {
                    return <div key={index}>
                        <button className={selectState === index ? style['recommend-selected'] : ''}
                            onClick={() => setSelectState(index)}
                        >{text}</button>
                        <Divider className={style['recommend-vertical']} layout="vertical"></Divider>
                    </div>
                })
            }
        </div>
        <div>
            <div className={!selectState ? style['recommend-hidden'] : ''} >
                {nums.map(key => <Card key={key}></Card>)}
            </div>
            <div className={selectState ? style['recommend-hidden'] : ''} >
                {nums.map(key => <Card key={key}></Card>)}
            </div>
        </div>
        <div className={style['recommend-more']}>
            <Pagination className={style['recommend-pagination']} total={100} defaultPageSize={5} totalContent={false} showPageSize={false}></Pagination>
        </div>
    </div>
}