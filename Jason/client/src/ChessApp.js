import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./ChessApp.css";
import InGameView from "./components/inGameView/InGameView";
import PreviousGameView from "./components/previousGameView/PreviousGameView";
import RoomAssignment from "./components/roomAssignment/RoomAssignment";
import {mainStore} from './Redux/Store/mainStore'
import {Provider} from 'react-redux'

function ChessApp() {
  return (
    <>
      <BrowserRouter>
      <Provider store={mainStore}>
        <Routes>
          <Route path="/" element={<RoomAssignment />}></Route>
          <Route path="/:inGameView" element={<InGameView />}></Route>
          <Route
            path="/previousGameView"
            element={<PreviousGameView />}
          ></Route>
        </Routes>
        </Provider>
      </BrowserRouter>
    </>
  );
}

export default ChessApp;
