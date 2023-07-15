import { ADD_Room_Num } from "../String/Room_num_INITIALSTATE"

export function addRoomNum(payload) {
    return {
        type: ADD_Room_Num,
        payload: payload
    }
}