import { ADD_SAN } from "../String/SAN_INITIALSTATE"

export function addSAN(payload) {
    return {
        type: ADD_SAN,
        payload: payload
    }
}