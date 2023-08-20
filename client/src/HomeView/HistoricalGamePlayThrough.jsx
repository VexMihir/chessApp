import React, { useState, useEffect, useRef } from 'react';
import Chessboard from 'chessboardjsx';
import { Chess } from 'chess.js';
import { games } from './HistoricalGames.js';

const HistoricalGamePlayThrough = () => {
    const [chess] = useState(new Chess());
    const [fen, setFen] = useState(chess.fen());
    const [gameIndex, setGameIndex] = useState(Math.floor(Math.random() * games.length));
    const [visible, setVisible] = useState(true);
    // Check if this is the first time the component is being rendered
    const isFirstGameShown = useRef(true);

    const currentGame = games[gameIndex];
    const { white, black } = currentGame;

    useEffect(() => {

        if (isFirstGameShown.current) {
            console.log("first game")
            isFirstGameShown.current = false;
        } else {
            setTimeout(() => setVisible(true), 1000); // Delay to allow the fade-out transition to complete
        }

        chess.loadPgn(currentGame.pgn.join('\n'));
        const history = chess.history({ verbose: true });
        chess.reset();

        let moveIndex = 0;

        const playMove = () => {
            if (moveIndex < history.length) {
                chess.move(history[moveIndex].san);
                setFen(chess.fen());
                moveIndex += 1;
            } else {
                clearInterval(intervalId);
                let newGameIndex;
                if (gameIndex < games.length - 1) {
                    newGameIndex = gameIndex + 1;   
                } else {
                    newGameIndex = 0;
                }
                setVisible(false);
                setTimeout(() => setGameIndex(newGameIndex), 1000);
            }
        };

        const intervalId = setInterval(playMove, 1000);

        return () => clearInterval(intervalId);
    }, [gameIndex]);

    const renderInfo = (username) => (
        <div className="text-white font-bold py-2">{username}</div>
    );

    return (
        <div className={`flex flex-col items-center transition-opacity duration-1000 ${visible ? 'opacity-100' : 'opacity-0'}`}>
            {renderInfo(black)}
            <Chessboard
                width={400}
                position={fen}
            />
            {renderInfo(white)}
        </div>
    );
};

export default HistoricalGamePlayThrough;
