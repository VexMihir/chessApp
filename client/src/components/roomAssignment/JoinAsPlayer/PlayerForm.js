import {FindRoomForm} from "./FindRoom/FindRoomForm";
import {JoinRoomForm} from "./CreateRoom/JoinRoomForm";

export function PlayerForm() {
    return (
        <div className={"grid grid-cols-2"}>
            <JoinRoomForm />
            <FindRoomForm />
        </div>
    )
}