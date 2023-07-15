import {ADD_PGN, ENDINGPOINT, INDIPIEECEUPDATE, LOADGAME, PGN_INITIALSTATE, STARTINGPOINT} from '../String/PGN_INITIALSTATE'

export const pgnReducers = (state = PGN_INITIALSTATE, action) => {
    switch (action.type) {
        case ADD_PGN: {
            return action.payload
        }
        case INDIPIEECEUPDATE: return {
            ...state,
            currIdx: state.currIdx + action.payload
        }
        case STARTINGPOINT: return {
            ...state,
            currIdx: 0
        }
        case ENDINGPOINT: {
            const PGNObj = JSON.parse(state.PGNObj)
            return {
                ...state,
                currIdx: PGNObj.prevMoveList.length - 1
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