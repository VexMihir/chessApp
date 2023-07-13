import {ENDINGPOINT, INDIPIECEUPDATE, LOADGAME, PAUSEPREMOVELIST, STARTINGPOINT} from "../String/prevGameViewInit";
export function indiPieceUpdate(payload) {
    return {
        type: INDIPIECEUPDATE,
        payload: payload
    }
}
//add comment
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

export function pauseMoveList(payload) {
    return {
        type: PAUSEPREMOVELIST,
        payload: payload
    }
}

export function loadGameDB(payload) {
    return {
        type: LOADGAME,
        payload: payload
    }
}