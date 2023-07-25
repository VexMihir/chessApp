import React from 'react'
import ReactDOM from 'react-dom'

export default function MessageModal({isOpen, onClose, onOutcomeModalOpen,children}) {
    if (!isOpen) {
        return null
    } else {
    return ReactDOM.createPortal(
        <>
        <div className='messageModal messageModal_theme'>
            <div className='messageModal__main messageModal__main_theme'>
                <h3>Message Dialog</h3>
                {children}
                <div>
                    <button onClick={onClose}>No</button>
                    <button onClick={onOutcomeModalOpen}>Yes</button>
                </div>
            </div>
        </div>
        </>

    , document.getElementById("modal"))
    }
}
