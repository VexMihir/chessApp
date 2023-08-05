import {GETROOMNUMBER, initObj} from "../String/JoinRoomInit";

export function joinRoomReducer(state=initObj, action) {
    switch (action.type) {
        case GETROOMNUMBER: {
            return {
                ...state,
                roomNumber: action.payload.roomNo,
                userName: action.payload.userName
            }
        }

        default: return state
    }
}