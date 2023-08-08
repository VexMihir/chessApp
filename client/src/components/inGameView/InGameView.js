import React, { useEffect, useState, useContext } from "react";
import Sideboard from "../sideboard/Sideboard";
import ChessboardGame from "../chessboard/ChessboardGame";
import {
  WHITE_CHESS_PIECE,
} from "../../constants/customChessPiece";

import OutcomeModal from "../portals/OutcomeModal";
import { useNavigate, useParams } from "react-router-dom";
import MessageModal from "../portals/MessageModal";
import { SocketContext } from "../../context/socket";

/*
  A component about InGameView
  1. contains 2 child components - ChessboardGame and Sideboard
  2. there are a lot of socket events for this component to listen to the response of the server
  3. it can handle 5 different events - forfeits, offer draw, checkmate, non-offer draw, and time out
  4. Once the server sends back a response to a client, this component will shows 2 different types of portals or modals - one is for Offer draw, and one is for non-offer draw
  5. It also includes the header where it shows current turn, halfmove, fullmove, room number for this chessboard game
  Technologies: React, Socket.io, Tailwind CSS
*/
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
  const [isRoomExist, setIsRoomExist] = useState(true)
  const [isPlayerGetDisconnected, setIsPlayerGetDisconnected] = useState(false)
 
  const [isOneOption, setIsOneOption] = useState(false)
  const [message, setMessage] = useState("")

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

  const navigate = useNavigate();

  useEffect(() => {
    if (players.length === 0) {
      navigate('/')
    }
  }, [players])

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
        if (players[0].color.toLowerCase() === "white") {
          setScore("1-0");
          setResult("White");
          setReason("Black player forfeits");
        } else if (players[0].color.toLowerCase() === "black") {
          setScore("0-1");
          setResult("Black");
          setReason("White player forfeits");
        }
        setWinnerName(players[1].username);
      } else if (resigningPlayer === players[1].username) {
        if (players[0].color.toLowerCase() === "white") {
          setScore("1-0");
          setResult("White");
          setReason("Black player forfeits");
        } else if (players[0].color.toLowerCase() === "black") {
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
        if (players[0].color.toLowerCase() === "white") {
          setReason("White player accepted the draw offer");
        } else if (players[1].color.toLowerCase() === "black") {
          setReason("Black player accepted the draw offer");
        }
      } else if (socket.id === players[1].id) {
        if (players[0].color.toLowerCase() === "white") {
          setReason("White player accepted the draw offer");
        } else if (players[1].color.toLowerCase() === "black") {
          setReason("Black player accepted the draw offer");
        }
      } else {
        if(players[0].color.toLowerCase() === "white") {
          setReason("White player accepted the draw offer");
        } else if (players[1].color.toLowerCase() === "black") {
          setReason("Black player accepted the draw offer")
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
          if (players[0].color.toLowerCase() === "white") {
            setWinnerName(players[1].username);
          } else if (players[0].color.toLowerCase() === "black") {
            setWinnerName(players[0].username);
          }
        } else if (socket.id === players[1].id) {
          if (players[1].color.toLowerCase() === "white") {
            setWinnerName(players[0].username);
          } else if (players[1].color.toLowerCase() === "black") {
            setWinnerName(players[1].username);
          }
        } else {
          if (players[0].color.toLowerCase() === "white") {
            setWinnerName(players[1].username);
          } else if (players[0].color.toLowerCase() === "black") {
            setWinnerName(players[0].username);
          }
        }
        setReason("White player ran out of the time");
      } else if (timeoutColor === "black") {
        setScore("1-0");
        setResult("White");
        if (socket.id === players[0].id) {
          if (players[0].color.toLowerCase() === "white") {
            setWinnerName(players[0].username);
          } else if (players[0].color.toLowerCase() === "black") {
            setWinnerName(players[1].username);
          }
        } else if (socket.id === players[1].id) {
          if (players[1].color.toLowerCase() === "white") {
            setWinnerName(players[1].username);
          } else if (players[1].color.toLowerCase() === "black") {
            setWinnerName(players[0].username);
          }
        } else {
          if (players[0].color.toLowerCase() === "white") {
            setWinnerName(players[0].username);
          } else if (players[0].color.toLowerCase() === "black") {
            setWinnerName(players[1].username);
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
          if (players[0].color.toLowerCase() === "white") {
            setWinnerName(players[1].username);
          } else if (players[0].color.toLowerCase() === "black") {
            setWinnerName(players[0].username);
          }
        } else if (socket.id === players[1].id) {
          if (players[1].color.toLowerCase() === "white") {
            setWinnerName(players[0].username);
          } else if (players[1].color.toLowerCase() === "black") {
            setWinnerName(players[1].username);
          }
        } else {
          if (players[0].color.toLowerCase() === "white") {
            setWinnerName(players[1].username);
          } else if (players[0].color.toLowerCase() === "black") {
            setWinnerName(players[0].username);
          }
        }
        setReason("White player is checkmated");
      } else if (checkmateColor === "Black") {
        setScore("1-0");
        setResult("White");
        if (socket.id === players[0].id) {
          if (players[0].color.toLowerCase() === "white") {
            setWinnerName(players[0].username);
          } else if (players[0].color.toLowerCase() === "black") {
            setWinnerName(players[1].username);
          }
        } else if (socket.id === players[1].id) {
          if (players[1].color.toLowerCase() === "white") {
            setWinnerName(players[1].username);
          } else if (players[1].color.toLowerCase() === "black") {
            setWinnerName(players[0].username);
          }
        } else {
          if (players[0].color.toLowerCase() === "white") {
            setWinnerName(players[0].username);
          } else if (players[0].color.toLowerCase() === "black") {
            setWinnerName(players[1].username);
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

        setIsPlayerGetDisconnected(true)
        setIsOneOption(true)
        setMessage("Game abandoned by opponent")
        setIsMessageModalOpen(true);
        
      }
    });

    socket.on("user list update", (userList) => {
      // localStorage.setItem("players", JSON.stringify(userList.players))
      setPlayers(userList.players);
      if (userList.spectators.length > 0) {
        setSpectators(userList.spectators);
      }
      if (userList.players.length === 1) {
        if (socket.id === userList.players[0].id) {
          setSelfColor(userList.players[0].color.toLowerCase());
        }
      }
      if (userList.players.length === 2) {
        if (socket.id === userList.players[1].id) {
          setSelfColor(userList.players[1].color.toLowerCase());
        }
      }
    });

    socket.on("start game", () => {
      setIsGameStarted(true);
    });

    socket.on("time update", (timer) => {
      setTimer(timer);
    });

    socket.on("checkmate", (checkmatedPlayerColor) => {
      setCheckmateColor(checkmatedPlayerColor);
      setIsGameStarted(false);
      setIsModalOpen(true);
    });

    socket.on("game over draw", (drawReason) => {
      setGameOverDrawReason(drawReason);
      setIsGameStarted(false);
      setIsModalOpen(true);
    });

    // Forfeit
    socket.on("resignation", (resigningPlayer) => {
      setResigningPlayer(resigningPlayer);
      setIsGameStarted(false);
      setIsModalOpen(true);
    });

    socket.on("drawOffered", (socketId) => {

      setIsOneOption(false)
      if (selfColor === "white") {
        setMessage("Do you want to accept the draw offer from black player?")
      } else {
        setMessage("Do you want to accept the draw offer from white player?")
      }
      
      setIsMessageModalOpen(true);
    });

    socket.on("drawAccepted", () => {
      setIsDrawAccepted(true);
      setIsGameStarted(false);
      setIsModalOpen(true);
      setIsMessageModalOpen(false);
    });

    socket.on("drawDeclined", () => {
      setIsOneOption(true)

      if (selfColor === "white") {
        setMessage("The black player declined your draw offer")
      } else {
        setMessage("The white player declined your draw offer")
      }

      setIsMessageModalOpen(true);
    });

    socket.on("timeout", (winningPlayerColor) => {
      if (winningPlayerColor.toLowerCase() === "white") {
        setTimeoutColor("black");
      } else if (winningPlayerColor.toLowerCase() === "black") {
        setTimeoutColor("white");
      }
      setIsGameStarted(false);
      setIsModalOpen(true);
    });
  
    // //Source: https://stackoverflow.com/questions/37461495/socket-io-rejoin-rooms-on-reconnect
    // socket.on("connect", function() {
    //   console.log("Connecting");
    //   // console.log(players);
    //   const players = JSON.parse(localStorage.getItem("players"))
    //   console.log("line359");
    //   console.log(players);
    //   let username = ""
    //   let color = ""
    //   if (players.length === 1) {
    //     username = players[0].username
    //     color = players[0].color
    //   } else if (players.length === 2) {
    //     username = players[1].username
    //     color = players[1].color
    //   }
    //   socket.emit("join room", roomId, username, color)
    // });

    socket.on("room not exist", () => {
      setIsRoomExist(false)
      setIsOneOption(true)
      setMessage("The room does not exist.")
      setIsMessageModalOpen(true);
    })

    return () => {
      // socket.emit("room not exist", () => {
      //   console.log("line 384...");
      // })
      // socket.disconnect()
    }


    // return () => {
    //   // socket.off("moveMade");
    //   socket.disconnect();

    // };
  }, [roomId]);


  return (
    <>

      {isOneOption === true ? (
        <MessageModal
          isOpen={isMessageModalOpen}
          onOk={() => {
            // reset
            if (isPlayerGetDisconnected) {
              navigate('/')
            } else if (isRoomExist) {
              setIsMessageModalOpen(false);
            } else if (!isRoomExist) {
              navigate('/')
            }
          }}
          isOneOption={isOneOption}
        >
          {message}
        </MessageModal>
      ) : (
        <MessageModal
          isOpen={isMessageModalOpen}
          onCloseDeclined={() => {
            socket.emit("drawDeclined", roomId);
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
        <div className="w-[85%] min-w-[1300px] m-[0_auto] bg-[#cdcdcd] text-[#fff]">

          <div className="flex bg-black text-yellow-400 p-2 justify-around text-2xl">
            <div>Turn: {activePlayer.toUpperCase()}</div>
            <div>Halfmove: {halfMove}</div>
            <div>Fullmove: {fullMove}</div>
            <div>Room Number: {roomId}</div>
          </div>

          <div className="flex">
            <ChessboardGame
              result={result}
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
