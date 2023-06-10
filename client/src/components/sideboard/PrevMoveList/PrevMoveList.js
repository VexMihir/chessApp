import { PrevMoveListPannel } from "./PrevMovePannel";
// import {PrevListMoveButtons} from "./PrevMoveButtons";

let style = {
  // width: "90%",
  fontSize: "x-large",
  backgroundColor: "black",
  textAlign: "center",
};

const chessIconDict = {
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
};

export function PrevMoveList() {
  const mockPlayer1Moves = [
    chessIconDict.W_KING + "e1",
    chessIconDict.W_QUEEN + "a19",
    chessIconDict.W_PAWN + "g61",
    chessIconDict.W_QUEEN + "a2",
    chessIconDict.W_PAWN + "e71",
    chessIconDict.W_KING + "e110",
    chessIconDict.W_QUEEN + "a11",
    chessIconDict.W_PAWN + "g61",
    chessIconDict.W_QUEEN + "a15",
    chessIconDict.W_PAWN + "e71",
    chessIconDict.W_PAWN + "e101",
    chessIconDict.W_KING + "e15",
    chessIconDict.W_KING + "e51",
    chessIconDict.W_QUEEN + "a91",
    chessIconDict.W_PAWN + "g61",
    chessIconDict.W_QUEEN + "a51",
    chessIconDict.W_PAWN + "e71",
    chessIconDict.W_KING + "e110",
    chessIconDict.W_QUEEN + "a101",
    chessIconDict.W_PAWN + "g61",
    chessIconDict.W_QUEEN + "a15",
  ];
  const mockPlayer2Moves = [
    chessIconDict.B_KING + "e51",
    chessIconDict.B_QUEEN + "a24",
    chessIconDict.B_PAWN + "g16",
    chessIconDict.B_KING + "e26",
    chessIconDict.B_QUEEN + "a25",
    chessIconDict.B_PAWN + "g11",
    chessIconDict.B_KING + "e227",
    chessIconDict.B_QUEEN + "a26",
    chessIconDict.B_PAWN + "g16",
    chessIconDict.B_KING + "e28",
    chessIconDict.B_QUEEN + "a27",
    chessIconDict.B_PAWN + "g126",
    chessIconDict.B_KING + "e23",
    chessIconDict.B_QUEEN + "a38",
    chessIconDict.B_PAWN + "g236",
    chessIconDict.B_KING + "e22",
    chessIconDict.B_QUEEN + "a22",
    chessIconDict.B_PAWN + "g126",
    chessIconDict.B_KING + "e21",
    chessIconDict.B_QUEEN + "a11",
    chessIconDict.B_PAWN + "g116",
  ];

  return (
    <div style={style}>
      <h3>Previous Move List</h3>
      <div className={"PrevMoveList"} id={"PrevMoveList"}>
        <PrevMoveListPannel
          prop={{
            playerOneArr: mockPlayer1Moves,
            playerTwoArr: mockPlayer2Moves,
          }}
        />
      </div>
    </div>
  );
}
