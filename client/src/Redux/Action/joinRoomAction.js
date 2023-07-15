import {GETROOMNUMBER} from "../String/JoinRoomInit";

export function setRoomNo(payload) {
    return {
        type: GETROOMNUMBER,
        payload: payload
    }
}
