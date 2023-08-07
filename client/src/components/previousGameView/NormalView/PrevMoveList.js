import { PrevMoveListPannel } from "./MainPanel/PrevMovePannel";
import {useSelector} from "react-redux";
import {PrevMovePlayButton} from "./MainPanel/Buttons/PrevMovePlayButton";
import {PrevMovePausetButton} from "./MainPanel/Buttons/PrevMovePauseButton";
import {PrevMoveStartButton} from "./MainPanel/Buttons/PrevMoveStartButton";
import {PrevMoveEndButton} from "./MainPanel/Buttons/PrevMoveEndButton";
import {PrevMovePrevButton} from "./MainPanel/Buttons/PrevMovePrevButtons";
import {PrevMoveNextButton} from "./MainPanel/Buttons/PrevMoveNextButton";
import {InfoPanel} from "./MainPanel/InfoPanel/InfoPanel";
/*
Normal view for the previous game view including:
1. play button,to load continuously moves from specific starting position till end.
2. pause button to pause at specific position.
3. start button, to load the first move
4. end button, to load the last move
5. next button, to load the next move from a specific position
6. info panel: names of two users, dates, number of moves (total from both players), date and result
7. Chessboard to show the visual all the functionalities
 */

export function PrevMoveList() {
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
        <div className={"flex flex-col h-[100%] "}>
            <div className={"overflow-scroll h-[70%] bg-custom-black mx-[1rem] mt-[1rem] rounded shadow shadow-white"}>
                <PrevMoveListPannel
                    prop={
                        {
                            LANMoveList: LANMoveList
                        }
                    }
                />
            </div>
            <div className={"h-[30%] m-[1rem] text-xs"}>
                <InfoPanel prop={
                    infoObj
                } />
            </div>
            <div className={"h-[10%] flex flex-row gap-x-[0.25rem] w-[100%] item-stretch justify-around text-white"}
                 id={"ButtonPanel"}>
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
