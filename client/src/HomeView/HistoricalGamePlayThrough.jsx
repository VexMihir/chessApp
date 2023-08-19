import React, { useState, useEffect } from 'react';
import Chessboard from 'chessboardjsx';
import { Chess } from 'chess.js';
import { games } from './HistoricalGames.js';

const HistoricalGamePlayThrough = () => {
    const [chess] = useState(new Chess());
    const [fen, setFen] = useState(chess.fen());
    const [gameIndex, setGameIndex] = useState(Math.floor(Math.random() * games.length));

    useEffect(() => {
        chess.loadPgn(games[gameIndex].pgn.join('\n')); 
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
                if (gameIndex < games.length - 1) {
                    setGameIndex((prevIndex) => (prevIndex + 1) % games.length);
                }
            }
        };

        const intervalId = setInterval(playMove, 1000);

        return () => clearInterval(intervalId); // Clear the interval on unmount or when the effect reruns
    }, [gameIndex]);

    return (
        <Chessboard
            width={400}
            position={fen}
        />
    );
};

export default HistoricalGamePlayThrough;
