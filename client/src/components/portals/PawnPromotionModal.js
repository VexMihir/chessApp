import React from 'react'
import ReactDOM from 'react-dom'
import './style.css'
import { BLACK_CHESS_PIECE, WHITE_CHESS_PIECE } from '../util/FENStringUtils'
export default function PawnPromotionModal({isOpen, onClose, promotionPieceLocationY}) {
  console.log("line 6:::::", promotionPieceLocationY);
  if (!isOpen) {
    return null
  } else {
    return ReactDOM.createPortal(
      // source: https://www.youtube.com/watch?v=LyLa7dU5tp8&ab_channel=WebDevSimplified

      <div className='promotionModal promotionModal_theme' >

        <div className='promotionModal__main promotionModal__main_theme'>
          <div className='promotionModal__title'>
            Pormotion Message
          </div>
          <p className='promotionModal__content'>
            Please pick one chess piece.
          </p>
          <div className='promotionModal_buttonSection'>
            <button className='promotionModal__button' onClick={onClose}>
              {promotionPieceLocationY === 0 ? WHITE_CHESS_PIECE.KNIGHT[1] : BLACK_CHESS_PIECE.KNIGHT[1]}
            </button>
            <button className='promotionModal__button' onClick={onClose}>
              {promotionPieceLocationY === 0 ? WHITE_CHESS_PIECE.ROOK[1] : BLACK_CHESS_PIECE.ROOK[1]}
            </button>
            <button className='promotionModal__button' onClick={onClose}>
              {promotionPieceLocationY === 0 ? WHITE_CHESS_PIECE.BISHOP[1] : BLACK_CHESS_PIECE.BISHOP[1]}
            </button>
            <button className='promotionModal__button' onClick={onClose}>
              {promotionPieceLocationY === 0 ? WHITE_CHESS_PIECE.QUEEN[1] : BLACK_CHESS_PIECE.QUEEN[1]} 
            </button>
          </div>
        </div>
        
        
      </div>, document.getElementById('modal')
    )
  }
}
