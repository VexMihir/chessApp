import axios from "axios";
import { setRoomNumber } from "../Action/roomActions";

export function getRoomNumberAsync(userName) {
    return async (dispatch, getState) => {
            try {
                const response = await axios.get((process.env.REACT_APP_BACKEND_URL || 'http://localhost:5001') + '/createGame');
                if (response.data && response.data.roomNumber) {
                    // setERROR(false)
                    dispatch(setRoomNumber({
                        roomNumber: response.data.roomNumber,
                        // userName: userName
                    }))
                // } else {
                    // dispatch(setERROR(true))
                }

                } catch (error) {
            console.log(error.message)
        }
    }
}
