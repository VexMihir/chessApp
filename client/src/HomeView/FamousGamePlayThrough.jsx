import React, { useState, useEffect } from 'react';
import Chessboard from 'chessboardjsx';
import { Chess } from 'chess.js';

const FamousGamePlayThrough = () => {
    const [chess] = useState(new Chess())
    const [fen, setFen] = useState(chess.fen());

    const pgn = [
        '[Event "Casual Game"]',
        '[Site "Berlin GER"]',
        '[Date "1852.??.??"]',
        '[EventDate "?"]',
        '[Round "?"]',
        '[Result "1-0"]',
        '[White "Adolf Anderssen"]',
        '[Black "Jean Dufresne"]',
        '[ECO "C52"]',
        '[WhiteElo "?"]',
        '[BlackElo "?"]',
        '[PlyCount "47"]',
        '',
        '1.e4 e5 2.Nf3 Nc6 3.Bc4 Bc5 4.b4 Bxb4 5.c3 Ba5 6.d4 exd4 7.O-O',
        'd3 8.Qb3 Qf6 9.e5 Qg6 10.Re1 Nge7 11.Ba3 b5 12.Qxb5 Rb8 13.Qa4',
        'Bb6 14.Nbd2 Bb7 15.Ne4 Qf5 16.Bxd3 Qh5 17.Nf6+ gxf6 18.exf6',
        'Rg8 19.Rad1 Qxf3 20.Rxe7+ Nxe7 21.Qxd7+ Kxd7 22.Bf5+ Ke8',
        '23.Bd7+ Kf8 24.Bxe7# 1-0',
    ]

    useEffect(() => {
        chess.loadPgn(pgn.join('\n')); // Load the game from the provided PGN
        const history = chess.history({ verbose: true });
        chess.reset();

        let index = 0;

        const playMove = () => {
            if (index < history.length) {
                const currMove = history[index];
                console.log(currMove);
                index += 1;
                chess.move(currMove['san']);
                setFen(chess.fen());
            } else {
                clearInterval(intervalId);
            }
        };

        const intervalId = setInterval(playMove, 1000);

        return () => clearInterval(intervalId);
    }, [chess]);


    return (
        <Chessboard
            width={400}
            position={fen}
        />
    );
};

export default FamousGamePlayThrough;
