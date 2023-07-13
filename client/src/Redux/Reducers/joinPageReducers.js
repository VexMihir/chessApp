import {GETROOMNUMBER, initObj, SENDJOINOFFER} from "../String/JoinRoomInit";

export function joinRoomReducer(state=initObj, action) {
    switch (action.type) {
        case GETROOMNUMBER: {
            return {
                ...state,
                roomNumber: action.payload.roomNo,
                userName: action.payload.userName
            }
        }

        case SENDJOINOFFER: return state

        default: return state
    }
}