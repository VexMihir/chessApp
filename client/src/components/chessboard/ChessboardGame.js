import { Chess } from "chess.js";
import Chessboard from "chessboardjsx";
import React, { useState, useEffect } from "react";
import {
  BLACK_CHESS_PIECE,
  RESULT,
  WHITE_CHESS_PIECE,
} from "../inGameView/InGameView";

const chess = new Chess();

export default function ChessboardGame({
  haveTwoPlayers,
  pawnPromotionChoice,
  setHistory,
  players,
  isSocketSpectator,
  setFullMove,
  setHalfMove,
  socket,
  roomId,
  isGameStarted,
  setIsGameStarted,
  activePlayer,
  setActivePlayer,
}) {
  const [fen, setFen] = useState(
    "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
  );

  const [sqaureStyles, setSqaureStyles] = useState();

  // make the bottom of the chessboard the player where it is you?
  const [orientation, setOrientation] = useState("white");

  const [playerColor, setPlayerColor] = useState(null);

  function onMouseOverSquare(square) {
    if (socket && !isSocketSpectator && isGameStarted) {
      socket.emit("valid move", roomId, square);
    }
  }

  function onSquareClick(square) {
    if (socket && !isSocketSpectator && players.length === 2) {
      // && isGameStarted) {
      let currentPlayer = null;

      for (let i = 0; i < players.length; i++) {
        if (socket.id === players[i].id) {
          currentPlayer = players[i];
          break;
        }
      }
      console.log("line 97", players);
      console.log("line 90", currentPlayer);
      console.log("line 91", activePlayer);

      if (activePlayer === currentPlayer.color[0]) {
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
          styles[self] = { backgroundColor: "#bbcb2b" };
        }
        for (let i = 0; i < validMovesExclusingSelf.length; i++) {
          const property = String(validMovesExclusingSelf[i]);
          // Source: https://codesandbox.io/s/x332zqpkl4?from-embed=&file=/src/integrations/WithMoveValidation.js:1229-1284
          styles[property] = {
            background: "radial-gradient(circle, #d6d6bd 36%, transparent 40%)",
          };
        }

        console.log("line 114", validMovesExclusingSelf);

        setSqaureStyles(styles);
      }
    }
  }

  function onDrop({ sourceSquare, targetSquare }) {
    if (socket && !isSocketSpectator && isGameStarted) {
      console.log("line 134");
      console.log(chess.history());

      const validMoves = chess.moves({ square: sourceSquare, verbose: true });

      console.log("line 139", validMoves);

      let result = "";
      for (let i = 0; i < validMoves.length; i++) {
        if (validMoves[i]["to"] === targetSquare) {
          result = validMoves[i]["san"];
          break;
        }
      }
      console.log("line 142");

      if (result !== "" && sourceSquare !== targetSquare) {
        console.log("line 144");
        // socket.emit('move', roomId, result);
        if (
          pawnPromotionChoice === BLACK_CHESS_PIECE.ROOK ||
          pawnPromotionChoice === WHITE_CHESS_PIECE.ROOK
        ) {
          socket.emit("move", roomId, sourceSquare, targetSquare, "r");
        } else if (
          pawnPromotionChoice === BLACK_CHESS_PIECE.BISHOP ||
          pawnPromotionChoice === WHITE_CHESS_PIECE.BISHOP
        ) {
          socket.emit("move", roomId, sourceSquare, targetSquare, "b");
        } else if (
          pawnPromotionChoice === BLACK_CHESS_PIECE.KNIGHT ||
          pawnPromotionChoice === WHITE_CHESS_PIECE.KNIGHT
        ) {
          socket.emit("move", roomId, sourceSquare, targetSquare, "n");
        } else if (
          pawnPromotionChoice === BLACK_CHESS_PIECE.QUEEN ||
          pawnPromotionChoice === WHITE_CHESS_PIECE.QUEEN
        ) {
          socket.emit("move", roomId, sourceSquare, targetSquare, "q");
        } else {
          socket.emit("move", roomId, sourceSquare, targetSquare, "q");
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
      socket.emit("game start", roomId);
    }
  }

  useEffect(() => {
    if (socket) {
      socket.on("moveMade", (move, fen, validMoves, history) => {
        console.log("line 202--------");
        console.log("line 159", move);
        console.log("validMoves", validMoves);
        console.log("history", history);

        // Here you can handle updates of the game state
        setFen(fen); // Update FEN state
        setHistory(history);
        chess.load(fen); // it reset the history.
        setActivePlayer(fen.split(" ")[1]);
        setHalfMove(fen.split(" ")[4]);
        setFullMove(fen.split(" ")[5]);
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
            lightSquareStyle={{ backgroundColor: "#eeeed2" }}
            darkSquareStyle={{ backgroundColor: "#769656" }}
            width={700}
            draggable={true}
            onDrop={onDrop}
            onDragOverSquare={onDragOverSquare}
            squareStyles={sqaureStyles}
            onSquareClick={onSquareClick}
            onMouseOverSquare={onMouseOverSquare}
            //Source: https://codesandbox.io/s/21r26yw13j?from-embed=&file=/src/integrations/CustomBoard.js
            pieces={{
              wK: () => (
                <div
                  style={{
                    display: "flex",
                    height: "100%",
                    width: "100%",
                    alignItems: "center",
                    fontSize: "xxx-large",
                  }}
                >
                  {WHITE_CHESS_PIECE.KING}
                </div>
              ),
              wR: () => (
                <div
                  style={{
                    display: "flex",
                    height: "100%",
                    width: "100%",
                    alignItems: "center",
                    fontSize: "xxx-large",
                  }}
                >
                  {WHITE_CHESS_PIECE.ROOK}
                </div>
              ),
              wN: () => (
                <div
                  style={{
                    display: "flex",
                    height: "100%",
                    width: "100%",
                    alignItems: "center",
                    fontSize: "xxx-large",
                  }}
                >
                  {WHITE_CHESS_PIECE.KNIGHT}
                </div>
              ),
              wB: () => (
                <div
                  style={{
                    display: "flex",
                    height: "100%",
                    width: "100%",
                    alignItems: "center",
                    fontSize: "xxx-large",
                  }}
                >
                  {WHITE_CHESS_PIECE.BISHOP}
                </div>
              ),
              wQ: () => (
                <div
                  style={{
                    display: "flex",
                    height: "100%",
                    width: "100%",
                    alignItems: "center",
                    fontSize: "xxx-large",
                  }}
                >
                  {WHITE_CHESS_PIECE.QUEEN}
                </div>
              ),
              wP: () => (
                <div
                  style={{
                    display: "flex",
                    height: "100%",
                    width: "100%",
                    alignItems: "center",
                    fontSize: "xxx-large",
                  }}
                >
                  {WHITE_CHESS_PIECE.PAWN}
                </div>
              ),
              bK: () => (
                <div
                  style={{
                    display: "flex",
                    height: "100%",
                    width: "100%",
                    alignItems: "center",
                    fontSize: "xxx-large",
                  }}
                >
                  {BLACK_CHESS_PIECE.KING}
                </div>
              ),
              bR: () => (
                <div
                  style={{
                    display: "flex",
                    height: "100%",
                    width: "100%",
                    alignItems: "center",
                    fontSize: "xxx-large",
                  }}
                >
                  {BLACK_CHESS_PIECE.ROOK}
                </div>
              ),
              bN: () => (
                <div
                  style={{
                    display: "flex",
                    height: "100%",
                    width: "100%",
                    alignItems: "center",
                    fontSize: "xxx-large",
                  }}
                >
                  {BLACK_CHESS_PIECE.KNIGHT}
                </div>
              ),
              bB: () => (
                <div
                  style={{
                    display: "flex",
                    height: "100%",
                    width: "100%",
                    alignItems: "center",
                    fontSize: "xxx-large",
                  }}
                >
                  {BLACK_CHESS_PIECE.BISHOP}
                </div>
              ),
              bQ: () => (
                <div
                  style={{
                    display: "flex",
                    height: "100%",
                    width: "100%",
                    alignItems: "center",
                    fontSize: "xxx-large",
                  }}
                >
                  {BLACK_CHESS_PIECE.QUEEN}
                </div>
              ),
              bP: () => (
                <div
                  style={{
                    display: "flex",
                    height: "100%",
                    width: "100%",
                    alignItems: "center",
                    fontSize: "xxx-large",
                  }}
                >
                  {BLACK_CHESS_PIECE.PAWN}
                </div>
              ),
            }}
          />
        </div>
      </div>
    </>
  );
}
