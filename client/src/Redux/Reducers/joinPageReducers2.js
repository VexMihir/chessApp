import { GETROOMNUMBER2, initObj2, SENDJOINOFFER2 } from "../String/JoinRoomInit2";

export function joinRoomReducer2(state=initObj2, action) {
    switch (action.type) {
        case GETROOMNUMBER2: {
            return {
                ...state,
                roomNumber: action.payload.roomNo,
                userName: action.payload.userName
            }
        }

        case SENDJOINOFFER2: return state

        default: return state
    }
}