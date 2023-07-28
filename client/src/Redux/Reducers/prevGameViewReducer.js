import {
    ENDINGPOINT,
    INDIPIECEUPDATE,
    LOADGAME,
    PAUSEPREMOVELIST,
    PrevGameViewInit,
    STARTINGPOINT
} from "../String/prevGameViewInit";

export const prevGameViewReducer = (state = PrevGameViewInit, action) => { // should be called the previousMovesNavigatorReducer

    switch (action.type) {
        case INDIPIECEUPDATE: return {
            ...state,
            currIdx: state.currIdx + action.payload,
        }
        case STARTINGPOINT: return {
            ...state,
            currIdx: 0,
        }
        case ENDINGPOINT: {
            const PGNObj = JSON.parse(state.PGNOBJ)
            return {
                ...state,
                currIdx: PGNObj.prevMoveListFEN.length - 1,
            }
        }

        case PAUSEPREMOVELIST: {
            return {
                ...state,
                playStatus: action.payload,
            }
        }

        case LOADGAME: {
            return {
                ...state,
                currIdx: 0,
                playStatus: true,
                PGNOBJ: action.payload
            }
        }

        
        default: return state
    }
}
