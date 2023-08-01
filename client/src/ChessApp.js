import {  BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import RoomAssignment from "./components/roomAssignment/RoomAssignment";
import {PlayerForm} from "./components/roomAssignment/JoinAsPlayer/PlayerForm";
import {SpectatorForm} from "./components/roomAssignment/JoinAsSpectator/SpectatorForm";
import {WaitingRoomForm} from "./components/roomAssignment/WaitingRoom/WaitingRoomForm";
import {PrevGameQueryPage} from "./components/PrevQueryPage/PrevGameQueryPage";
import {PrevGameQueryChildPage} from "./components/PrevQueryPage/ChildPage/PrevGameQueryChildPage";
import PreviousGameView from "./components/previousGameView/PreviousGameView";
import {AnalysisView} from "./components/previousGameView/AnalysisView/AnalysisView";
import InGameView from "./components/inGameView/InGameView";
import {NOTFOUNDPAGE} from "./components/404NOTFOUND/404NOTFOUND";
import {analysisView, normalView, playBackView} from "./RouteString/RouteString";
import {PrevMoveList} from "./components/previousGameView/PrevMoveList/PrevMoveList";

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
                  <Route path={analysisView} element={<AnalysisView />} />
              </Route>

              <Route path="/inGameView/:id" element={<InGameView/>}/> 
              <Route path="/404NOTFOUND" element={<NOTFOUNDPAGE />} />
          </Routes>
        </Router>
      </>
  );
}

export default ChessApp;
