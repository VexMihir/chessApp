import React from "react";
import UserList from "./top/UserList";
import { PrevMoveList } from "./PrevMoveList/PrevMoveList";
import { PrevListMoveButtons } from "./PrevMoveList/PrevMoveButtons";

import "./style.css";
import MessageModal from "../portals/MessageModal";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function Sideboard({type, socket, setIsGameStarted, setIsModalOpen, setResult, activePlayer}) {

  
  const location = useLocation();
  const roomId = location.state.roomId

  useEffect(() => {

  }, [roomId])

  return (
    <>
      {type === "inGame" ? (
        <div className="sideboard__main">
          <div className="sideboard__section">
            {/* <UserList /> */}
            <PrevMoveList />

            <div className="sideboard__buttonSection">
              <button className='sideboard__button sideboard__button_elevated'
              onClick={() => {
                socket.emit('forfeit', roomId, socket.id);
              }}
              >Forfeit</button>
              <button className='sideboard__button sideboard__button_elevated'
              onClick={() => {

                socket.emit('offer draw', roomId, socket.id)


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
