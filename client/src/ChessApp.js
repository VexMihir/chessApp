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

import React from "react";
import {PrevMoveList} from "./components/sideboard/PrevMoveList/PrevMoveList";
import {analysisView, normalView, playBackView} from "./RouteString/RouteString";
import {AnalyisView} from "./components/previousGameView/testAI/analyisView";

function ChessApp() {

  return (
      <>
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
                  <Route path={analysisView} element={<AnalyisView />} />
              </Route>

              <Route path="/inGameView/:id" element={<InGameView/>}/> 
              <Route path="/404NOTFOUND" element={<NOTFOUNDPAGE />} />
          </Routes>
        </Router>
      </>
  );
}

export default ChessApp;
