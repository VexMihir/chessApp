import {ADD_PGN, ENDINGPOINT, INDIPIEECEUPDATE, LOADGAME, STARTINGPOINT} from '../String/PGN_INITIALSTATE'
export function addPGN(payload) {
    return {
        type: ADD_PGN,
        payload: payload
    }
}

export function indiPieceUpdate(payload) {
    return {
        type: INDIPIEECEUPDATE,
        payload: payload
    }
}
export function startingPointUpdate() {
    return {
        type: STARTINGPOINT,
    }
}
export function endingPointeUpdate() {
    return {
        type: ENDINGPOINT
    }
}
export function loadGameDB(payload) {
    return {
        type: LOADGAME,
        payload: payload
    }
}
