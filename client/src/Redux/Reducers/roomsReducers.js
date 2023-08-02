// import {GETROOMNUMBER, initObj, SENDJOINOFFER} from "../String/JoinRoomInit";
import { GET_ROOM_NUM, initObj } from "../String/rooms";
export function roomsReducers(state=initObj, action) {
    switch (action.type) {
        case GET_ROOM_NUM: {
            // state.push(action.payload)

            // return state
            console.log("state", action.payload);
            return {data: [...state.data, action.payload]}
        }

        // case SENDJOINOFFER: return state

        default: return state
    }
}