import { PrevMoveListPannel } from "./MainPanel/PrevMovePannel";
import {useSelector} from "react-redux";
import {PrevMovePlayButton} from "./MainPanel/Buttons/PrevMovePlayButton";
import {PrevMovePausetButton} from "./MainPanel/Buttons/PrevMovePauseButton";
import {PrevMoveStartButton} from "./MainPanel/Buttons/PrevMoveStartButton";
import {PrevMoveEndButton} from "./MainPanel/Buttons/PrevMoveEndButton";
import {PrevMovePrevButton} from "./MainPanel/Buttons/PrevMovePrevButtons";
import {PrevMoveNextButton} from "./MainPanel/Buttons/PrevMoveNextButton";
import "./PrevMoveList.css"
import {InfoPanel} from "./MainPanel/InfoPanel/InfoPanel";
export function PrevMoveList() {
  const pgnObj = JSON.parse(useSelector(state=>state.PGNReducer.PGNOBJ));
  const LANMoveList = pgnObj.prevMoveListLAN;
  const infoObj = {
      playerOne: pgnObj.playerOne,
      playerTwo: pgnObj.playerTwo,
      date: pgnObj.date,
      numberOfMoves: LANMoveList.length - 1,
      result: pgnObj.result
  }



  return (
    <div className={"PrevMoveListWhole"}>
        <PrevMoveListPannel
            prop={
            {
                LANMoveList: LANMoveList
            }
        }
           />
        <InfoPanel prop={infoObj} />
        <div className={"ButtonPanel"} id={"ButtonPanel"}>
            <PrevMovePlayButton/>
            <PrevMovePausetButton/>
            <PrevMoveStartButton/>
            <PrevMoveEndButton/>
            <PrevMovePrevButton/>
            <PrevMoveNextButton/>
        </div>
    </div>
  );
}
