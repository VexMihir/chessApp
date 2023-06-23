import {
    ENDINGPOINT,
    INDIPIECEUPDATE,
    LOADGAME,
    PAUSEPREMOVELIST,
    PGN_INITIALSTATE,
    STARTINGPOINT
} from "../String/PGN_INITIALSTATE";

export const pgnReducers = (state = PGN_INITIALSTATE, action) => {

    switch (action.type) {
        case INDIPIECEUPDATE: return {
            ...state,
            currIdx: state.currIdx + action.payload,
        }
        case STARTINGPOINT: return {
            ...state,
            currIdx: 1,
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
                PGNOBJ: action.payload
            }
        }
        default: return state
    }
}
