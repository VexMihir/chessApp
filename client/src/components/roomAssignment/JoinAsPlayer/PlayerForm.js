import {FindRoomForm} from "./FindRoom/FindRoomForm";
import {JoinRoomForm} from "./CreateRoom/JoinRoomForm";
/**
 * PlayerForm includes:
 * 1. Join Room Form
 *
 * The Join Room Form allows users to create a new room using their desired user name. Upon successful creation, the
 * user is directed to the waiting page with the generated room number.
 *
 * 2. Find Room Form
 *
 * The Find Room Form allows users to join an existing room as a player by entering a room number. If the room exists
 * and has available slots, the user is directed to the waiting page with the entered room number.
 *
 */
export function PlayerForm(){

    return (
        <div className={"w-[60%] h-[100%] m-auto " +
            "flex flex-cols justify-center item-center gap-x-[5%]  "
        }>
            <JoinRoomForm />
            <FindRoomForm />
        </div>
    )
}