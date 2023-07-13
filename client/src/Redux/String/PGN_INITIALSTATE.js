export const PGN_INITIALSTATE = {
    PGN: {
        uuid: "cb5518bd-5160-44ea-9367-649dd66f509c",
        history: [],
        player1: '',
        player2: '',
        date: ''
    }
}


// export const PGN_INITIALSTATE = {
//     PGNOBJ: JSON.stringify({
//         prevMoveListFEN: ["rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"],
//         prevMoveListLAN: []
//     }),
//     currIdx: 0
// }
export const ADD_PGN = 'ADD_PGN'
export const INDIPIEECEUPDATE = 'INDIPIECEUPDATE'
export const STARTINGPOINT = 'STARTINGPOINT'
export const ENDINGPOINT = 'ENDINGPOINT'
export const LOADGAME = 'LOADGAME'