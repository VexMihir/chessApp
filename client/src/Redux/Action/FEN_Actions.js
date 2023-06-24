import { ADD_FEN } from "../String/FEN_INITIALSTATE"

export function addFEN(payload) {
    return {
        type: ADD_FEN,
        payload: payload
    }
}