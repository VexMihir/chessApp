import {ENDINGPOINT, INDIPIECEUPDATE, LOADGAME, STARTINGPOINT} from "../String/PGN_INITIALSTATE";
export function indiPieceUpdate(payload) {
    return {
        type: INDIPIECEUPDATE,
        payload: payload
    }
}
export function startingPointUpdate() {
    return {
        type: STARTINGPOINT,
    }
}

export function endingPointUpdate() {
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