import axios from "axios";
import { setRoomNumber } from "../Action/roomActions";

export function getRoomNumberAsync(socketId) {
    return async (dispatch, getState) => {
            try {
                // const response = await axios.get((process.env.REACT_APP_BACKEND_URL || 'http://localhost:5001') + '/createGame');

                const response = await axios({
                    method: 'post',
                    url: (process.env.REACT_APP_BACKEND_URL || 'http://localhost:5001' || 'https://chessbackend-evhq.onrender.com') + '/createGame',
                    headers: { "Content-Type": "application/json" },
                    data: {
                        socketId: socketId
                    },
                })

                console.log("line 18");
                console.log(response);

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
