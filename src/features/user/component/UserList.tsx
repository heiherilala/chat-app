import React from 'react'
import { ChannelItemType } from '../type'
import UserItem from './UserItem'

export default function UserList(data:ChannelItemType[]) {
  return (
    <ul className="space-y-2 font-medium">
        {data.map(item=>(UserItem (item)))}
    </ul>
  )
}
