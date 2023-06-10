import React from "react";
import UserList from "./top/UserList";
import { PrevMoveList } from "./PrevMoveList/PrevMoveList";
import Forfeit from "./bottom/Forfeit";
import OfferDraw from "./bottom/OfferDraw";
import { PrevListMoveButtons } from "./PrevMoveList/PrevMoveButtons";

import "./style.css";

export default function Sideboard(props) {
  return (
    <>
      {props.type === "inGame" ? (
        <div className="sideboard__main">
          <div className="sideboard__section">
            <UserList />
            <PrevMoveList />
            <div className="sideboard__buttonSection">
              <Forfeit />
              <OfferDraw />
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
