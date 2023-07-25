// import React, { useState, useEffect, useRef } from "react";
// import "./style.css";
// import ChessRow from "./ChessRow";

// // Source: https://www.i2symbol.com/symbols/chess
// export const WHITE_CHESS_PIECE = {
//   KING: "w♔",
//   QUEEN: "w♕",
//   BISHOP: "w♗",
//   KNIGHT: "w♘",
//   ROOK: "w♖",
//   PAWN: "w♙",
// };

// // Source: https://www.i2symbol.com/symbols/chess
// export const BLACK_CHESS_PIECE = {
//   KING: "b♚",
//   QUEEN: "b♛",
//   BISHOP: "b♝",
//   KNIGHT: "b♞",
//   ROOK: "b♜",
//   PAWN: "b♟",
// };

// // Source: https://react-dnd.github.io/react-dnd/docs/tutorial
// export default function Chessboard() {
//   const [board, setBoard] = useState([
//     [
//       WHITE_CHESS_PIECE.ROOK,
//       WHITE_CHESS_PIECE.KNIGHT,
//       WHITE_CHESS_PIECE.BISHOP,
//       WHITE_CHESS_PIECE.QUEEN,
//       WHITE_CHESS_PIECE.KING,
//       WHITE_CHESS_PIECE.BISHOP,
//       WHITE_CHESS_PIECE.KNIGHT,
//       WHITE_CHESS_PIECE.ROOK,
//     ],
//     [
//       WHITE_CHESS_PIECE.PAWN,
//       WHITE_CHESS_PIECE.PAWN,
//       WHITE_CHESS_PIECE.PAWN,
//       WHITE_CHESS_PIECE.PAWN,
//       WHITE_CHESS_PIECE.PAWN,
//       WHITE_CHESS_PIECE.PAWN,
//       WHITE_CHESS_PIECE.PAWN,
//       WHITE_CHESS_PIECE.PAWN,
//     ],
//     [" ", " ", " ", " ", " ", " ", " ", " "],
//     [" ", " ", " ", " ", " ", " ", " ", " "],
//     [" ", " ", " ", " ", " ", " ", " ", " "],
//     [" ", " ", " ", " ", " ", " ", " ", " "],
//     [
//       BLACK_CHESS_PIECE.PAWN,
//       BLACK_CHESS_PIECE.PAWN,
//       BLACK_CHESS_PIECE.PAWN,
//       BLACK_CHESS_PIECE.PAWN,
//       BLACK_CHESS_PIECE.PAWN,
//       BLACK_CHESS_PIECE.PAWN,
//       BLACK_CHESS_PIECE.PAWN,
//       BLACK_CHESS_PIECE.PAWN,
//     ],
//     [
//       BLACK_CHESS_PIECE.ROOK,
//       BLACK_CHESS_PIECE.KNIGHT,
//       BLACK_CHESS_PIECE.BISHOP,
//       BLACK_CHESS_PIECE.KING,
//       BLACK_CHESS_PIECE.QUEEN,
//       BLACK_CHESS_PIECE.BISHOP,
//       BLACK_CHESS_PIECE.KNIGHT,
//       BLACK_CHESS_PIECE.ROOK,
//     ],
//   ]);

//   const oldLocationRef = useRef(null);
//   const newLocationRef = useRef(null);

//   function dragStart(oldLocation) {
//     console.log("start");
//     oldLocationRef.current = [oldLocation[1], oldLocation[2]];

//     // console.log("line 89", oldLocationRef.current)

//     // console.log("line 87", oldLocation[0].target.children[0])
//   }

//   function dragEnd(e) {
//     console.log("end");

//     // console.table(board);
//   }

//   function dragOver(e) {
//     console.log("over");
//     e.preventDefault();
//   }

//   function dragEnter(e) {
//     console.log("enter");
//   }

//   function dragLeave(e) {
//     console.log("leave");
//   }

//   function dragDrop(newLocation) {
//     console.log("drop");
//     newLocationRef.current = newLocation;

//     const [oldLocationX, oldLocationY] = oldLocationRef.current;
//     const [newLocationX, newLocationY] = newLocationRef.current;

//     console.log("line 183", oldLocationX, oldLocationY);

//     console.log("line 184", newLocationX, newLocationY);

//     console.log(board);

//     if (
//       (board[oldLocationX][oldLocationY][0] === "w" &&
//         board[newLocationX][newLocationY].trim() === "") ||
//       (board[oldLocationX][oldLocationY][0] === "b" &&
//         board[newLocationX][newLocationY].trim() === "") ||
//       (board[oldLocationX][oldLocationY][0] === "w" &&
//         board[newLocationX][newLocationY][0] === "b") ||
//       (board[oldLocationX][oldLocationY][0] === "b" &&
//         board[newLocationX][newLocationY][0] === "w")
//     ) {
//       console.log("170: true");

//       setBoard((prevState) => {
//         const newBoard = [...prevState];

//         const temp = newBoard[oldLocationX][oldLocationY];
//         newBoard[oldLocationX][oldLocationY] = " ";
//         newBoard[newLocationX][newLocationY] = temp;

//         console.log("line202", temp);

//         const result = newBoard;

//         return result;
//       });
//     } else {
//       console.log("204: false");
//     }
//   }

//   function getChessPieceLocation(chessPiece) {
//     let x = -1;
//     let y = -1;

//     if (chessPiece.trim() !== "") {
//       // Source: https://stackoverflow.com/questions/16102263/to-find-index-of-multidimensional-array-in-javascript
//       y = board.findIndex((row) => row.includes(chessPiece));
//       x = board[y].findIndex((column) => column.includes(chessPiece));
//     }

//     return [x, y];
//   }

//   function movePiece(chessPiece, newX, newY) {
//     let [oldY, oldX] = getChessPieceLocation(chessPiece);

//     if (chessPiece.trim() !== "") {
//       board[oldY][oldX] = "";
//       board[newY][newX] = chessPiece;
//       setBoard(board);
//     }
//   }

//   useEffect(() => {
//     return () => {
//       oldLocationRef.current = null;
//       newLocationRef.current = null;
//     };
//   }, []);

//   return (
//     <>
//       <div className="chessboard__main">
//         {board.map((row, rowIndex) => (
//           <>
//             <div className="chessboard__row">
//               {row.map((col, colIndex) => (
//                 <ChessRow
//                   dragStart={dragStart}
//                   dragEnd={dragEnd}
//                   dragOver={dragOver}
//                   dragEnter={dragEnter}
//                   dragLeave={dragLeave}
//                   dragDrop={dragDrop}
//                   rowId={rowIndex}
//                   colId={colIndex}
//                   chessPiece={col}
//                 />
//               ))}
//             </div>
//           </>
//         ))}
//       </div>
//     </>
//   );
// }
