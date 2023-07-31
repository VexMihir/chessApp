import { PrevMoveListPannel } from "./MainPanel/PrevMovePannel";
import {useDispatch, useSelector} from "react-redux";
import {PrevMovePlayButton} from "./MainPanel/Buttons/PrevMovePlayButton";
import {PrevMovePausetButton} from "./MainPanel/Buttons/PrevMovePauseButton";
import {PrevMoveStartButton} from "./MainPanel/Buttons/PrevMoveStartButton";
import {PrevMoveEndButton} from "./MainPanel/Buttons/PrevMoveEndButton";
import {PrevMovePrevButton} from "./MainPanel/Buttons/PrevMovePrevButtons";
import {PrevMoveNextButton} from "./MainPanel/Buttons/PrevMoveNextButton";
import {InfoPanel} from "./MainPanel/InfoPanel/InfoPanel";
import {getAnalysis} from "../../../Redux/Action/Analysis";
export function PrevMoveList() {
    const dispatch = useDispatch()
  const pgnObj = JSON.parse(useSelector(state=>state.PrevGameView.PGNOBJ));
  const LANMoveList = pgnObj.prevMoveListLAN;
  const infoObj = {
      playerOne: pgnObj.playerOne,
      playerTwo: pgnObj.playerTwo,
      date: pgnObj.date,
      numberOfMoves: LANMoveList.length - 1,
      result: pgnObj.result
  }

    return (
        <div className={"flex flex-col justify-items-center items-stretch rounded-[0.3rem] h-fit bg-[rgba(12,12,54,.63)] p-8 text-white"}>
            <PrevMoveListPannel
                prop={
                    {
                        LANMoveList: LANMoveList
                    }
                }
            />
            <InfoPanel prop={infoObj} />
            <div className={"m-[1rem_1rem_1rem_0rem] decoration-white [&>*]:m-[0.20rem_0.20rem] [&>*]:bg-transparent [&>*]:text-white [&>*]:text-xl [&>*]:p-4"} id={"ButtonPanel"}>
                <PrevMovePlayButton/>
                <PrevMovePausetButton/>
                <PrevMoveStartButton/>
                <PrevMoveEndButton/>
                <PrevMovePrevButton/>
                <PrevMoveNextButton/>
            </div>
        </div>
    );
}
