import {FindRoomForm} from "./FindRoom/FindRoomForm";
import {JoinRoomForm} from "./CreateRoom/JoinRoomForm";

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