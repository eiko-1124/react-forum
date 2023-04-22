import React from 'react'
import style from '@/styles/search/InvitationList.module.scss'
import { Divider } from 'tdesign-react'
import Card from '../communal/Card'

type data = {
  iid: string,
  uid: string,
  pid: string,
  uName: string,
  pName: string,
  title: string,
  text: string,
  date: Date
}

export default function InvitationList({ data, sum }: { data: data[], sum: number }): JSX.Element {

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
      {data.map(site => <Card data={site} key={site.iid}></Card>)}
      {data.length < 12 && <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '6rem', color: '#606266' }}>~没有更多了~</p>}
    </div>
  )
}
