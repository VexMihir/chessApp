import React from "react";
import UserList from "./top/UserList";
import { PrevMoveList } from "./PrevMoveList/PrevMoveList";
import { PrevListMoveButtons } from "./PrevMoveList/PrevMoveButtons";

import "./style.css";
import MessageModal from "../portals/MessageModal";
import { useState } from "react";

export default function Sideboard({type, setIsGameStarted, setIsModalOpen, setResult, activePlayer}) {
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false)

  return (
    <>
      {type === "inGame" ? (
        <div className="sideboard__main">
          <div className="sideboard__section">
            {/* <UserList /> */}
            <PrevMoveList />
            <MessageModal isOpen={isMessageModalOpen} onClose={()=>setIsMessageModalOpen(false)}
            onOutcomeModalOpen={()=> {
              setIsModalOpen(true)
              setIsMessageModalOpen(false)
              }}> 
              {activePlayer === "w"? 
              "Do you want to accept the draw offer from white player?" : 
              "Do you want to accept the draw offer from black player?"
              }
            </MessageModal>
            <div className="sideboard__buttonSection">
              <button className='sideboard__button sideboard__button_elevated'
              onClick={() => {
                setIsGameStarted(false)
                if (activePlayer === 'w') {
                  setResult("0-1")
                } else if (activePlayer === 'b') {
                  setResult("1-0")
                }
                setIsModalOpen(true)
                
              }}
              >Forfeit</button>
              <button className='sideboard__button sideboard__button_elevated'
              onClick={() => {
                setIsGameStarted(false)

                //Show dialog and would relate to socket.io
                setIsMessageModalOpen(true)

                setResult("1/2-1/2")
              }}
              >Offer Draw</button>
            </div>
          </div>
        </div>
      ) : (
        <div className="sideboard__main">
          <div className="sideboard__section">
            <UserList />
            <PrevMoveList />

            <div className="sideboard__buttonSection">
              <PrevListMoveButtons />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
