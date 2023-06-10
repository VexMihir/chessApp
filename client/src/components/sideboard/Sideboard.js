import React from 'react'
import UserList from './top/UserList'
import PrevMovesList from './middle/PrevMovesList'
import Forfeit from './bottom/Forfeit'
import OfferDraw from './bottom/OfferDraw'

import './style.css'

export default function Sideboard() {
  return (
    <div className='sideboard__main'>
      <UserList />
      <PrevMovesList />
      <div>
        <Forfeit />
        <OfferDraw />
      </div>
    </div>
  )
}
