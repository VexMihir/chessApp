/**
 * Normal View - Previous Game
 *
 * The normal view for the previous game includes the following functionalities:
 * 1. Play button: Continuously plays moves from a specific starting position until the end.
 * 2. Pause button: Pauses the playback at a specific position.
 * 3. Start button: Loads the first move of the game.
 * 4. End button: Loads the last move of the game.
 * 5. Next button: Loads the next move from a specific position.
 * 6. Info panel: Displays the names of two users, dates, total number of moves from both players, date, and result of
 *    the game.
 * 7. Chessboard: Provides a visual representation of the game with all the above functionalities.
 *
 * Dependencies: PrevGameView
 */
import { PrevMoveListPannel } from "./MainPanel/PrevMovePannel";
import {useSelector} from "react-redux";
import {PrevMovePlayButton} from "./MainPanel/Buttons/PrevMovePlayButton";
import {PrevMovePausetButton} from "./MainPanel/Buttons/PrevMovePauseButton";
import {PrevMoveStartButton} from "./MainPanel/Buttons/PrevMoveStartButton";
import {PrevMoveEndButton} from "./MainPanel/Buttons/PrevMoveEndButton";
import {PrevMovePrevButton} from "./MainPanel/Buttons/PrevMovePrevButtons";
import {PrevMoveNextButton} from "./MainPanel/Buttons/PrevMoveNextButton";
import {InfoPanel} from "./MainPanel/InfoPanel/InfoPanel";

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
