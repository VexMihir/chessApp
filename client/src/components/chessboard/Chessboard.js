import React, { useState, useEffect, useRef } from "react";
import "./style.css";
import ChessRow from "./ChessRow";
import FENStringUtils, { BLACK_CHESS_PIECE, WHITE_CHESS_PIECE } from "../util/FENStringUtils";
import chessUtils from "../util/chessUtils";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addFEN } from "../../Redux/Action/FEN_Actions";
import PawnPromotionModal from "../portals/PawnPromotionModal";

const TOTAL_TIME_IN_SECOND = 900
// Source: https://react-dnd.github.io/react-dnd/docs/tutorial
export default function Chessboard() {
  const [isOpen, setIsOpen] = useState(false)

  //Source: https://chat.openai.com/share/6d4aa516-b0b5-4f8f-9ef5-9a1515cffeb9
  // const [promotionChoice, setPromotionChoice] = useState('')
  const [promotionPieceLocation, setPromotionPieceLocation] = useState([-1, -1])

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

  const [moveList, setMoveList] = useState([])

  // each piece knows the king's location 
  const [currentKingLocation, setCurrentKingLocation] = useState([7, 4])

  // // each white piece knows the white king's location
  // const [currentWhiteKingLocation, setCurrentWhiteKingLocation] = useState([7, 4])
  // // each black piece knows the black king's location
  // const [currentBlackKingLocation, setCurrentBlackKingLocation] = useState([0, 4])


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

      const pawnStatus = board[oldLocationY][oldLocationX][2]
      
      const isBlackKing = board[oldLocationY][oldLocationX][1] === BLACK_CHESS_PIECE.KING[1]
      const isWhiteKing = board[oldLocationY][oldLocationX][1] === WHITE_CHESS_PIECE.KING[1]
      
      const kingStatus = board[oldLocationY][oldLocationX][2]

      const isBlackRook = board[oldLocationY][oldLocationX][1] === BLACK_CHESS_PIECE.ROOK[1]
      const isWhiteRook = board[oldLocationY][oldLocationX][1] === WHITE_CHESS_PIECE.ROOK[1]

      const rookStatus = board[oldLocationY][oldLocationX][2]

      const isBlackBishop = board[oldLocationY][oldLocationX][1] === WHITE_CHESS_PIECE.BISHOP[1]
      const isWhiteBishop = board[oldLocationY][oldLocationX][1] === BLACK_CHESS_PIECE.BISHOP[1]

      const isBlackQueen = board[oldLocationY][oldLocationX][1] === BLACK_CHESS_PIECE.QUEEN[1]
      const isWhiteQueen = board[oldLocationY][oldLocationX][1] === WHITE_CHESS_PIECE.QUEEN[1]
      
      let originalCoords = chessUtils.getCoordsByRowCol(oldLocationY, oldLocationX)
      
      
      const row = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
      let currentUpDownChessPiece = Number(originalCoords[1])
      let currentRightLeftChessPiece = row.findIndex((val) => val === originalCoords[0]) + 1
      let currentRightDiagonal = chessUtils.getRightDiagonalNumber(originalCoords);
      let currentLeftDiagonal = chessUtils.getLeftDiagonalNumber(originalCoords); 

      // vertical
      let closestUpChessPiece = 9     
      let closestDownChessPiece = 0
      // horizontal
      let closestLeftChessPiece = 0
      let closestRightChessPiece = 9
      // right diaganal
      let closestUpRightChessPiece = 0
      let closestDownLeftChessPiece = 0
      // left diaganal
      let closestUpLeftChessPiece = 0
      let closestDownRightChessPiece = 0
      // enPassant
      
      closestUpChessPiece = chessUtils.getClosestUpChessPiece(board, originalCoords)
      closestDownChessPiece = chessUtils.getClosestDownChessPiece(board, originalCoords)
      closestRightChessPiece = chessUtils.getClosestRightChessPiece(board, originalCoords)
      closestLeftChessPiece = chessUtils.getClosestLeftChessPiece(board, originalCoords)
      closestUpRightChessPiece = chessUtils.getClosestUpRightChessPiece(board, originalCoords)
      closestDownLeftChessPiece = chessUtils.getClosestDownLeftChessPiece(board, originalCoords)
      closestUpLeftChessPiece = chessUtils.getClosestUpLeftChessPiece(board, originalCoords)
      closestDownRightChessPiece = chessUtils.getClosestDownRightChessPiece(board, originalCoords)

      // King
      let kingCoords = chessUtils.getCoordsByRowCol(currentKingLocation[0], currentKingLocation[1])

      let currentUpDownChessPieceWithRespectToKing = Number(kingCoords[1])
      let currentRightLeftChessPieceWithRespectToKing = row.findIndex((val) => val === kingCoords[0]) + 1
      let currentRightDiagonalWithRespectToKing = chessUtils.getRightDiagonalNumber(kingCoords);
      let currentLeftDiagonalWitheRespectToKing = chessUtils.getLeftDiagonalNumber(kingCoords); 

      let closestUpChessPieceWithRespectToKing = chessUtils.getClosestUpChessPiece(board, kingCoords)
      let closestDownChessPieceWithRespectToKing = chessUtils.getClosestDownChessPiece(board, kingCoords)
      let closestRightChessPieceWithRespectToKing = chessUtils.getClosestRightChessPiece(board, kingCoords)
      let closestLeftChessPieceWithRespectToKing = chessUtils.getClosestLeftChessPiece(board, kingCoords)
      let closestUpRightChessPieceWithRespectToKing = chessUtils.getClosestUpRightChessPiece(board, kingCoords)
      let closestDownLeftChessPieceWithRespectToKing = chessUtils.getClosestDownLeftChessPiece(board, kingCoords)
      let closestUpLeftChessPieceWithRespectToKing = chessUtils.getClosestUpLeftChessPiece(board, kingCoords)
      let closestDownRightChessPieceWithRespectToKing = chessUtils.getClosestDownRightChessPiece(board, kingCoords)


      console.log("line 141", closestUpChessPiece)
      console.log("line 149", closestDownChessPiece)
      console.log("line 159", closestRightChessPiece)
      console.log("line 173", closestLeftChessPiece)
      console.log("line 186", closestUpRightChessPiece);
      console.log("line 212", closestDownLeftChessPiece)
      console.log("line 231", closestUpLeftChessPiece)
      console.log("line 250", closestDownRightChessPiece)


      chessUtils.isKingSafe(board, currentUpDownChessPieceWithRespectToKing, closestUpChessPieceWithRespectToKing, 
        closestDownChessPieceWithRespectToKing, currentRightLeftChessPieceWithRespectToKing, closestRightChessPieceWithRespectToKing, 
        closestLeftChessPieceWithRespectToKing, currentRightDiagonalWithRespectToKing, closestUpRightChessPieceWithRespectToKing, 
        closestDownLeftChessPieceWithRespectToKing, currentLeftDiagonalWitheRespectToKing, closestUpLeftChessPieceWithRespectToKing, 
        closestDownRightChessPieceWithRespectToKing)

      if (
        (isBlackKnight && chessUtils.getKnightValidMove(dx, dy)) ||
        (isWhiteKnight && chessUtils.getKnightValidMove(dx, dy)) ||
        (isBlackPawn && chessUtils.getBlackPawnValidMove(pawnStatus, dx, dy, 
          currentUpDownChessPiece, closestDownChessPiece, 
          currentRightDiagonal, closestDownRightChessPiece, 
          currentLeftDiagonal, closestDownLeftChessPiece, 
          currentRightLeftChessPiece, enPassant)) || 
        (isWhitePawn && chessUtils.getWhitePawnValidMove(pawnStatus, dx, dy, 
          currentUpDownChessPiece, closestUpChessPiece, 
          currentRightDiagonal, closestUpRightChessPiece, 
          currentLeftDiagonal, closestUpLeftChessPiece, 
          currentRightLeftChessPiece, enPassant)) ||
        (isBlackKing && chessUtils.getKingValidMove(dx, dy, currentRightLeftChessPiece, closestLeftChessPiece, closestRightChessPiece, castling)) ||
        (isWhiteKing && chessUtils.getKingValidMove(dx, dy, currentRightLeftChessPiece, closestLeftChessPiece, closestRightChessPiece, castling)) ||
        (isBlackRook && chessUtils.getRookValidMove(dx, dy, currentUpDownChessPiece, currentRightLeftChessPiece, closestUpChessPiece, closestDownChessPiece, closestRightChessPiece, closestLeftChessPiece)) ||
        (isWhiteRook && chessUtils.getRookValidMove(dx, dy, currentUpDownChessPiece, currentRightLeftChessPiece, closestUpChessPiece, closestDownChessPiece, closestRightChessPiece, closestLeftChessPiece)) ||
        (isBlackBishop && chessUtils.getBishopValidMove(dx, dy, currentRightDiagonal, currentLeftDiagonal, closestUpRightChessPiece, closestDownLeftChessPiece, closestUpLeftChessPiece, closestDownRightChessPiece)) ||
        (isWhiteBishop && chessUtils.getBishopValidMove(dx, dy, currentRightDiagonal, currentLeftDiagonal, closestUpRightChessPiece, closestDownLeftChessPiece, closestUpLeftChessPiece, closestDownRightChessPiece)) ||
        (isBlackQueen && chessUtils.getQueenValidMove(dx, dy, currentUpDownChessPiece, currentRightLeftChessPiece, closestUpChessPiece, closestDownChessPiece, closestRightChessPiece, closestLeftChessPiece, currentRightDiagonal, currentLeftDiagonal, closestUpRightChessPiece, closestDownLeftChessPiece, closestUpLeftChessPiece, closestDownRightChessPiece)) ||
        (isWhiteQueen && chessUtils.getQueenValidMove(dx, dy, currentUpDownChessPiece, currentRightLeftChessPiece, closestUpChessPiece, closestDownChessPiece, closestRightChessPiece, closestLeftChessPiece, currentRightDiagonal, currentLeftDiagonal, closestUpRightChessPiece, closestDownLeftChessPiece, closestUpLeftChessPiece, closestDownRightChessPiece))
      ) {
        // only king can do castling with Rook and Rook cannot castling with King

       
          

        if (pawnStatus === "1") {
          if (isBlackPawn && Math.abs(dy) === 2 || isWhitePawn && Math.abs(dy) === 2) {
            if (isWhitePawn) {
              console.log("line 309 before:", enPassant);
              setEnPassant(chessUtils.getCoordsByRowCol((oldLocationY-1), (oldLocationX)))
              board[oldLocationY][oldLocationX] = "w♙0"
              console.log("line 312 after", chessUtils.getCoordsByRowCol((oldLocationY-1), (oldLocationX)))
            } else if (isBlackPawn) {
              console.log("line 313 before:", enPassant);
              setEnPassant(chessUtils.getCoordsByRowCol((oldLocationY+1), (oldLocationX)))
              board[oldLocationY][oldLocationX] = "b♟0"
              console.log("line 316 after", chessUtils.getCoordsByRowCol((oldLocationY+1), (oldLocationX)))
            }

          } else if (isBlackPawn && Math.abs(dy) === 1 || isWhitePawn && Math.abs(dy) === 1) {
            if (isBlackPawn) {
              console.log("line 309 before:", enPassant);
              board[oldLocationY][oldLocationX] = "b♟0"
              setEnPassant("-")
              console.log("line 313 after:", '-');
            } else {
              console.log("line 309 before:", enPassant);
              board[oldLocationY][oldLocationX] = "w♙0"
              setEnPassant("-")
              console.log("line 313 after:", '-');
            }
          }
        }
        
        if (kingStatus === "1") {
          if (isWhiteKing) {
            board[oldLocationY][oldLocationX] = "w♔0"
          } else if (isBlackKing) {
            board[oldLocationY][oldLocationX] = "b♚0"
          }
        }

        if (rookStatus === "1") {
          if (isWhiteRook) {
            board[oldLocationY][oldLocationX] = "w♖0"
          } else if (isBlackRook) {
            board[oldLocationY][oldLocationX] = "b♜0"
          }
        }

        console.log("line 350", newLocationY, newLocationX, oldLocationY, oldLocationX);
        console.log("line 350",chessUtils.getCoordsByRowCol(newLocationY, newLocationX), enPassant)
        // Only Pawn can meet the following condition
        if (chessUtils.getCoordsByRowCol(newLocationY, newLocationX) === enPassant) {
          console.log("line 348", "en passant")

          setBoard((prevState) => {
            const newBoard = [...prevState];

            const temp = newBoard[oldLocationY][oldLocationX];
            // the first step
            if ((newLocationX - oldLocationX === 1 && newLocationY - oldLocationY === -1) 
              || (newLocationX - oldLocationX === 1 && newLocationY - oldLocationY === 1))
            {
              newBoard[oldLocationY][oldLocationX+1] = " "; // capture the piece
            } else if ((newLocationX - oldLocationX === -1 && newLocationY - oldLocationY === -1)
              || (newLocationX - oldLocationX === -1 && newLocationY - oldLocationY === 1)){
              newBoard[oldLocationY][oldLocationX-1] = " "; // capture the piece
            }
            // the second step
            newBoard[oldLocationY][oldLocationX] = " ";
            newBoard[newLocationY][newLocationX] = temp;

            const result = newBoard;

            return result;
          });

        // only a King is castling
        } else if ((isBlackKing || isWhiteKing) && castling !== "-" && Math.abs(newLocationX - oldLocationX) === 2) {
          console.log("line 380::::");
          console.log(newLocationX - oldLocationX);

          setBoard((prevState) => {
            const newBoard = [...prevState];

            const temp = newBoard[oldLocationY][oldLocationX];

            newBoard[oldLocationY][oldLocationX] = " ";
            newBoard[newLocationY][newLocationX] = temp;

            // A white king Moves Kingside
            if (activePlayer === "w") {
              console.log("line 394:::::");
              if (newLocationX - oldLocationX === 2) {
                console.log("line 396::::::");
                // const rightWhiteRook = newBoard[7][7]
                newBoard[7][7] = " "
                newBoard[7][5] = "w♖0"
                setCurrentKingLocation([7,6])
              } else if (newLocationX - oldLocationX === -2) {
                console.log("line 401:::::::");
                // const leftWhiteRook = newBoard[7][0]
                newBoard[7][0] = " "
                newBoard[7][3] = "w♖0"
                setCurrentKingLocation([7,2])
              }
            } else if (activePlayer === "b") {
              console.log("line 407:::::");
              if (newLocationX - oldLocationX === 2) {
                console.log("line 409:::::");
                // const rightBlackRook = newBoard[0][7]
                newBoard[0][7] = " "
                newBoard[0][5] = "b♜0"
                setCurrentKingLocation([0,6])
              } else if (newLocationX - oldLocationX === -2) {
                console.log("line 414:::::");
                // const leftBlackRook = newBoard[0][0]
                newBoard[0][0] = " "
                newBoard[0][3] = "b♜0"
                setCurrentKingLocation([0,2])
              }
            }

            const result = newBoard;

            return result;
          });
          
        } else {
          setBoard((prevState) => {
            const newBoard = [...prevState];
            let temp = newBoard[oldLocationY][oldLocationX];;

            if ((isWhitePawn || isBlackPawn) && pawnStatus !== null && pawnStatus === '0') { 
              if (newLocationY === 0 && newLocationX !== 4 || newLocationY === 7 && newLocationX !== 4) {
                setPromotionPieceLocation([newLocationX, newLocationY])
                setIsOpen(true)
                temp = '???'
              }
            }

            if (isWhiteKing) {
              setCurrentKingLocation([newLocationY, newLocationX])
            }

            if (isBlackKing) {
              setCurrentKingLocation([newLocationY, newLocationX])
            }

            newBoard[oldLocationY][oldLocationX] = " ";
            newBoard[newLocationY][newLocationX] = temp;

            let castlingResult = chessUtils.updateCurrentCastling(newBoard)
            if (castlingResult !== "") {
              setCastling(castlingResult)
            } else {
              setCastling("-")
            }

            const result = newBoard;

            return result;
          });
        }

        if (activePlayer === 'w') {
          setMoveList((prevState) => {
            prevState.push(chessUtils.getCoordsByRowCol(newLocationY, newLocationX))
            return prevState
          })  
        }


        // Updating active player
        if (activePlayer === "b") {
          setActivePlayer("w");
        } else if (activePlayer === "w") {
          setActivePlayer("b");
        }

        // Updating fullmove
        if (activePlayer === "b") {
          setFullmove(Number(fullmove) + 1);
        }

        // Updating halfmove
        setHalfmove(Number(halfmove) + 1);
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

      }
    } 
  }

  // Test Initial Value
  useEffect(() => {
    console.log("line311:", board)
    console.log("line312:", activePlayer)
    console.log("line313:", castling)
    console.log("line314:", enPassant)
    console.log("line315:", halfmove)
    console.log("line316:", fullmove)

  }, [])

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



    console.log("line 152")
    console.log(moveList)


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
      <PawnPromotionModal isOpen={isOpen} promotionPieceLocationY={promotionPieceLocation[1]} onClose={(e) => {
        setBoard((prevState) =>{
          const newBoard = [...prevState];
          console.log(promotionPieceLocation[1], promotionPieceLocation[0]);
          
          // if promotion piece location is 0 then it must be a white pawn
          if (promotionPieceLocation[1] === 0) {
            newBoard[promotionPieceLocation[1]][promotionPieceLocation[0]] = 'w' + e.target.innerText + '1'
          // if promotion piece location is 7 then it must be a black pawn
          } else if (promotionPieceLocation[1] === 7) {
            newBoard[promotionPieceLocation[1]][promotionPieceLocation[0]] = 'b' + e.target.innerText + '1'
          }
          console.log("line 584", newBoard);
          const result = newBoard;
          
          setIsOpen(false)
          return result;

        }) 

       
      }}  /> 
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
