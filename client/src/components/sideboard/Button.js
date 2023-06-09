import React from 'react'

export default function Button(props) {
  return (
    <>
      <button className='sideboard__button sideboard__button_elevated'>{props.name}</button>
    </>
  )
}
