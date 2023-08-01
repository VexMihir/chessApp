import React, { useEffect, useState, useContext } from "react";
import Sideboard from "../sideboard/Sideboard";
import ChessboardGame from "../chessboard/ChessboardGame";

import OutcomeModal from "../portals/OutcomeModal";
import { useParams } from "react-router-dom";
import MessageModal from "../portals/MessageModal";
import { SocketContext } from "../../context/socket";

export const RESULT = {
  WHITE: "1-0", // black forfeits or black king is in checkmate
  BLACK: "0-1", // white forfeits or white king is in checkmate
  DRAW: "1/2-1/2", // stalemate, offer a draw
  UNFINISHED: "*", // internet disconnection or user closes the app or login out or a default value
};

// Source: https://www.i2symbol.com/symbols/chess
export const WHITE_CHESS_PIECE = {
  KING: "♔",
  QUEEN: "♕",
  BISHOP: "♗",
  KNIGHT: "♘",
  ROOK: "♖",
  PAWN: "♙",
};

// Source: https://www.i2symbol.com/symbols/chess
export const BLACK_CHESS_PIECE = {
  KING: "♚",
  QUEEN: "♛",
  BISHOP: "♝",
  KNIGHT: "♞",
  ROOK: "♜",
  PAWN: "♟",
};

