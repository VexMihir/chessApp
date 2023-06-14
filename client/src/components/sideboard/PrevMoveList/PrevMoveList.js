import { PrevMoveListPannel } from "./PrevMovePannel";
import {useSelector} from "react-redux";
// import {PrevListMoveButtons} from "./PrevMoveButtons";

/*const chessIconDict = {
  W_KING: "♔",
  W_QUEEN: "♕",
  W_ROCK: "♖",
  W_BISHOP: "♗",
  W_KNIGHT: "♘;",
  W_PAWN: "♙",
  B_KING: "♚",
  B_QUEEN: "♛",
  B_ROCK: "♜",
  B_BISHOP: "♝",
  B_KNIGHT: "♞",
  B_PAWN: "♟︎",
};*/

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
    <div>
      <div className={"PrevMoveList"} id={"PrevMoveList"}>
        <PrevMoveListPannel
          prop={{
            playerOneArr: playerOneList,
            playerTwoArr: playerTwoList,
          }}
        />
      </div>
    </div>
  );
}
