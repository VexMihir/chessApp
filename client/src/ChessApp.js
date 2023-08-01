import React from "react";
import {  BrowserRouter as Router, Routes, Route } from "react-router-dom";
import InGameView from "./components/inGameView/InGameView";
import RoomAssignment from "./components/roomAssignment/RoomAssignment";
import {PrevGameQueryPage} from "./components/PrevQueryPage/PrevGameQueryPage";
import {WaitingRoomForm} from "./components/roomAssignment/WaitingRoom/WaitingRoomForm";
import {PrevGameQueryChildPage} from "./components/PrevQueryPage/ChildPage/PrevGameQueryChildPage";
import {SpectatorForm} from "./components/roomAssignment/JoinAsSpectator/SpectatorForm";
import PreviousGameView from "./components/previousGameView/PreviousGameView";
import {PlayerForm} from "./components/roomAssignment/JoinAsPlayer/PlayerForm";
import {NOTFOUNDPAGE} from "./components/404NOTFOUND/404NOTFOUND";

import { SocketContext, socket } from "./context/socket";
import {PrevMoveList} from "./components/sideboard/PrevMoveList/PrevMoveList";
import {analysisView, normalView, playBackView} from "./RouteString/RouteString";
import {PrevMoveList} from "./components/previousGameView/PrevMoveList/PrevMoveList";
import {AnalysisView} from "./components/previousGameView/AnalysisView/AnalysisView";

function ChessApp() {

  return (
      <>
        <SocketContext.Provider value={socket}>
        <Router>
          <Routes>
                <Route path="/" element={<RoomAssignment />}>
                    <Route path="/playerForm" element={<PlayerForm/>}/> 
                    <Route path={"/joinAsSpectator"} element={<SpectatorForm/>}/>
                    <Route path="/waitingRoomForm" element={<WaitingRoomForm/>}/> 
                </Route>

                <Route path="/previousGameView" element={<PrevGameQueryPage />}>
                  <Route path="/previousGameView/:pageNum" element={<PrevGameQueryChildPage />} />
                </Route>

              <Route path={playBackView} element={<PreviousGameView />} >
                  <Route path={normalView} element={<PrevMoveList />} />
                  <Route path={analysisView} element={<AnalysisView />} />
              </Route>

              <Route path="/inGameView/:id" element={<InGameView/>}/> 
              <Route path="/404NOTFOUND" element={<NOTFOUNDPAGE />} />
          </Routes>
        </Router>
        </SocketContext.Provider>
      </>
  );
}

export default ChessApp;
