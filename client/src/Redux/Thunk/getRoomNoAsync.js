import axios from "axios";
import {setRoomNo} from "../Action/joinRoomAction";
import {setERROR} from "../Action/errorAction";

export function getRoomNumberAsync(userName, timeControl, timeIncrement) {
    return async (dispatch, getState) => {
            try {
                const response = await axios.get(('http://localhost:5001') + '/createGame',
                // const response = await axios.get((process.env.REACT_APP_BACKEND_URL || 'http://localhost:5001') + '/createGame',
                    {params:
                            {
                            timeControl,
                            timeIncrement
                            }
                        }
                    );
                if (response.data && response.data.roomNumber) {
                    setERROR(false)
                    dispatch(setRoomNo({
                        roomNo: response.data.roomNumber,
                        userName: userName
                    }))
                } else {
                    dispatch(setERROR(true))
                }

                } catch (error) {
            console.log(error.message)
        }
    }
}
