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
        type: ENDINGPOINT,
    }
}