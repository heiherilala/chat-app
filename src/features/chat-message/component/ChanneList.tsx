import React from 'react'
import { ChannelItemType } from '../type'
import UserItem from './ChannelItem'

export default function ChanneList(data:ChannelItemType[]) {
  return (
    <ul className="space-y-2 font-medium">
        {data.map(item=>(UserItem (item)))}
    </ul>
  )
}
