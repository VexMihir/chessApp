import { PrevMoveListPannel } from "./PrevMovePannel";
import {useSelector} from "react-redux";
import {PrevMovePlayButton} from "./Buttons/PrevMovePlayButton";
import {PrevMovePausetButton} from "./Buttons/PrevMovePauseButton";
import {PrevMoveStartButton} from "./Buttons/PrevMoveStartButton";
import {PrevMoveEndButton} from "./Buttons/PrevMoveEndButton";
import {PrevMovePrevButton} from "./Buttons/PrevMovePrevButtons";
import {PrevMoveNextButton} from "./Buttons/PrevMoveNextButton";
import "./PrevMoveList.css"
export function PrevMoveList() {
  const LANMoveList = JSON.parse(useSelector(state=>state.PGNReducer.PGNOBJ)).prevMoveListLAN


  let playerOneList = [];
  let playerTwoList = []
  function convertPlayersList () {
    if(!LANMoveList) return
    for(let idx in LANMoveList) {
      if (idx === 0 || (idx % 2) === 0) {
        playerOneList.push(LANMoveList[idx])
      } else {
        playerTwoList.push(LANMoveList[idx])
      }
    }
  }
  convertPlayersList();

  return (
    <div className={"PrevMoveListWhole"}>
        <PrevMoveListPannel
          prop={{
            playerOneArr: playerOneList,
            playerTwoArr: playerTwoList,
          }} />
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
