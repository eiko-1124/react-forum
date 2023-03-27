import React from 'react'
import style from '@/styles/search/InvitationList.module.scss'
import { Divider } from 'tdesign-react'
import Card from '../communal/Card'

export default function InvitationList(): JSX.Element {

  const nums = new Array(10).fill(0)
  nums.forEach((num, index) => nums[index] = num + index)

  return (
    <div className={style['invitationList']}>
      <div className={style['invitationList-title']}>
        <Divider
          align="center"
          dashed={false}
          layout="horizontal"
          className={style['invitationList-horizontal']}
        >帖子结果</Divider>
      </div>
      {nums.map(key => <Card key={key}></Card>)}
    </div>
  )
}
