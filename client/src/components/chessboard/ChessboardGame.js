import { Chess } from "chess.js";
import Chessboard from "chessboardjsx";
import React, { useState, useEffect } from "react";
import {
  BLACK_CHESS_PIECE,
  WHITE_CHESS_PIECE,
} from "../../constants/customChessPiece";
import { EVENTS } from "../../constants/aliases";

const chess = new Chess();

/*
  A component that displays the chessboard, a part of InGameView.
  1. It allows the players to pick a chesspiece to move to other chess square.
  2. It allows the players to click to see any valid moves.
  3. It allows the spectators to change the orientation of the chessboard.
  4. It includes a list of props sent by its parent component - inGameView
  5. One socket event fro this component is about current FEN data sent by the server
  6. It uses the chessboard.jsx library 
  Technologies: React, Socket.io, Tailwind CSS
*/
export default function ChessboardGame({
  pawnPromotionChoice,
  setHistory,
  players,
  isSocketSpectator,
  setFullMove,
  setHalfMove,
  socket,
  roomId,
  isGameStarted,
  activePlayer,
  setActivePlayer,
  orientation,
  setOrientation,
}) {
  const [fen, setFen] = useState(
    "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
  );

  const [sqaureStyles, setSqaureStyles] = useState();

  const [playerColor, setPlayerColor] = useState(null);

  function onSquareClick(square) {
    if (!isSocketSpectator && players.length === 2) {
      let currentPlayer = null;

      for (let i = 0; i < players.length; i++) {
        if (socket.id === players[i].id) {
          currentPlayer = players[i];
          break;
        }
      }

      if (
        currentPlayer !== null &&
        activePlayer === currentPlayer.color[0].toLowerCase()
      ) {
        const validMovesIncludingSelf = chess.moves({
          square: square,
          verbose: true,
        });

        let validMovesExclusingSelf = [];

        for (let i = 0; i < validMovesIncludingSelf.length; i++) {
          validMovesExclusingSelf.push(validMovesIncludingSelf[i]["to"]);
        }

        // Source: https://chat.openai.com/share/e9c789ed-ad8d-4843-9a37-51a772293ddc
        const styles = {};
        const self = String(square);
        if (validMovesExclusingSelf.length > 0) {
          styles[self] = { backgroundColor: "#d1d5db" };
        }
        for (let i = 0; i < validMovesExclusingSelf.length; i++) {
          const property = String(validMovesExclusingSelf[i]);
          // Source: https://codesandbox.io/s/x332zqpkl4?from-embed=&file=/src/integrations/WithMoveValidation.js:1229-1284
          styles[property] = {
            background: "radial-gradient(circle, #FACC15 36%, transparent 40%)",
          };
        }

        setSqaureStyles(styles);
      }
    }
  }

  function onDrop({ sourceSquare, targetSquare }) {
    if (socket && !isSocketSpectator && isGameStarted) {
      const validMoves = chess.moves({ square: sourceSquare, verbose: true });

      let result = "";
      for (let i = 0; i < validMoves.length; i++) {
        if (validMoves[i]["to"] === targetSquare) {
          result = validMoves[i]["san"];
          break;
        }
      }

      if (result !== "" && sourceSquare !== targetSquare) {
        if (
          pawnPromotionChoice === BLACK_CHESS_PIECE.ROOK ||
          pawnPromotionChoice === WHITE_CHESS_PIECE.ROOK
        ) {
          socket.emit(EVENTS.MOVE, roomId, sourceSquare, targetSquare, "r");
        } else if (
          pawnPromotionChoice === BLACK_CHESS_PIECE.BISHOP ||
          pawnPromotionChoice === WHITE_CHESS_PIECE.BISHOP
        ) {
          socket.emit(EVENTS.MOVE, roomId, sourceSquare, targetSquare, "b");
        } else if (
          pawnPromotionChoice === BLACK_CHESS_PIECE.KNIGHT ||
          pawnPromotionChoice === WHITE_CHESS_PIECE.KNIGHT
        ) {
          socket.emit(EVENTS.MOVE, roomId, sourceSquare, targetSquare, "n");
        } else if (
          pawnPromotionChoice === BLACK_CHESS_PIECE.QUEEN ||
          pawnPromotionChoice === WHITE_CHESS_PIECE.QUEEN
        ) {
          socket.emit(EVENTS.MOVE, roomId, sourceSquare, targetSquare, "q");
        } else {
          socket.emit(EVENTS.MOVE, roomId, sourceSquare, targetSquare, "q");
        }
      }
      setSqaureStyles("");
    }
  }

  // Not reasonable because second player has no idea how long the first player would get started by dragging over the square.
  function onDragOverSquare(square) {
    if (
      socket &&
      !isSocketSpectator &&
      players.length === 2 &&
      !isGameStarted
    ) {
      socket.emit(EVENTS.START_GAME, roomId);
    }
  }

  useEffect(() => {
    if (socket) {
      socket.on(EVENTS.MOVE_MADE, (move, fen, validMoves, history) => {
        // Here you can handle updates of the game state
        setFen(fen); // Update FEN state
        setHistory(history);
        chess.load(fen); // it reset the history.
        setActivePlayer(fen.split(" ")[1]);
        setHalfMove(fen.split(" ")[4]);
        setFullMove(fen.split(" ")[5]);
      });

      socket.on(EVENTS.GAME_CURRENT_FEN, (currentFEN) => {
        setFen(currentFEN);
      });
      socket.on(EVENTS.GAME_CURRENT_HISTORY, (currentHistory) => {
        setHistory(currentHistory);
      });
    }
  }, [roomId, socket]);

  useEffect(() => {
    // Find the player's color once the players array is set
    if (players.length === 2) {
      const currentPlayer = players.find((player) => player.id === socket.id);
      if (currentPlayer) {
        setPlayerColor(currentPlayer.color);
      }
    }
  }, [players, socket]);

  useEffect(() => {
    // Update orientation based on player's color
    if (playerColor === "White") {
      setOrientation("white");
    } else if (playerColor === "Black") {
      setOrientation("black");
    }
  }, [playerColor]);

  return (
    <>
      <div className="text-black">
        <div className="bg-white flex justify-center text-black">
          <Chessboard
            position={fen.split(" ")[0]}
            orientation={orientation}
            width={700}
            draggable={true}
            onDrop={onDrop}
            onDragOverSquare={onDragOverSquare}
            squareStyles={sqaureStyles}
            onSquareClick={onSquareClick}
            darkSquareStyle={{ backgroundColor: "#547396" }}
            lightSquareStyle={{ backgroundColor: "#eae9d4" }}
            pieces={{
              bQ: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  version="1.1"
                  width="45"
                  height="45"
                >
                  <g
                    style={{
                      opacity: "1",
                      fill: "#000000", // Fixed the bug from the line 574 on https://github.com/willb335/chessboardjsx/blob/master/src/Chessboard/svg/chesspieces/standard.js
                      fillOpacity: "1",
                      fillRule: "evenodd",
                      stroke: "#000000",
                      strokeWidth: "1.5",
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeMiterlimit: "4",
                      strokeDasharray: "none",
                      strokeOpacity: "1",
                    }}
                  >
                    <g
                      style={{
                        fill: "#000000",
                        stroke: "none",
                      }}
                    >
                      <circle cx="6" cy="12" r="2.75" />
                      <circle cx="14" cy="9" r="2.75" />
                      <circle cx="22.5" cy="8" r="2.75" />
                      <circle cx="31" cy="9" r="2.75" />
                      <circle cx="39" cy="12" r="2.75" />
                    </g>
                    <path
                      d="M 9,26 C 17.5,24.5 30,24.5 36,26 L 38.5,13.5 L 31,25 L 30.7,10.9 L 25.5,24.5 L 22.5,10 L 19.5,24.5 L 14.3,10.9 L 14,25 L 6.5,13.5 L 9,26 z"
                      style={{
                        strokeLinecap: "butt",
                        stroke: "#000000",
                      }}
                    />
                    <path
                      d="M 9,26 C 9,28 10.5,28 11.5,30 C 12.5,31.5 12.5,31 12,33.5 C 10.5,34.5 10.5,36 10.5,36 C 9,37.5 11,38.5 11,38.5 C 17.5,39.5 27.5,39.5 34,38.5 C 34,38.5 35.5,37.5 34,36 C 34,36 34.5,34.5 33,33.5 C 32.5,31 32.5,31.5 33.5,30 C 34.5,28 36,28 36,26 C 27.5,24.5 17.5,24.5 9,26 z"
                      style={{
                        strokeLinecap: "butt",
                      }}
                    />
                    <path
                      d="M 11,38.5 A 35,35 1 0 0 34,38.5"
                      style={{
                        fill: "none",
                        stroke: "#000000",
                        strokeLinecap: "butt",
                      }}
                    />
                    <path
                      d="M 11,29 A 35,35 1 0 1 34,29"
                      style={{
                        fill: "none",
                        stroke: "#ffffff",
                      }}
                    />
                    <path
                      d="M 12.5,31.5 L 32.5,31.5"
                      style={{
                        fill: "none",
                        stroke: "#ffffff",
                      }}
                    />
                    <path
                      d="M 11.5,34.5 A 35,35 1 0 0 33.5,34.5"
                      style={{
                        fill: "none",
                        stroke: "#ffffff",
                      }}
                    />
                    <path
                      d="M 10.5,37.5 A 35,35 1 0 0 34.5,37.5"
                      style={{
                        fill: "none",
                        stroke: "#ffffff",
                      }}
                    />
                  </g>
                </svg>
              ),
            }}
          />
        </div>
      </div>
    </>
  );
}
