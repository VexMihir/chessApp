import React, { useState, useEffect, useRef } from "react";
import "./style.css";
import ChessRow from "./ChessRow";
import FENStringUtils, { BLACK_CHESS_PIECE, WHITE_CHESS_PIECE } from "../util/FENStringUtils";
import chessUtils from "../util/chessUtils";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addFEN } from "../../Redux/Action/FEN_Actions";

const TOTAL_TIME_IN_SECOND = 900
// Source: https://react-dnd.github.io/react-dnd/docs/tutorial
export default function Chessboard() {
  const FENList = useSelector((storeState) =>  storeState.FENReducer.FEN)
  const dispatch = useDispatch()

  const INITIAL_PIECE_PLACEMENT = FENList[0].split(" ")[0]
  const INITIAL_ACTIVE_PLAYER = FENList[0].split(" ")[1]
  const INITIAL_CASTLING = FENList[0].split(" ")[2]
  const INITIAL_EN_PASSANT = FENList[0].split(" ")[3]
  const INITIAL_HALFMOVE = FENList[0].split(" ")[4]
  const INITIAL_FULLMOVE = FENList[0].split(" ")[5]

  const [isGameStarted, setIsGameStarted] = useState(false)
  const [timer, setTimer] = useState(TOTAL_TIME_IN_SECOND) // In second
  const [board, setBoard] = useState(FENStringUtils.getPiecePlacementIn2DArray(INITIAL_PIECE_PLACEMENT))//"r1b1k2r/pp3ppp/5b2/K2p1n2/2N5/4nN2/Pp4qP/8"))
  const [activePlayer, setActivePlayer] = useState(INITIAL_ACTIVE_PLAYER) // assume the first turn is w
  const [castling, setCastling] = useState(INITIAL_CASTLING) // default value based on the default start piece placement
                                                    // 16 possibilities
  const [enPassant, setEnPassant] = useState(INITIAL_EN_PASSANT) // default value based on the default start piece placement
  const [halfmove, setHalfmove] = useState(INITIAL_HALFMOVE) // assume that it starts at 0 and will be reset to 0 since last pawn advance or capture
  const [fullmove, setFullmove] = useState(INITIAL_FULLMOVE) // start at 1 and can up to 1500

  const oldLocationRef = useRef(null);
  const newLocationRef = useRef(null);

  function dragStart(oldLocation) {
    console.log("start");
    oldLocationRef.current = [oldLocation[1], oldLocation[2]];
    
    if (!isGameStarted) {
      setIsGameStarted(true)
      setTimer(timer-1)
    }

  }

  function dragEnd(e) {
    console.log("end");

    // console.table(board);
  }

  function dragOver(e) {
    console.log("over");
    e.preventDefault();
  }

  function dragEnter(e) {
    console.log("enter");
  }

  function dragLeave(e) {
    console.log("leave");
  }

  function dragDrop(newLocation) {
    if (!isGameStarted) {
      return
    }
    console.log("drop");
    newLocationRef.current = newLocation;

    const [oldLocationY, oldLocationX] = oldLocationRef.current;
    const [newLocationY, newLocationX] = newLocationRef.current;

    if (
      (activePlayer === "w" && board[oldLocationY][oldLocationX][0] === "w" &&
        board[newLocationY][newLocationX].trim() === "") ||
      (activePlayer === "b" && board[oldLocationY][oldLocationX][0] === "b" &&
        board[newLocationY][newLocationX].trim() === "") ||
      (activePlayer === "w" && board[oldLocationY][oldLocationX][0] === "w" &&
        board[newLocationY][newLocationX][0] === "b") ||
      (activePlayer === "b" && board[oldLocationY][oldLocationX][0] === "b" &&
        board[newLocationY][newLocationX][0] === "w")
    ) {

      //Source: https://react-dnd.github.io/react-dnd/docs/tutorial
      const dx = newLocationX - oldLocationX
      const dy = newLocationY - oldLocationY

      const isBlackKnight = board[oldLocationY][oldLocationX][1] === WHITE_CHESS_PIECE.KNIGHT[1]
      const isWhiteKnight = board[oldLocationY][oldLocationX][1] === BLACK_CHESS_PIECE.KNIGHT[1]

      const isBlackPawn = board[oldLocationY][oldLocationX][1] === BLACK_CHESS_PIECE.PAWN[1]
      const isWhitePawn = board[oldLocationY][oldLocationX][1] === WHITE_CHESS_PIECE.PAWN[1]

      const isBlackKing = board[oldLocationY][oldLocationX][1] === BLACK_CHESS_PIECE.KING[1]
      const isWhiteKing = board[oldLocationY][oldLocationX][1] === WHITE_CHESS_PIECE.KING[1]

      const isBlackRook = board[oldLocationY][oldLocationX][1] === BLACK_CHESS_PIECE.ROOK[1]
      const isWhiteRook = board[oldLocationY][oldLocationX][1] === WHITE_CHESS_PIECE.ROOK[1]

      const isBlackBishop = board[oldLocationY][oldLocationX][1] === WHITE_CHESS_PIECE.BISHOP[1]
      const isWhiteBishop = board[oldLocationY][oldLocationX][1] === BLACK_CHESS_PIECE.BISHOP[1]

      const isBlackQueen = board[oldLocationY][oldLocationX][1] === BLACK_CHESS_PIECE.QUEEN[1]
      const isWhiteQueen = board[oldLocationY][oldLocationX][1] === WHITE_CHESS_PIECE.QUEEN[1]
      /*TODO: determine the following chess piece for Valid Rook, Bishop, and Queen Move*/
      let closestUpChessPiece = 0
      let closestDownChessPiece = 0
      let closestLeftChessPiece = 0
      let closestRightChessPiece = 0
      let closestUpLeftChessPiece = 0
      let closestUpRightChessPiece = 0
      let closestDownLeftChessPiece = 0
      let closestDownRightChessPiece = 0

      if (
        (isBlackKnight && chessUtils.getKnightValidMove(dx, dy)) ||
        (isWhiteKnight && chessUtils.getKnightValidMove(dx, dy)) ||
        (isBlackPawn && chessUtils.getPawnValidMove(isWhitePawn, dx, dy)) || 
        (isWhitePawn && chessUtils.getPawnValidMove(isWhitePawn, dx, dy)) ||
        (isBlackKing && chessUtils.getKingValidMove(dx, dy)) ||
        (isWhiteKing && chessUtils.getKingValidMove(dx, dy)) ||
        (isBlackRook && chessUtils.getRookValidMove(dx, dy)) ||
        (isWhiteRook && chessUtils.getRookValidMove(dx, dy)) ||
        (isBlackBishop && chessUtils.getBishopValidMove(dx, dy)) ||
        (isWhiteBishop && chessUtils.getBishopValidMove(dx, dy)) ||
        (isBlackQueen && chessUtils.getQueenValidMove(dx, dy)) ||
        (isWhiteQueen && chessUtils.getQueenValidMove(dx, dy))
      ) {
        setBoard((prevState) => {
          const newBoard = [...prevState];

          const temp = newBoard[oldLocationY][oldLocationX];
          newBoard[oldLocationY][oldLocationX] = " ";
          newBoard[newLocationY][newLocationX] = temp;

          const result = newBoard;

          return result;
        });

        // Updating active player
        if (activePlayer === "b") {
          setActivePlayer("w");
        } else if (activePlayer === "w") {
          setActivePlayer("b");
        }

        // Updating fullmove
        if (activePlayer === "b") {
          setFullmove(fullmove + 1);
        }

        // Updating halfmove
        setHalfmove(halfmove + 1);
        // Move a PAWN
        if (
          board[oldLocationY][oldLocationX][1] === BLACK_CHESS_PIECE.PAWN[1] ||
          board[oldLocationY][oldLocationX][1] === WHITE_CHESS_PIECE.PAWN[1]
        ) {
          setHalfmove(0);
        }

        // Capture a piece
        if (
          (board[oldLocationY][oldLocationX][0] === "w" &&
            board[newLocationY][newLocationX][0] === "b") ||
          (board[oldLocationY][oldLocationX][0] === "b" &&
            board[newLocationY][newLocationX][0] === "w")
        ) {
          setHalfmove(0);
        }

        // If halfmove is 100, result is draw
        if (halfmove === 99) {
          console.log("Result: Draw");

          setBoard(FENStringUtils.getPiecePlacementIn2DArray(INITIAL_PIECE_PLACEMENT))
          setActivePlayer(INITIAL_ACTIVE_PLAYER)
          setCastling(INITIAL_CASTLING)
          setEnPassant(INITIAL_EN_PASSANT)
          setHalfmove(INITIAL_HALFMOVE)
          setFullmove(INITIAL_FULLMOVE)
          setIsGameStarted(false);
          setTimer(TOTAL_TIME_IN_SECOND);

          // When the game finishes, it should show the entire PGN file and send it to Server
        } 

        // } else if (isBlackWin){

        // } else if (isWhiteWin){

        // }


      }
    } 
  }

  // // Test Initial Value
  // useEffect(() => {
  //   console.log("line311:", board)
  //   console.log("line312:", activePlayer)
  //   console.log("line313:", castling)
  //   console.log("line314:", enPassant)
  //   console.log("line315:", halfmove)
  //   console.log("line316:", fullmove)
  // }, [])

  // Update FEN every halfmove
  useEffect(() => {
    
    // Generate a new FEN
    const currentPiecePlacement = FENStringUtils.getPiecePlacementInFENString(board)
    const currentActivePlayer = activePlayer
    const currentCastling = castling
    const currentEnPassant = enPassant
    const currenthalfmove = halfmove
    const currentfullmove = fullmove
    
    const currentFEN = currentPiecePlacement + " " 
                      + currentActivePlayer + " " 
                      + currentCastling + " "
                      + currentEnPassant + " "
                      + currenthalfmove + " "
                      + currentfullmove

    console.log("line 210", currentFEN)
    if (board !== null) {
      dispatch(addFEN(currentFEN))
    }

    return () => {
      oldLocationRef.current = null;
      newLocationRef.current = null;

    };
  }, [board]);

  useEffect(() => {

    if (timer === 0) {
      setBoard(FENStringUtils.getPiecePlacementIn2DArray(INITIAL_PIECE_PLACEMENT))
      setActivePlayer(INITIAL_ACTIVE_PLAYER)
      setCastling(INITIAL_CASTLING)
      setEnPassant(INITIAL_EN_PASSANT)
      setHalfmove(INITIAL_HALFMOVE)
      setFullmove(INITIAL_FULLMOVE)
      setIsGameStarted(false)
      setTimer(TOTAL_TIME_IN_SECOND)
    }

    if (timer > 0 && isGameStarted) {
      setTimeout(() => {
        setTimer(timer-1)      
      }, 1000);
    }

  }, [timer])

  return (
    <>
      <div className="chessboard__main">
      <div className="chessboard__timer chessboard__timer_theme">Timer: {timer}</div>
      <div className="chessboard__top">
        <div>Turn: {activePlayer.toUpperCase()}</div>
        <div>Halfmove: {halfmove}</div>
        <div>Fullmove: {fullmove}</div>
      </div>
        {board.map((row, rowIndex) => (
          <>
            <div className="chessboard__row">
              {row.map((col, colIndex) => (
                <ChessRow
                  dragStart={dragStart}
                  dragEnd={dragEnd}
                  dragOver={dragOver}
                  dragEnter={dragEnter}
                  dragLeave={dragLeave}
                  dragDrop={dragDrop}
                  rowId={rowIndex}
                  colId={colIndex}
                  chessPiece={col}
                />
              ))}
            </div>
          </>
        ))}
      </div>
    </>
  );
}
