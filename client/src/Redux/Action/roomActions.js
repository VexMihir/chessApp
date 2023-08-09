import { GET_ROOM_NUM } from "../String/rooms";

export function setRoomNumber(payload) {
    return {
        type: GET_ROOM_NUM,
        payload: payload
    }
}
