import {Chess} from 'chess.js'
import Chessboard from 'chessboardjsx'
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import React, {useState, useEffect} from 'react'
import { addFEN } from "../../Redux/Action/FEN_Actions";
import { addSAN } from '../../Redux/Action/SAN_Actions';
import OutcomeModal from '../portals/OutcomeModal';

import "./style.css"
import { RESULT } from '../inGameView/InGameView';
import { useLocation } from 'react-router-dom';
import { addPGN } from '../../Redux/Action/PGN_Actions';

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

const chess = new Chess();
let whiteTimerEvent = null;
let blackTimerEvent = null;

export default function ChessboardGame({isGameStarted, setIsGameStarted, isModalOpen, setIsModalOpen, setResult, activePlayer, setActivePlayer}) {
    const FENList = useSelector((storeState) => storeState.FENReducer.FEN)
    const SANList = useSelector((storeState) => storeState.SANReducer.SAN)
    const PGNList = useSelector((storeState) => storeState.PGNReducer.PGN)
    const dispatch = useDispatch()
    const location = useLocation();
    const blackPlayerName = location.state.blackPlayerName
    const whitePlayerName = location.state.whitePlayerName

    const [fen, setFen] = useState("start");
    const [history, setHistory] = useState([]);
    const [header, setHeader] = useState(chess.header("White", whitePlayerName, "Black", blackPlayerName));
    const [halfMove, setHalfMove] = useState(0);
    const [fullMove, setFullMove] = useState(chess.moveNumber());
    const [whitePlayerTimer, setWhitePlayerTimer] = useState(900);
    const [blackPlayerTimer, setBlackPlayerTimer] = useState(900);
    const [whitePawnPromotionChoice, setWhitePawnPromotionChoice] = useState(WHITE_CHESS_PIECE.QUEEN)
    const [blackPawnPromotionChoice, setBlackPawnPromotionChoice] = useState(BLACK_CHESS_PIECE.QUEEN)
    const [sqaureStyles, setSqaureStyles] = useState()



    function getTwoDimensionArray(FEN) {
      const fen = FEN
      const piecePlacementLocation = fen.split(" ")[0];
      const rows = piecePlacementLocation.split("/");

      const row1To8 = []
      for (let i = 0; i < rows.length; i++) {
        let rowContent = rows[i].split("")
        let row = []
        for (let j = 0; j < rowContent.length; j++) {
          if (rowContent[j] === "1" || rowContent[j] === "2" || rowContent[j] === "3" || rowContent[j] === "4" || rowContent[j] === "5" 
           || rowContent[j] === "6" || rowContent[j] === "7" || rowContent[j] === "8" || rowContent[j] === "9") {
            for (let k = 0; k < Number(rowContent[j]); k++) {
              row.push(" ")
            }
           } else {
            row.push(rowContent[j])
           }
        }
        row1To8.push(row)
      }
      return row1To8
    }

    function getBlackPieceLocations() {
      const rows = getTwoDimensionArray(chess.fen());

      let result = []
      const rowsNotation = [["a8", "b8", "c8", "d8", "e8", "f8", "g8", "h8"],
                            ["a7", "b7", "c7", "d7", "e7", "f7", "g7", "h7"],
                            ["a6", "b6", "c6", "d6", "e6", "f6", "g6", "h6"],
                            ["a5", "b5", "c5", "d5", "e5", "f5", "g5", "h5"],
                            ["a4", "b4", "c4", "d4", "e4", "f4", "g4", "h4"],
                            ["a3", "b3", "c3", "d3", "e3", "f3", "g3", "h3"],
                            ["a2", "b2", "c2", "d2", "e2", "f2", "g2", "h2"],
                            ["a1", "b1", "c1", "d1", "e1", "f1", "g1", "h1"]];
      for (let i = 0; i < rowsNotation.length; i++) {
        for (let j = 0; j < rowsNotation[i].length; j++) {
          if (rows[i][j] === 'r' || rows[i][j] === 'n' || rows[i][j] === 'b' || rows[i][j] === 'q' || rows[i][j] === 'k' || rows[i][j] === 'p') {
            result.push(rowsNotation[i][j])
          }
        }
      }

      return result;
    }

    function getWhitePieceLocations() {
      const rows = getTwoDimensionArray(chess.fen());

      let result = []
      const rowsNotation = [["a8", "b8", "c8", "d8", "e8", "f8", "g8", "h8"],
                            ["a7", "b7", "c7", "d7", "e7", "f7", "g7", "h7"],
                            ["a6", "b6", "c6", "d6", "e6", "f6", "g6", "h6"],
                            ["a5", "b5", "c5", "d5", "e5", "f5", "g5", "h5"],
                            ["a4", "b4", "c4", "d4", "e4", "f4", "g4", "h4"],
                            ["a3", "b3", "c3", "d3", "e3", "f3", "g3", "h3"],
                            ["a2", "b2", "c2", "d2", "e2", "f2", "g2", "h2"],
                            ["a1", "b1", "c1", "d1", "e1", "f1", "g1", "h1"]];
      for (let i = 0; i < rowsNotation.length; i++) {
        for (let j = 0; j < rowsNotation[i].length; j++) {
          if (rows[i][j] === 'R' || rows[i][j] === 'N' || rows[i][j] === 'B' || rows[i][j] === 'Q' || rows[i][j] === 'K' || rows[i][j] === 'P') {
            result.push(rowsNotation[i][j])
          }
        }
      }

      return result;
    }

    function onSquareClick(square) {
    }
    
    function onMouseOverSquare(square) {
      
      console.log("line 124", square);
      let moves = chess.moves({square: square, verbose: true});
  
      let validMoves = []
      
      for (let i = 0; i < moves.length; i++) {
        validMoves.push(moves[i]['to'])
      }
  
      console.log("line 137");
      console.log(validMoves);
  
      // Source: https://chat.openai.com/share/e9c789ed-ad8d-4843-9a37-51a772293ddc
      const styles = {}
      const self = String(square);
      if (validMoves.length > 0) {
        styles[self] = {backgroundColor: "#bbcb2b"}
      }
      for (let i = 0; i < validMoves.length; i++) {
        const property = String(validMoves[i])
        // Source: https://codesandbox.io/s/x332zqpkl4?from-embed=&file=/src/integrations/WithMoveValidation.js:1229-1284
        styles[property] = {background: "radial-gradient(circle, #d6d6bd 36%, transparent 40%)"}
      }
      
      setSqaureStyles(styles);


      // if (activePlayer === 'w') {

      //   const blackPieceLocations = getBlackPieceLocations()
      //   const whitePieceLocations = getWhitePieceLocations()
      //   // Source: https://chat.openai.com/share/e9c789ed-ad8d-4843-9a37-51a772293ddc
      //   const styles = {}

      //   for (let i = 0; i < blackPieceLocations.length; i++) {
      //     const property = String(blackPieceLocations[i])
      //     styles[property] = {cursor: 'not-allowed', backgroundColor: 'red'}
      //   }

      //   for (let i = 0; i < whitePieceLocations.length; i++) {
      //     const property = String(whitePieceLocations[i])
      //     //Source: https://developer.mozilla.org/en-US/docs/Web/CSS/cursor
      //     styles[property] = {cursor: 'grab', backgroundColor: 'blue'}
      //   }
      //   setSqaureStyles(styles);
      // } else {
      //   const blackPieceLocations = getBlackPieceLocations()
      //   const whitePieceLocations = getWhitePieceLocations()
      //   // Source: https://chat.openai.com/share/e9c789ed-ad8d-4843-9a37-51a772293ddc
      //   const styles = {}

      //   for (let i = 0; i < blackPieceLocations.length; i++) {
      //     const property = String(blackPieceLocations[i])
      //     styles[property] = {cursor: 'grab', backgroundColor: 'blue'}
      //   }

      //   for (let i = 0; i < whitePieceLocations.length; i++) {
      //     const property = String(whitePieceLocations[i])
      //     //Source: https://developer.mozilla.org/en-US/docs/Web/CSS/cursor
      //     styles[property] = {cursor: 'not-allowed', backgroundColor: 'red'}
      //   }
      //   setSqaureStyles(styles);
      // }
    }

    function allowDrag({piece, sourceSquare}) {
      console.log("line 53", piece, sourceSquare);
      if (activePlayer === 'w'){
        if (piece === 'bP' || piece === 'bR' || piece === 'bN' || 
            piece === 'bB' || piece === 'bQ' || piece === 'bK') {
              
              return false
            }
          } else if (activePlayer === 'b') {
            if (piece === 'wP' || piece === 'wR' || piece === 'wN' || 
            piece === 'wB' || piece === 'wQ' || piece === 'wK') {
          return false
        }
      }
      return true
    }

    function onDrop({sourceSquare, targetSquare}) {
      let move = null;
      let promotionChoice = 'q';
      if (chess.turn() === "w") {
        if(whitePawnPromotionChoice === WHITE_CHESS_PIECE.ROOK) {
          promotionChoice = 'r'
        } else if (whitePawnPromotionChoice === WHITE_CHESS_PIECE.KNIGHT) {
          promotionChoice = 'n'
        } else if (whitePawnPromotionChoice === WHITE_CHESS_PIECE.BISHOP) {
          promotionChoice = 'b'
        } else if (whitePawnPromotionChoice === WHITE_CHESS_PIECE.QUEEN) {
          promotionChoice = 'q'
        }
      } else if (chess.turn() === 'b') {
        if(blackPawnPromotionChoice === BLACK_CHESS_PIECE.ROOK) {
          promotionChoice = 'r'
        } else if (blackPawnPromotionChoice === BLACK_CHESS_PIECE.KNIGHT) {
          promotionChoice = 'n'
        } else if (blackPawnPromotionChoice === BLACK_CHESS_PIECE.BISHOP) {
          promotionChoice = 'b'
        } else if (blackPawnPromotionChoice === BLACK_CHESS_PIECE.QUEEN) {
          promotionChoice = 'q'
        }
      }
      try {
          move = chess.move({
          from: sourceSquare,
          to: targetSquare,
          promotion: promotionChoice
        })
      } catch(error) {
        console.log(error);
      }
  
      if (move === null) {
        return;
      }
      setFen(chess.fen());
      setHistory(chess.history({verbose: true}));

    }

    function onDragOverSquare(square) {
      if (!isModalOpen) {
        setIsGameStarted(true);
      }
    }

    useEffect(() => {
      console.log("FEN:", fen);
      console.log("History", history);
      console.log("SAN", SANList);
      console.log("header", header, chess.header());

      // Store the FEN in Redux
      if (isGameStarted) {
        dispatch(addFEN(chess.fen()));
        dispatch(addSAN(chess.history()));


        const pgn = {PGN: {
          uuid: "cb5518bd-5160-44ea-9367-649dd66f509c",
          history: chess.history({verbose: true}),
          player1: blackPlayerName,
          player2: whitePlayerName,
          date: new Date()
        }
      }


        // dispatch(addPGN( chess.pgn({maxWidth: 72})))

        dispatch(addPGN(pgn))
      }

      if(chess.isCheckmate()) {
        // show a winner modal
        console.log("line 273 ###");
        console.log(chess.pgn({maxWidth: 72}));
        console.log("line 275");
        console.log(chess.history({verbose: true}));

        if (chess.turn() === "w") {
          setResult(RESULT.BLACK)
        } else if (chess.turn()){
          setResult(RESULT.WHITE)
        }
        setIsGameStarted(false)
        setIsModalOpen(true)
        chess.reset()
      }

      if(chess.isStalemate()) {
        console.log("line 298---------");
        setResult(RESULT.DRAW);
        setIsGameStarted(false)
        setIsModalOpen(true)
      }



      setActivePlayer(chess.turn());
      setFullMove(chess.moveNumber());
      setHalfMove(chess.fen().split(" ")[4])
    }, [fen])

    useEffect(() => {
      if (isGameStarted) {
        if(blackPlayerTimer === 0) {
          setResult(RESULT.WHITE)
          setIsGameStarted(false)
          setIsModalOpen(true)
          clearTimeout(blackTimerEvent);
          clearTimeout(whiteTimerEvent);
        }
        
        if(whitePlayerTimer === 0) {
          setResult(RESULT.BLACK)
          setIsGameStarted(false)
          setIsModalOpen(true)
          clearTimeout(blackTimerEvent);
          clearTimeout(whiteTimerEvent);
        }
      }
      setTimeout(() => {
        if (isGameStarted) {
          if (chess.turn() === "w") {
            console.log("line 40");
            clearTimeout(blackTimerEvent);
            
            whiteTimerEvent = setWhitePlayerTimer(()=> {
              if (whitePlayerTimer>0) {
                return whitePlayerTimer - 1
              } else {
                return 0
              }});
          } else {
            console.log("line 53");
            clearTimeout(whiteTimerEvent)
            blackTimerEvent = setBlackPlayerTimer(()=> {
              if (blackPlayerTimer>0) {
                return blackPlayerTimer - 1
              } else {
                return 0
              }
            });
          }
        }
      }, 1000)
    }, [isGameStarted, whitePlayerTimer, blackPlayerTimer])
  
    return (
      <>
        
        <div className='chessboard__wrapper'>
          <div className='chessboard'>
          <div className='chessboard__information'>
            <div>
              Turn: {activePlayer.toUpperCase()}
            </div>
            <div>
              Halfmove: {halfMove}
            </div>
            <div>
              Fullmove: {fullMove}
            </div>
          </div>
          <div className='chessboard__player_info'>
            <div>Black Player: {blackPlayerName} - Timer: {blackPlayerTimer}s</div>
            <div>Current Pawn Promotion Choice: {blackPawnPromotionChoice}</div>
            <div>Please pick pawns promotion choice: {" "}
              <button onClick={() => setBlackPawnPromotionChoice(BLACK_CHESS_PIECE.ROOK)}>{BLACK_CHESS_PIECE.ROOK}</button>
              <button onClick={() => setBlackPawnPromotionChoice(BLACK_CHESS_PIECE.KNIGHT)}>{BLACK_CHESS_PIECE.KNIGHT}</button> 
              <button onClick={() => setBlackPawnPromotionChoice(BLACK_CHESS_PIECE.BISHOP)}>{BLACK_CHESS_PIECE.BISHOP}</button> 
              <button onClick={() => setBlackPawnPromotionChoice(BLACK_CHESS_PIECE.QUEEN)}>{BLACK_CHESS_PIECE.QUEEN}</button></div>
          </div>
          <div className='chessboard__main'>
            <Chessboard 
              position={fen}
              lightSquareStyle={{backgroundColor: '#eeeed2'}} 
              darkSquareStyle={{backgroundColor: '#769656'}} 
              width={500}
              draggable={true}
              onDrop={onDrop}
              onDragOverSquare={onDragOverSquare}
              squareStyles={sqaureStyles}
              onSquareClick={onSquareClick}
              // allowDrag={allowDrag}
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
          <div className='chessboard__player_info'>
            <div>White Player: {whitePlayerName} - Timer: {whitePlayerTimer}s</div>
            <div>Current Pawn Promotion Choice: {whitePawnPromotionChoice}</div>
            <div>Please pick pawns promottion choice: {" "}
              <button onClick={() => setWhitePawnPromotionChoice(WHITE_CHESS_PIECE.ROOK)}>{WHITE_CHESS_PIECE.ROOK}</button> 
              <button onClick={() => setWhitePawnPromotionChoice(WHITE_CHESS_PIECE.KNIGHT)}>{WHITE_CHESS_PIECE.KNIGHT}</button> 
              <button onClick={() => setWhitePawnPromotionChoice(WHITE_CHESS_PIECE.BISHOP)}>{WHITE_CHESS_PIECE.BISHOP}</button> 
              <button onClick={() => setWhitePawnPromotionChoice(WHITE_CHESS_PIECE.QUEEN)}>{WHITE_CHESS_PIECE.QUEEN}</button> </div>
          </div>
          </div>
        </div>
      </>
    )
}

