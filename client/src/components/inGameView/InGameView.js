import React, { useEffect, useState } from "react";
import Sideboard from "../sideboard/Sideboard";
import ChessboardGame from "../chessboard/ChessboardGame";

import OutcomeModal from "../portals/OutcomeModal";
import io from 'socket.io-client';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import MessageModal from "../portals/MessageModal";

export const RESULT = {
  WHITE: "1-0", // black forfeits or black king is in checkmate
  BLACK: "0-1", // white forfeits or white king is in checkmate
  DRAW: "1/2-1/2", // stalemate, offer a draw
  UNFINISHED: "*" // internet disconnection or user closes the app or login out or a default value
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

  // const [isNavigationClose, setIsNavigationClose] = useState(true);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [activePlayer, setActivePlayer] = useState('w')

  const [selfColor, setSelfColor] = useState('white')

  const [socket, setSocket] = useState(null)
  const [isSocketSpectator, setIsSocketSpectator] = useState(false)
  const [pawnPromotionChoice, setPawnPromotionChoice] = useState(WHITE_CHESS_PIECE.KNIGHT)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false)
  const [haveTwoPlayers, setHaveTwoPLayers] = useState(false)
  const [result, setResult] = useState(RESULT.UNFINISHED) // default

  // const PGNList = useSelector((storeState) => storeState.PGNReducer)
  const [halfMove, setHalfMove] = useState(0);
  const [fullMove, setFullMove] = useState(1);

  const [players, setPlayers] = useState([]);
  const [spectators, setSpectators] = useState([]);
  
  const [history, setHistory] = useState();

  const [timer, setTimer] = useState()

  //Source: https://chat.openai.com/share/82b7f010-6aa8-420c-b6f3-89e66744d516
  //Source: https://stackoverflow.com/questions/66506891/useparams-hook-returns-undefined-in-react-functional-component
  const { id } = useParams();

 
  const [roomId, setRoomId] = useState(id)
  const navigate = useNavigate();
  const location = useLocation();
  // const roomNumber = useSelector(storeState=>storeState.JoinRoomReducer.roomNumber);


  useEffect(()=> {
    console.log("line 75");
    console.log(players);
    console.log("line 77");
    console.log(socket);

    if (players.length === 2) {
      //if there is 2 players, then we also make sure the sockets are alive.
      setHaveTwoPLayers(true)
    }

  }, [players])

  useEffect(()=> {
    for (let i = 0; i < spectators.length; i++) {
      if (socket.id === spectators[i].id) {
        setIsSocketSpectator(true)
        break
      }
    }
  }, [spectators])

  // useEffect(()=> {
  //   for (let i = 0; i < players.length; i++) {
  //     if (players.length === 1) {
  //       if (socket.id === players[0].id) {
  //         setIsSocketPlayerOne(true)
  //         setIsSocketPlayerTwo(false)  
  //       }
  //     } else if (players.length === 2) {
  //       if (socket.id === players[0].id) {
  //         setIsSocketPlayerOne(true)
  //         setIsSocketPlayerTwo(false)
  //       } else if (socket.id === players[1].id) {
  //         setIsSocketPlayerOne(false)
  //         setIsSocketPlayerTwo(true)
  //       }
  //     }
  //   }
  // }, [players])


  useEffect(() => {
    const newSocket = io('http://localhost:5001');
    console.log("line 200");
    setSocket(newSocket);
    newSocket.emit('join room', roomId, getUsernameFromState());

    newSocket.on('room full', () => {
      const confirmSpectator = window.confirm('The room is full. Do you want to join as a spectator?');
      if (confirmSpectator) {
        newSocket.emit('join as spectator', roomId, getUsernameFromState());
      } else {
        // navigate('/');
      }
    });


    newSocket.on('player disconnected', (roomNumber) => {
      if (roomId === roomNumber) {
        alert('Opponent disconnected');
        // navigate('/');
      }
    });

    newSocket.on('user list update', (userList) => {

      setPlayers(userList.players);

      console.log("line 247", userList.players);
      if (userList.spectators.length > 0) {
        console.log("line 249", userList.spectators);
        setSpectators(userList.spectators)
      }
      if (userList.players.length === 1) {
        if (newSocket.id === userList.players[0].id) {
          setSelfColor(userList.players[0].color)
        }

        console.log("line 258");
        // setWhitePlayerName(userList.players[0].username)
        // if (userList.players[0].color === 'black') {
          // setOrientation('black')
        // }
      }
      if (userList.players.length === 2) {
        console.log("line 262");
        if (newSocket.id === userList.players[1].id) {
          setSelfColor(userList.players[1].color)
        }

        // setBlackPlayerName(userList.players[1].username)
        // if (userList.players[1].color === 'white') {
          // setOrientation('black')
        // }
      }
      // setSpectators(userList.spectators);
    });

    // io.to(roomNumber).emit('time update', rooms[roomNumber].timers);

    newSocket.on('time update', (timer)=>{
      console.log("Line 158 timer", timer);

      setTimer(timer)
    }) 

    // Forfeit
    newSocket.on('resignation', (resigningPlayer)=> {
      console.log("line 270 time out", resigningPlayer);

      setResult(resigningPlayer)

      if (resigningPlayer === "white") {
        setResult(RESULT.WHITE)
        // winner = "White"
      } else if (resigningPlayer === 'black'){
        setResult(RESULT.BLACK)
        // winner = "black"
      }

      setIsGameStarted(false)
      setIsModalOpen(true)
    })


      newSocket.on('drawOffered', (socketId) => {
        console.log("Offer event line 184");
        setIsMessageModalOpen(true)
      });

      newSocket.on('drawAccepted', () => {
          setIsGameStarted(false)
          //Show dialog and would relate to socket.io
          setResult("1/2-1/2")

          setIsModalOpen(true)
          setIsMessageModalOpen(false)
      })


    return () => {
      newSocket.off('moveMade');
      newSocket.disconnect();
    };
    
  }, [roomId]);

  const getUsernameFromState = () => {
    const locationState = location.state;
    console.log("line 391", locationState);
    //Cannot change from userName to playerName because it is tied to the state name and must follow what it is called.
    return locationState ? locationState.userName : '';
  };

  const getCurrentPlayerSocketId = (socketId) => {
    for (let i = 0; i < players.length; i++) {
      if (players[i].id === socketId) {
        return players[i]
      }
    }
  }

  return (
    <>

        <MessageModal isOpen={isMessageModalOpen} onClose={()=>setIsMessageModalOpen(false)}
          onOutcomeModalOpen={()=> {

            socket.emit('drawAccepted', roomId);

          
        }}> 
          {
          selfColor === 'white' ? 
          "Do you want to accept the draw offer from black player?":
          "Do you want to accept the draw offer from white player?"  
          }
        </MessageModal>

      <OutcomeModal isOpen={isModalOpen} result={result} /> 


      <div className="flex items-center h-[100vh]">
      <div className="w-[85%] min-w-[1300px] m-[0_auto] bg-[#5928ed] text-[#fff]">

        <div className="text-center text-4xl">
          In-Game Systen
        </div>

        <div className='flex bg-black text-white justify-around text-xl'>
        <div>
          Turn: {activePlayer.toUpperCase()}
        </div>
        <div>
          Halfmove: {halfMove}
        </div>
        <div>
          Fullmove: {fullMove}
        </div>
        <div>
          Room Info: {roomId}
        </div>

        </div>

        <div className="flex">
          <ChessboardGame 
            pawnPromotionChoice={pawnPromotionChoice}
            haveTwoPlayers={haveTwoPlayers}
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
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            setResult={setResult}
          />
          <Sideboard
          pawnPromotionChoice={pawnPromotionChoice}
          setPawnPromotionChoice={setPawnPromotionChoice}
          history={history} socket={socket} players={players} timer={timer} isSocketSpectator={isSocketSpectator} 
          roomId={roomId} spectators={spectators}/>

        </div>
      </div>
      </div>
    </>
  );
}