export default function InGameView() {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [activePlayer, setActivePlayer] = useState("w");

  const [selfColor, setSelfColor] = useState("white");

  const socket = useContext(SocketContext)
  const [isSocketSpectator, setIsSocketSpectator] = useState(false);
  const [pawnPromotionChoice, setPawnPromotionChoice] = useState(
    WHITE_CHESS_PIECE.KNIGHT
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);

  const [halfMove, setHalfMove] = useState(0);
  const [fullMove, setFullMove] = useState(1);

  const [players, setPlayers] = useState([]);
  const [spectators, setSpectators] = useState([]);

  const [orientation, setOrientation] = useState("white");

  const [history, setHistory] = useState();

  const [timer, setTimer] = useState();

  // flags
  const [isDrawDeclined, setIsDrawDeclined] = useState(false);
  const [isDrawRescined, setIsDrawRescined] = useState(false);

  // flags of game outcomes
  const [resigningPlayer, setResigningPlayer] = useState("");
  const [isDrawAccepted, setIsDrawAccepted] = useState(false);
  const [timeoutColor, setTimeoutColor] = useState("");
  const [checkmateColor, setCheckmateColor] = useState("");
  const [gameOverDrawReason, setGameOverDrawReason] = useState("");

  //State for the game outcome
  const [score, setScore] = useState("*"); // 1-0 | 1/2-1/2 | 0-1 | *
  const [result, setResult] = useState("Unfinished"); // White | Draw | Black | Unfinished
  const [winnerName, setWinnerName] = useState("None"); // WhitePlayerName | None | BlackPlayerName | None
  const [reason, setReason] = useState(""); //

  //Source: https://chat.openai.com/share/82b7f010-6aa8-420c-b6f3-89e66744d516
  //Source: https://stackoverflow.com/questions/66506891/useparams-hook-returns-undefined-in-react-functional-component
  const { id } = useParams();
  const [roomId, setRoomId] = useState(id);

  useEffect(() => {
    for (let i = 0; i < spectators.length; i++) {
      if (socket.id === spectators[i].id) {
        setIsSocketSpectator(true);
        break;
      }
    }
  }, [spectators]);

  useEffect(() => {
    if (resigningPlayer !== "") {
      if (resigningPlayer === players[0].username) {
        if (players[0].color === "white") {
          setScore("1-0");
          setResult("White");
          setReason("Black player forfeits");
        } else if (players[0].color === "black") {
          setScore("0-1");
          setResult("Black");
          setReason("White player forfeits");
        }
        setWinnerName(players[1].username);
      } else if (resigningPlayer === players[1].username) {
        if (players[0].color === "white") {
          setScore("1-0");
          setResult("White");
          setReason("Black player forfeits");
        } else if (players[0].color === "black") {
          setScore("0-1");
          setResult("Black");
          setReason("White player forfeits");
        }
        setWinnerName(players[0].username);
      }
    }
  }, [resigningPlayer]);

  useEffect(() => {
    if (isDrawAccepted) {
      setScore("1/2-1/2");
      setResult("Draw");
      setWinnerName("None");
      if (socket.id === players[0].id) {
        if (players[0].color === "white") {
          setReason("White player accepted the draw offer");
        } else if (players[1].color === "black") {
          setReason("Black player accepted the draw offer");
        }
      } else if (socket.id === players[1].id) {
        if (players[0].color === "white") {
          setReason("White player accepted the draw offer");
        } else if (players[1].color === "black") {
          setReason("Black player accepted the draw offer");
        }
      }
    }
  }, [isDrawAccepted]);

  useEffect(() => {
    if (timeoutColor !== "") {
      if (timeoutColor === "white") {
        setScore("0-1");
        setResult("Black");
        if (socket.id === players[0].id) {
          if (players[0].color === "white") {
            setWinnerName(players[1].username);
          } else if (players[0].color === "black") {
            setWinnerName(players[0].username);
          }
        } else if (socket.id === players[1].id) {
          if (players[1].color === "white") {
            setWinnerName(players[0].username);
          } else if (players[1].color === "black") {
            setWinnerName(players[1].username);
          }
        }
        setReason("White player ran out of the time");
      } else if (timeoutColor === "black") {
        setScore("1-0");
        setResult("White");
        if (socket.id === players[0].id) {
          if (players[0].color === "white") {
            setWinnerName(players[0].username);
          } else if (players[0].color === "black") {
            setWinnerName(players[1].username);
          }
        } else if (socket.id === players[1].id) {
          if (players[1].color === "white") {
            setWinnerName(players[1].username);
          } else if (players[1].color === "black") {
            setWinnerName(players[0].username);
          }
        }
        setReason("Black player ran out of the time");
      }
    }
  }, [timeoutColor]);

  useEffect(() => {
    if (checkmateColor !== "") {
      if (checkmateColor === "White") {
        setScore("0-1");
        setResult("Black");
        if (socket.id === players[0].id) {
          if (players[0].color === "white") {
            setWinnerName(players[1].username);
          } else if (players[0].color === "black") {
            setWinnerName(players[0].username);
          }
        } else if (socket.id === players[1].id) {
          if (players[1].color === "white") {
            setWinnerName(players[0].username);
          } else if (players[1].color === "black") {
            setWinnerName(players[1].username);
          }
        }
        setReason("White player is checkmated");
      } else if (checkmateColor === "Black") {
        setScore("1-0");
        setResult("White");
        if (socket.id === players[0].id) {
          if (players[0].color === "white") {
            setWinnerName(players[0].username);
          } else if (players[0].color === "black") {
            setWinnerName(players[1].username);
          }
        } else if (socket.id === players[1].id) {
          if (players[1].color === "white") {
            setWinnerName(players[1].username);
          } else if (players[1].color === "black") {
            setWinnerName(players[0].username);
          }
        }
        setReason("Black player is checkmated");
      }
    }
  }, [checkmateColor]);

  useEffect(() => {
    if (gameOverDrawReason !== "") {
      setScore("1/2-1/2");
      setResult("Draw");
      setWinnerName("None");
      setReason("Draw by " + gameOverDrawReason);
    }
  }, [gameOverDrawReason]);

  useEffect(() => {

    socket.on("player disconnected", (roomNumber) => {
      if (roomId === roomNumber) {
        alert("Opponent disconnected");
        // navigate('/');
      }
    });

    socket.on("user list update", (userList) => {
      setPlayers(userList.players);
      // console.log("line 247", userList.players);
      if (userList.spectators.length > 0) {
        // console.log("line 249", userList.spectators);
        setSpectators(userList.spectators);
      }
      if (userList.players.length === 1) {
        if (socket.id === userList.players[0].id) {
          setSelfColor(userList.players[0].color);
        }
      }
      if (userList.players.length === 2) {
        if (socket.id === userList.players[1].id) {
          setSelfColor(userList.players[1].color);
        }
      }
    });

    socket.on("start game", () => {
      setIsGameStarted(true);
    });

    socket.on("time update", (timer) => {
      // console.log("Line 158 timer", timer);
      setTimer(timer);
    });

    socket.on("checkmate", (checkmatedPlayerColor) => {
      // dispatch(postPGNObj({
      //   history: gameHistory,
      //   playerOne: players[0],
      //   playerTwo: players[1],
      //   date: new Date(),
      //   winner: winningPlayerColor
      // }))
      setCheckmateColor(checkmatedPlayerColor);
      setIsGameStarted(false);
      setIsModalOpen(true);
    });

    socket.on("game over draw", (drawReason) => {
      // drawReason displays the 50 rules???
      setGameOverDrawReason(drawReason);
      setIsGameStarted(false);
      setIsModalOpen(true);
    });

    // Forfeit
    socket.on("resignation", (resigningPlayer) => {
      console.log("line 270 time out", resigningPlayer);
      setResigningPlayer(resigningPlayer);
      setIsGameStarted(false);
      setIsModalOpen(true);
    });

    socket.on("drawOffered", (socketId) => {
      console.log("Offer event line 184");
      setIsMessageModalOpen(true);
    });

    socket.on("drawAccepted", () => {
      setIsDrawAccepted(true);
      setIsGameStarted(false);
      setIsModalOpen(true);
      setIsMessageModalOpen(false);
    });

    socket.on("drawDeclined", () => {
      console.log("line 335 player declined your draw offer");
      setIsDrawDeclined(true);
      setIsMessageModalOpen(true);
    });

    // drawRescinded
    socket.on("drawRescinded", () => {
      console.log("line 335 player rescined your draw offer");
      setIsDrawRescined(true);
      setIsMessageModalOpen(true);
    });

    socket.on("timeout", (winningPlayerColor) => {
      if (winningPlayerColor === "white") {
        setTimeoutColor("black");
      } else if (winningPlayerColor === "black") {
        setTimeoutColor("white");
      }
      setIsGameStarted(false);
      setIsModalOpen(true);
    });

    // return () => {
    //   // socket.off("moveMade");
    //   socket.disconnect();
    // };
  }, [roomId]);


  return (
    <>
      {isDrawDeclined === true ? (
        <MessageModal
          isOpen={isMessageModalOpen}
          onOk={() => {
            // reset
            setIsDrawDeclined(false);
            setIsMessageModalOpen(false);
          }}
          isOneOption={true}
        >
          {selfColor === "white"
            ? "The black player declined your draw offer"
            : "The white player declined your draw offer"}
        </MessageModal>
      ) : isDrawRescined === true ? (
        <MessageModal
          isOpen={isMessageModalOpen}
          onOk={() => {
            // reset
            setIsDrawRescined(false);
            setIsMessageModalOpen(false);
          }}
          isOneOption={true}
        >
          {selfColor === "white"
            ? "The black player rescinded your draw offer"
            : "The white player resclided your draw offer"}
        </MessageModal>
      ) : (
        <MessageModal
          isOpen={isMessageModalOpen}
          onCloseDeclined={() => {
            socket.emit("drawDeclined", roomId);
            setIsMessageModalOpen(false);
          }}
          onCloseRescinded={() => {
            socket.emit("drawRescinded", roomId);
            setIsMessageModalOpen(false);
          }}
          onOutcomeModalOpen={() => {
            socket.emit("drawAccepted", roomId);
          }}
          isOneOption={false}
        >
          {selfColor === "white"
            ? "Do you want to accept the draw offer from black player?"
            : "Do you want to accept the draw offer from white player?"}
        </MessageModal>
      )}

      <OutcomeModal
        isOpen={isModalOpen}
        score={score}
        result={result}
        winnerName={winnerName}
        reason={reason}
      />

      <div className="flex items-center h-[100vh]">
        <div className="w-[85%] min-w-[1300px] m-[0_auto] bg-[#5928ed] text-[#fff]">

          <div className="flex bg-black text-white justify-around text-xl">
            <div>Turn: {activePlayer.toUpperCase()}</div>
            <div>Halfmove: {halfMove}</div>
            <div>Fullmove: {fullMove}</div>
            <div>Room Info: {roomId}</div>
          </div>

          <div className="flex">
            <ChessboardGame
              pawnPromotionChoice={pawnPromotionChoice}
              players={players}
              setHistory={setHistory}
              isSocketSpectator={isSocketSpectator}
              setHalfMove={setHalfMove}
              setFullMove={setFullMove}
              socket={socket}
              roomId={roomId}
              isGameStarted={isGameStarted}
              setIsGameStarted={setIsGameStarted}
              activePlayer={activePlayer}
              setActivePlayer={setActivePlayer}
              orientation={orientation}
              setOrientation={setOrientation}
            />
            <Sideboard
              pawnPromotionChoice={pawnPromotionChoice}
              setPawnPromotionChoice={setPawnPromotionChoice}
              history={history}
              socket={socket}
              players={players}
              timer={timer}
              isSocketSpectator={isSocketSpectator}
              roomId={roomId}
              spectators={spectators}
              orientation={orientation}
              setOrientation={setOrientation}
            />
          </div>
        </div>
      </div>
    </>
  );
}
