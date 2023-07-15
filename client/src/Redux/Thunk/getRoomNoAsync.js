import axios from "axios";
import {setRoomNo} from "../Action/joinRoomAction";

export function getRoomNumberAsync(userName) {
    return async (dispatch, getState) => {
            try {
                const response = await axios.get('http://localhost:5001/createGame');
                if (response.data && response.data.roomNumber) {
                    dispatch(setRoomNo({
                        roomNo: response.data.roomNumber,
                        userName: userName
                    }))
                }

                } catch (error) {
            console.log(error.message)
        }
    }
}
