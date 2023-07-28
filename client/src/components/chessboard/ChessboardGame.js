import {Chess} from 'chess.js'
import Chessboard from 'chessboardjsx'
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import React, {useState, useEffect} from 'react'


// import { addFEN } from "../../Redux/Action/FEN_Actions";
// import { addSAN } from '../../Redux/Action/SAN_Actions';
import OutcomeModal from '../portals/OutcomeModal';
import "./style.css"
import { BLACK_CHESS_PIECE, RESULT, WHITE_CHESS_PIECE } from '../inGameView/InGameView';
// import { addPGN } from '../../Redux/Action/PGN_Actions';

import MessageModal from '../portals/MessageModal';
import { addPGN } from '../../Redux/Action/pgnAction';
import { postPGNObj } from '../../Redux/Thunk/PGNDB';



//test
const chess = new Chess();

export default function ChessboardGame({haveTwoPlayers, setHistory, players, isSocketSpectator, setFullMove, setHalfMove, socket, roomId, isGameStarted, setIsGameStarted, isModalOpen, setIsModalOpen, setResult, activePlayer, setActivePlayer}) {
    // const FENList = useSelector((storeState) => storeState.FENReducer.FEN)
    // const SANList = useSelector((storeState) => storeState.SANReducer.SAN)
    // const PGNList = useSelector((storeState) => storeState.PGNReducer.PGN)
    
    //Source: https://chat.openai.com/share/046ed508-1fa5-43d7-94ac-87e8cb9675e4
    // const PGNList = useSelector((storeState) => JSON.parse(storeState.PGNReducer.PGNOBJ))
        
    const dispatch = useDispatch()


    // console.log("line30");
    // console.log(PGNList.prevMoveListFEN);

    // const [fen, setFen] = useState(PGNList.prevMoveListFEN[PGNList.prevMoveListFEN.length - 1]);
    const [fen, setFen] = useState("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")
    // const [history, setHistory] = useState([]);
    
    const [whitePlayerTimer, setWhitePlayerTimer] = useState(300);
    const [blackPlayerTimer, setBlackPlayerTimer] = useState(300);
    const [whitePawnPromotionChoice, setWhitePawnPromotionChoice] = useState(WHITE_CHESS_PIECE.QUEEN)
    const [blackPawnPromotionChoice, setBlackPawnPromotionChoice] = useState(BLACK_CHESS_PIECE.QUEEN)
    const [sqaureStyles, setSqaureStyles] = useState()

    const [legalPieceMoves, setLegalPieceMoves] = useState();

    const [isMessageModalOpen, setIsMessageModalOpen] = useState(false)

    const [orientation, setOrientation] = useState('white')

    function onMouseOverSquare(square) {
      // setMouseOverSquare(square);
      if (socket && !isSocketSpectator && isGameStarted) {
        // console.log("line47");
        socket.emit('valid move', roomId, square);
        
      }
    }

    function onSquareClick(square) {

      if (socket && !isSocketSpectator && players.length === 2){// && isGameStarted) { 
        let currentPlayer = null;

        for (let i = 0; i < players.length; i++) {
          if (socket.id === players[i].id) {
            currentPlayer = players[i]
            break
          }
        }
        console.log("line 97", players);
        console.log("line 90", currentPlayer);
        console.log("line 91", activePlayer);

        if (activePlayer === currentPlayer.color[0]) {

          const validMovesIncludingSelf = chess.moves({square: square, verbose: true})

        let validMovesExclusingSelf = []
        
        
        
        for (let i = 0; i < validMovesIncludingSelf.length; i++) {
          
          validMovesExclusingSelf.push(validMovesIncludingSelf[i]['to'])
        }
    
        // Source: https://chat.openai.com/share/e9c789ed-ad8d-4843-9a37-51a772293ddc
        const styles = {}
        const self = String(square);
        if (validMovesExclusingSelf.length > 0) {
          styles[self] = {backgroundColor: "#bbcb2b"}
        }
        for (let i = 0; i < validMovesExclusingSelf.length; i++) {
          const property = String(validMovesExclusingSelf[i])
          // Source: https://codesandbox.io/s/x332zqpkl4?from-embed=&file=/src/integrations/WithMoveValidation.js:1229-1284
          styles[property] = {background: "radial-gradient(circle, #d6d6bd 36%, transparent 40%)"}
        }

        console.log("line 114", validMovesExclusingSelf);
        
        setSqaureStyles(styles);
      }
    }

    }

    function onDrop({sourceSquare, targetSquare}) {
      
      if (socket && !isSocketSpectator && isGameStarted) {
        console.log("line 134");
        console.log(chess.history()); //
        
        const validMoves = chess.moves({square: sourceSquare, verbose: true})

        console.log("line 139", validMoves);

        let result = "";
        for (let i = 0; i < validMoves.length; i++) {
          if (validMoves[i]['to'] === targetSquare) {
            result = validMoves[i]['san']
            break;
          }
        }
        console.log("line 142");
        // socket.emit('move', roomId, result, sourceSquare);
        
        if (result !== "" && sourceSquare !== targetSquare) {
          // socket.emit('move', roomId, result)
          console.log("line 144");
          socket.emit('move', roomId, result);
          // socket.emit('history', roomId)
          // socket.emit('pgn', roomId)
        }
        setSqaureStyles('');
      }

      // let move = null;
      // let promotionChoice = 'q';
      // if (chess.turn() === "w") {
      //   if(whitePawnPromotionChoice === WHITE_CHESS_PIECE.ROOK) {
      //     promotionChoice = 'r'
      //   } else if (whitePawnPromotionChoice === WHITE_CHESS_PIECE.KNIGHT) {
      //     promotionChoice = 'n'
      //   } else if (whitePawnPromotionChoice === WHITE_CHESS_PIECE.BISHOP) {
      //     promotionChoice = 'b'
      //   } else if (whitePawnPromotionChoice === WHITE_CHESS_PIECE.QUEEN) {
      //     promotionChoice = 'q'
      //   }
      // } else if (chess.turn() === 'b') {
      //   if(blackPawnPromotionChoice === BLACK_CHESS_PIECE.ROOK) {
      //     promotionChoice = 'r'
      //   } else if (blackPawnPromotionChoice === BLACK_CHESS_PIECE.KNIGHT) {
      //     promotionChoice = 'n'
      //   } else if (blackPawnPromotionChoice === BLACK_CHESS_PIECE.BISHOP) {
      //     promotionChoice = 'b'
      //   } else if (blackPawnPromotionChoice === BLACK_CHESS_PIECE.QUEEN) {
      //     promotionChoice = 'q'
      //   }
      // }
      // try {
      //     move = chess.move({
      //     from: sourceSquare,
      //     to: targetSquare,
      //     // promotion: promotionChoice
      //   })
      // } catch(error) {
      //   console.log(error);
      // }
  
      // if (move === null) {
      //   return;
      // }
      // setFen(chess.fen());
      // setHistory(chess.history({verbose: true}));

    }

    // Not reasonable because second player has no idea how long the first player would get started by dragging over the square.  
    function onDragOverSquare(square) {
      if (socket && !isSocketSpectator && players.length === 2 && !isGameStarted) {
        if (whitePlayerTimer === 300 && blackPlayerTimer === 300 && !isModalOpen) {
         
          socket.emit('game start', roomId)
        }
      }
    }

    
    useEffect(() => {
      // const newSocket = io('http://localhost:5001');
      console.log("line 200");
      // setSocket(newSocket);
      // socket.emit('join room', roomId, getUsernameFromState());
      if (socket) {
      
      socket.on('moveMade', (move, fen, validMoves, history) => {
        console.log("line 202--------");
        console.log("line 159", move);
        console.log("validMoves", validMoves);
        console.log("history", history);

        // Here you can handle updates of the game state
        setFen(fen); // Update FEN state
        setHistory(history)
        chess.load(fen); // it reset the history.
        // dispatch(addFEN(fen));
        // dispatch(addFEN(fen))
        setActivePlayer(fen.split(" ")[1])
        setHalfMove(fen.split(" ")[4])
        setFullMove(fen.split(" ")[5]);
        // setLegalMoves(legalMoves);
      });

      socket.on('start game', (legalMoves) => {
        // setLegalMoves(legalMoves);
        console.log("line 234", legalMoves);
        console.log("players line215", players);

        setIsGameStarted(true);

        
      })
  
      socket.on('checkmate', (winningPlayerColor) => {

        // setIsCheckmate(isCheckmate)

        console.log("line 282", winningPlayerColor);

        setResult(winningPlayerColor)
        // let winner = "None"

        if (winningPlayerColor === "White") {
          setResult(RESULT.WHITE)
          // winner = "White"
        } else if (winningPlayerColor === 'Black'){
          setResult(RESULT.BLACK)
          // winner = "black"
        }

        console.log("players 235", players);

        // dispatch(postPGNObj({
        //   history: gameHistory,
        //   playerOne: players[0],
        //   playerTwo: players[1],
        //   date: new Date(),
        //   winner: winningPlayerColor
        // }))

        setIsGameStarted(false)
        setIsModalOpen(true)
        // chess.reset()
      })

      socket.on('game over draw', (drawReason) => {
        // drawReason displays the 50 rules???
        setResult(RESULT.DRAW)
        setIsGameStarted(false)
        setIsModalOpen(true)

      })

      // newSocket.on('history sent', (history) => {
      //   setHistory(history);
      //   // dispatch(addSAN(history));
      // })

      // // server should emit this event when there is 2 players and the game gets started.
      // newSocket.on('time update', (timerValues, userList) => {
      //   setWhitePlayerTimer(timerValues[userList[0].id])
      //   setBlackPlayerTimer(timerValues[userList[1].id])
  
      // });

      // newSocket.on('forfeit sent', (activePlayer) => {
      //   console.log("line 21...", activePlayer);
        
      //   setIsGameStarted(false)
      //   if (activePlayer === 'w') {
      //     setResult("0-1")
      //   } else if (activePlayer === 'b') {
      //     setResult("1-0")
      //   }
      //   setIsModalOpen(true)
        
      // });

      // newSocket.on('offer draw sent', (activePlayers, socketId) => {
      //   console.log("line 21...", activePlayers);
      //   console.log(socketId, activePlayers[0].id)
      //   console.log(socketId, activePlayers[1].id);
      //   // setIsGameStarted(false)
      //   // if (activePlayers === 'w') {
      //     if (socketId === activePlayers[0].id || socketId === activePlayers[1].id) {
      //       console.log("line 303");
      //       setIsMessageModalOpen(true)
      //     // }
      //     }
          
      // });

      // newSocket.on('draw sent', () => {
      //     setIsGameStarted(false)
      //     //Show dialog and would relate to socket.io
      //     setResult("1/2-1/2")

      //     setIsModalOpen(true)
      //     setIsMessageModalOpen(false)
      // })

      // newSocket.on('pgn sent', (history) => {
      //     const pgn = {PGN: {
      //       history: history, //chess.history({verbose: true}),
      //       player1: blackPlayerName,
      //       player2: whitePlayerName,
      //       date: new Date(),
      //       winner: true// if no winner, draw, unfinished
      //     }
      //   }
      //     // dispatch(addPGN(pgn))
      // })
  

    }
    }, [roomId, socket]);
    // [haveTwoPlayers]);
    // [roomId, socket, haveTwoPlayers]); 
    //[roomId, socket]);

    useEffect(() => {
      console.log("FEN:", fen);
      // console.log("History", history);
      // console.log("SAN", SANList);
      // console.log("header", header, chess.header());

      // Store the FEN in Redux
      if (isGameStarted) {
        // dispatch(addFEN(fen));
        // dispatch(addSAN(chess.history()));


      }


    }, [fen])

    useEffect(() => {
      if (isGameStarted) {
        if(blackPlayerTimer === 0) {
          // setResult(RESULT.WHITE)
          setIsGameStarted(false)
          setIsModalOpen(true)
        }
        
        if(whitePlayerTimer === 0) {
          // setResult(RESULT.BLACK)
          setIsGameStarted(false)
          setIsModalOpen(true)
        }
      }

    }, [isGameStarted, whitePlayerTimer, blackPlayerTimer])


  
    return (
      <>
        <MessageModal isOpen={isMessageModalOpen} onClose={()=>setIsMessageModalOpen(false)}
          onOutcomeModalOpen={()=> {

            socket.emit('draw', roomId);

          
        }}> 
          {activePlayer === "w"? 
          "Do you want to accept the draw offer from white player?" : 
          "Do you want to accept the draw offer from black player?"
          }
        </MessageModal>
        <div className='chessboard__wrapper'>
          <div className='chessboard'>


          <div className='chessboard__main'>
            <Chessboard 
              position={fen.split(" ")[0]}
              orientation={orientation}
              lightSquareStyle={{backgroundColor: '#eeeed2'}} 
              darkSquareStyle={{backgroundColor: '#769656'}} 
              width={700}
              draggable={true}
              onDrop={onDrop}
              onDragOverSquare={onDragOverSquare}
              squareStyles={sqaureStyles}
              // onPieceClick={onPieceClick}
              onSquareClick={onSquareClick}
              onMouseOverSquare={onMouseOverSquare}
              //Source: https://codesandbox.io/s/21r26yw13j?from-embed=&file=/src/integrations/CustomBoard.js
              pieces={{
                wK: () => (
                  <div style={{
                    display: 'flex',
                    height: '100%',
                    width: '100%',
                    alignItems: 'center',
                    fontSize: 'xxx-large'
                  }}>{WHITE_CHESS_PIECE.KING}</div>
                ),
                wR: () => (
                  <div style={{
                    display: 'flex',
                    height: '100%',
                    width: '100%',
                    alignItems: 'center',
                    fontSize: 'xxx-large'
                  }}>{WHITE_CHESS_PIECE.ROOK}</div>
                ),
                wN: () => (
                  <div style={{
                    display: 'flex',
                    height: '100%',
                    width: '100%',
                    alignItems: 'center',
                    fontSize: 'xxx-large'
                  }}>{WHITE_CHESS_PIECE.KNIGHT}</div>
                ),
                wB: () => (
                  <div style={{
                    display: 'flex',
                    height: '100%',
                    width: '100%',
                    alignItems: 'center',
                    fontSize: 'xxx-large'
                  }}>{WHITE_CHESS_PIECE.BISHOP}</div>
                ),
                wQ: () => (
                  <div style={{
                    display: 'flex',
                    height: '100%',
                    width: '100%',
                    alignItems: 'center',
                    fontSize: 'xxx-large'
                  }}>{WHITE_CHESS_PIECE.QUEEN}</div>
                ),
                wP: () => (
                  <div style={{
                    display: 'flex',
                    height: '100%',
                    width: '100%',
                    alignItems: 'center',
                    fontSize: 'xxx-large'
                  }}>{WHITE_CHESS_PIECE.PAWN}</div>
                ),
                bK: () => (
                  <div style={{
                    display: 'flex',
                    height: '100%',
                    width: '100%',
                    alignItems: 'center',
                    fontSize: 'xxx-large'
                  }}>{BLACK_CHESS_PIECE.KING}</div>
                ),
                bR: () => (
                  <div style={{
                    display: 'flex',
                    height: '100%',
                    width: '100%',
                    alignItems: 'center',
                    fontSize: 'xxx-large'
                  }}>{BLACK_CHESS_PIECE.ROOK}</div>
                ),
                bN: () => (
                  <div style={{
                    display: 'flex',
                    height: '100%',
                    width: '100%',
                    alignItems: 'center',
                    fontSize: 'xxx-large'
                  }}>{BLACK_CHESS_PIECE.KNIGHT}</div>
                ),
                bB: () => (
                  <div style={{
                    display: 'flex',
                    height: '100%',
                    width: '100%',
                    alignItems: 'center',
                    fontSize: 'xxx-large'
                  }}>{BLACK_CHESS_PIECE.BISHOP}</div>
                ),
                bQ: () => (
                  <div style={{
                    display: 'flex',
                    height: '100%',
                    width: '100%',
                    alignItems: 'center',
                    fontSize: 'xxx-large'
                  }}>{BLACK_CHESS_PIECE.QUEEN}</div>
                ),
                bP: () => (
                  <div style={{
                    display: 'flex',
                    height: '100%',
                    width: '100%',
                    alignItems: 'center',
                    fontSize: 'xxx-large'
                  }}>{BLACK_CHESS_PIECE.PAWN}</div>
                )
              }}
            />
          </div>

          </div>
        </div>
      </>
    )
}

