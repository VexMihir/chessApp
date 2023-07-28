import React, {useState, useEffect} from "react";
import { PrevMovePrevButton } from "./PrevMoveList/MainPanel/Buttons/PrevMovePrevButtons";

// import "./style.css";
import { BLACK_CHESS_PIECE, WHITE_CHESS_PIECE } from "../inGameView/InGameView";
// import { PrevMoveList } from "./PrevMoveList/PrevMoveList";
import { InGamePrevMovePannel } from "./PrevMoveList/InGamePrevMovePannel";
export default function Sideboard(props) {

  const socket = props.socket;
  const players = props.players;
  const history = props.history;
  const timer = props.timer;
  const [self, setSelf] = useState()
  const [challenger, setChallenger] = useState()
  const [spectators, setSpectators] = useState()

  const [selfTimer, setSelfTimer] = useState()
  const [challengerTimer, setChallengerTimer] = useState()

  // console.log("line 15", socket);
  // console.log("line 16", players);


  useEffect(()=> {
    if (socket !== undefined && socket !== null && players !== undefined && players !== null) {
      // console.log('line23', timer);
      if (players.length === 2) {
        if (socket.id === players[0].id) {
          setSelfTimer(timer[players[0].id])
          setChallengerTimer(timer[players[1].id])
        } else if (socket.id === players[1].id) {
          setSelfTimer(timer[players[1].id])
          setChallengerTimer(timer[players[0].id])
        }
      }
    }
  }, [timer])

  useEffect(() => {


    if (socket !== undefined && socket !== null && players !== undefined && players !== null) {
      if (players.length === 1) {
        if (socket.id === players[0].id) {
          setSelf(players[0])
          // setChallenger(players[1])
        } else if (socket.id === players[1].id) {
          setSelf(players[1])
          // setChallenger(players[0])
        }
      } else if (players.length >= 2) {
        if (socket.id === players[0].id) {
          setSelf(players[0])
          setChallenger(players[1])
        } else if (socket.id === players[1].id) {
          setSelf(players[1])
          setChallenger(players[0])
        }
        if (players.length > 2) {
          let tempSpectators = []
          for (let i = 2; i < players.length; i++) {
            // tempSpectators.push(players[])
          }
        }
      }
  }

  }, [players])

  return (
    <>
      {/* {props.type === "inGame" ? ( */}
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

                    <div className="text-center w-full">{self !== undefined && self !== null ? self.username : "Waiting..."}</div>
                  </div>
                  <div className="flex border-x-0 border-y border-y-black border-solid px-2">
                    <div>Color:</div>
                    <div className="text-center w-full">{self !== undefined && self !== null ? self.color: "Waiting..."}</div>
                  </div>
                  <div className="flex px-2">
                    <div>Timer:</div>
                    <div className="text-center w-full">{selfTimer}</div>
                  </div>
                </div>

                <div className="w-1/2 border border-black border-solid">
                  <div>Player2 (Challenger)</div>
                  <div className="flex border-x-0 border-y border-y-black border-solid px-2">
                    <div>Name:</div>
                    <div className="text-center w-full">{challenger !== undefined && challenger !== null ? challenger.username : "Waiting..."}</div>
                  </div>
                  <div className="flex border-x-0 border-y border-y-black border-solid px-2">
                    <div>Color:</div>
                    <div className="text-center w-full">{challenger !== undefined && challenger !== null ? challenger.color : "Waiting..."}</div>
                  </div>
                  <div className="flex px-2">
                    <div>Timer:</div>
                    <div className="text-center w-full">{challengerTimer}</div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="text-white text-3xl text-center bg-slate-500">
                Spectators 
              </div>
              <div className="h-16 overflow-y-scroll text-black text-2xl grid grid-cols-[1fr_1fr]">
                <div>Spectator1: Test</div> <div>Spectator2: Test</div>
                <div>Spectator3: Test</div> <div>Spectator4: Test</div>
                <div>Spectator3: Test</div> <div>Spectator4: Test</div>
                <div>Spectator3: Test</div> <div>Spectator4: Test</div>
                <div>Spectator3: Test</div> <div>Spectator4: Test</div> 

                {/* {SANList.map((child, index) => {
                  return (
                    <>
                      {index % 2 === 0 ? (
                        <>
                          <p>{index / 2 + 1}.</p> <p>{child}</p>
                        </>
                      ) : (
                        <p>{child}</p>
                      )}
                    </>
                  );
                })} */}

              </div>
            </div>
            <div className="text-center text-white text-3xl bg-slate-500">
              Previous Moves
            </div>
            <InGamePrevMovePannel history={history}/>
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
                {/* <div className="text-3xl bg-white text-black text-center">{BLACK_CHESS_PIECE.ROOK}</div> */}
                <button className="text-2xl">{BLACK_CHESS_PIECE.BISHOP}</button>
                <button className="text-2xl">{BLACK_CHESS_PIECE.QUEEN}</button>
              </div>
            </div>
            <div className="text-3xl text-white text-center bg-slate-500">
              Game Result Actions
            </div>
            <div className="flex justify-around">
              <button className="font-bold bg-gray-300 text-2xl w-1/2 p-1">
                Forfeit
              </button>
              <button className="font-bold bg-gray-300 text-2xl w-1/2 p-1">
                Offer Draw
              </button>
            </div>
          </div>
        </div>
      {/* // ) : (
      //   <div className="sideboard__main">
      //     <div className="sideboard__section">
      //       <PrevMoveList />

      //       <div className="sideboard__buttonSection">
      //         <PrevMovePrevButton />
      //       </div>
      //     </div>
      //   </div>
      // )} */}
    </>
  );
}
