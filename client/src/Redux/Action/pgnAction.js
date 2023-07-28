import { ADD_PGN } from "../String/pgn"

export function addPGN(payload) {
    return {
        type: ADD_PGN,
        payload: payload
    }
}