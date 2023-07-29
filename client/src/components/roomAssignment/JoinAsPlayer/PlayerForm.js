import {FindRoomForm} from "./FindRoom/FindRoomForm";
import {JoinRoomForm} from "./CreateRoom/JoinRoomForm";

export function PlayerForm(){ //{socket}) {
    // console.log("PlayerForm", socket);

    return (
        <div className={"shadow mt-[1rem] w-[95%]  " +
            "flex flex-cols justify-start gap-x-[5%]"
        }>
            <JoinRoomForm />
            <FindRoomForm /> 
            {/* socket={socket}/> */}

            {/* <JoinRoomForm socket={socket}/> */}
            {/* <FindRoomForm socket={socket}/> */}

        </div>
    )
}