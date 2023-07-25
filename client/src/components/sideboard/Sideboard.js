import React from "react";
import { PrevMovePrevButton } from "./PrevMoveList/MainPanel/Buttons/PrevMovePrevButtons";

import "./style.css";
import { BLACK_CHESS_PIECE, WHITE_CHESS_PIECE } from "../inGameView/InGameView";
import { PrevMoveList } from "./PrevMoveList/PrevMoveList";
import { PrevMovePannel } from "./PrevMoveList/PrevMovePannel";
export default function Sideboard(props) {
  return (
    <>
      {props.type === "inGame" ? (
        <div className="w-1/2 bg-white">
          <div className="w-full flex flex-col h-full justify-between">
            <div>
              <div className="text-white text-3xl text-center bg-slate-500">
                Players Info
              </div>
              <div className="flex justify-around text-black text-xl text-center font-bold">
                <div className="w-1/2 border border-black border-solid">
                  <div>Player1 (You)</div>
                  <div className="flex border-x-0 border-y border-y-black border-solid px-2">
                    <div>Name:</div>
                    <div className="text-center w-full">Name 1</div>
                  </div>
                  <div className="flex border-x-0 border-y border-y-black border-solid px-2">
                    <div>Color:</div>
                    <div className="text-center w-full">White</div>
                  </div>
                  <div className="flex px-2">
                    <div>Timer:</div>
                    <div className="text-center w-full">300</div>
                  </div>
                </div>

                <div className="w-1/2 border border-black border-solid">
                  <div>Player2 (Challenger)</div>
                  <div className="flex border-x-0 border-y border-y-black border-solid px-2">
                    <div>Name:</div>
                    <div className="text-center w-full">Name 2</div>
                  </div>
                  <div className="flex border-x-0 border-y border-y-black border-solid px-2">
                    <div>Color:</div>
                    <div className="text-center w-full">Black</div>
                  </div>
                  <div className="flex px-2">
                    <div>Timer:</div>
                    <div className="text-center w-full">300</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center text-white text-3xl bg-slate-500">
              Previous Moves
            </div>
            <PrevMovePannel />
            <div>
              <div className="text-3xl bg-white text-black text-center">
                <div className="text-3xl text-white text-center bg-slate-500">
                  Pawn Promotion Choice
                </div>
                <div>{BLACK_CHESS_PIECE.ROOK}</div>
              </div>
              <div className="bg-white flex justify-around">
                <button className="text-2xl">{BLACK_CHESS_PIECE.ROOK}</button>
                <button className="text-2xl">{BLACK_CHESS_PIECE.KNIGHT}</button>
                <button className="text-2xl">{BLACK_CHESS_PIECE.BISHOP}</button>
                <button className="text-2xl">{BLACK_CHESS_PIECE.QUEEN}</button>
              </div>
            </div>
            <div className="text-3xl text-white text-center bg-slate-500">
              Game Result Actions
            </div>
            <div className="flex justify-around">
              <button className="font-bold bg-gray-300 rounded-xl text-2xl w-52 p-1">
                Forfeit
              </button>
              <button className="font-bold bg-gray-300 rounded-xl text-2xl w-52 p-1">
                Offer Draw
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="sideboard__main">
          <div className="sideboard__section">
            <PrevMoveList />

            <div className="sideboard__buttonSection">
              <PrevMovePrevButton />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
