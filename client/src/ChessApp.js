import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./ChessApp.css";
import InGameView from "./components/inGameView/InGameView";
import Navigation from "./components/navigation/Navigation";
import PreviousGameView from "./components/previousGameView/PreviousGameView";
import RoomAssignment from "./components/roomAssignment/RoomAssignment";

function ChessApp() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RoomAssignment />}></Route>
          <Route path="/inGameView" element={<InGameView />}></Route>
          <Route
            path="/previousGameView"
            element={<PreviousGameView />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default ChessApp;
