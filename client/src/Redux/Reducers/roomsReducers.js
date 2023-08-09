import { GET_ROOM_NUM, initObj } from "../String/rooms";
export function roomsReducers(state=initObj, action) {
    switch (action.type) {
        case GET_ROOM_NUM: {
            return {data: [...state.data, action.payload]}
        }


        default: return state
    }
}