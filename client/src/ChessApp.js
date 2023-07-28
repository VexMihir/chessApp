import {  BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./ChessApp.css";
import InGameView from "./components/inGameView/InGameView";
import RoomAssignment from "./components/roomAssignment/RoomAssignment";
import {PrevGameQueryPage} from "./components/PrevQueryPage/PrevGameQueryPage";
import {WaitingRoomForm} from "./components/roomAssignment/WaitingRoom/WaitingRoomForm";
import {PrevGameQueryChildPage} from "./components/PrevQueryPage/ChildPage/PrevGameQueryChildPage";
import {SpectatorForm} from "./components/roomAssignment/JoinAsSpectator/SpectatorForm";
import PreviousGameView from "./components/previousGameView/PreviousGameView";
import {PlayerForm} from "./components/roomAssignment/JoinAsPlayer/PlayerForm";
import {NOTFOUNDPAGE} from "./components/404NOTFOUND/404NOTFOUND";

import io from 'socket.io-client';
import React, { useEffect, useState } from "react";

// export const SocketContext = React.createContext();

function ChessApp() {
  // const [socket, setSocket] = useState(null)

  // //Source: https://dev.to/bravemaster619/how-to-use-socket-io-client-correctly-in-react-app-o65  
  // useEffect(() => {
  //   const newSocket = io('http://localhost:5001');
  //   setSocket(newSocket)
  //   // socket.emit('join room', '1', '1');

  //   newSocket.on('moveMade', (move, fen, validMoves, history) => {
  //     console.log("line 202--------");
  //     console.log("line 159", move);
  //     console.log("validMoves", validMoves);
  //     console.log("history", history);


  //     // Here you can handle updates of the game state
  //     setFen(fen); // Update FEN state
  //     // chess.load(fen);
  //     // // dispatch(addFEN(fen));
  //     // setActivePlayer(fen.split(" ")[1])
  //     // setHalfMove(fen.split(" ")[4])
  //     // setFullMove(fen.split(" ")[5]);
  //     // setLegalMoves(legalMoves);
  //   });

  //   return () => {
  //       newSocket.disconnect();
  //     };
  // }, [])

  return (
      <>
        {/* <SocketContext.Provider value={socket}> */}
        <Router>
          <Routes>
                <Route path="/" element={<RoomAssignment />}>
                    <Route path="/playerForm" element={<PlayerForm/>}/> 
                    {/* socket={socket}/>} /> */}
                    <Route path={"/joinAsSpectator"} element={<SpectatorForm/>}/>
                    {/* socket={socket}/>} /> */}
                    <Route path="/waitingRoomForm" element={<WaitingRoomForm/>}/> 
                    {/* socket={socket}/>} /> */}
                </Route>

                <Route path="/previousGameView" element={<PrevGameQueryPage />}>
                  <Route path="/previousGameView/:pageNum" element={<PrevGameQueryChildPage />} />
                </Route>

              <Route path={"/prevMoveList"} element={<PreviousGameView />} />

              <Route path="/inGameView/:id" element={<InGameView/>}/> 
              {/* socket={socket} fen={fen}/>} /> */}
              <Route path="/404NOTFOUND" element={<NOTFOUNDPAGE />} />
          </Routes>
        </Router>
        {/* </SocketContext.Provider> */}
      </>
  );
}

export default ChessApp;
