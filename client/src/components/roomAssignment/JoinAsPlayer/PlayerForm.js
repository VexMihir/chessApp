import {FindRoomForm} from "./FindRoom/FindRoomForm";
import {JoinRoomForm} from "./CreateRoom/JoinRoomForm";

export function PlayerForm(){

    return (
        <div className="flex items-end justify-center h-screen">
        <div className={"w-[50%] " +
            "flex flex-cols justify-start gap-x-[5%] rounded-xl border border-custom-black border-100"
        }>
            <JoinRoomForm />
            <FindRoomForm />
        </div>
        </div>
    )
}