import React, { useState, useEffect } from "react";
import { BLACK_CHESS_PIECE, WHITE_CHESS_PIECE } from "../../constants/customChessPiece";

export default function Sideboard(props) {
  const socket = props.socket;
  const players = props.players;
  const history = props.history;
  const timer = props.timer;
  const roomId = props.roomId;
  const spectators = props.spectators;
  const pawnPromotionChoice = props.pawnPromotionChoice;
  const setPawnPromotionChoice = props.setPawnPromotionChoice;

  const isSocketSpectator = props.isSocketSpectator;

  const orientation = props.orientation;
  const setOrientation = props.setOrientation;

  const [self, setSelf] = useState();
  const [challenger, setChallenger] = useState();

  const [selfTimer, setSelfTimer] = useState();
  const [challengerTimer, setChallengerTimer] = useState();

  useEffect(() => {
    setSelf(players[0]);
    setChallenger(players[1]);
  }, [spectators]);

  useEffect(() => {
    if (
      socket !== undefined &&
      socket !== null &&
      players !== undefined &&
      players !== null
    ) {
      if (players.length === 2) {
        if (isSocketSpectator || socket.id === players[0].id) {
          setSelfTimer(timer[players[0].id]);
          setChallengerTimer(timer[players[1].id]);
        } else if (socket.id === players[1].id) {
          setSelfTimer(timer[players[1].id]);
          setChallengerTimer(timer[players[0].id]);
        }
      }
    }
  }, [timer]);

  useEffect(() => {
    if (
      socket !== undefined &&
      socket !== null &&
      players !== undefined &&
      players !== null
    ) {
      if (players.length === 1) {
        if (socket.id === players[0].id) {
          setSelf(players[0]);
          if (players[0].color.toLowerCase() === 'black') {
            setPawnPromotionChoice(BLACK_CHESS_PIECE.KNIGHT)
          }
        } 
      } else if (players.length === 2) {
        if (socket.id === players[0].id) {
          setSelf(players[0]);
          setChallenger(players[1]);
          if (players[0].color.toLowerCase() === 'black') {
            setPawnPromotionChoice(BLACK_CHESS_PIECE.KNIGHT)
          }
        } else if (socket.id === players[1].id) {
          setSelf(players[1]);
          setChallenger(players[0]);
          if (players[1].color.toLowerCase() === 'black') {
            setPawnPromotionChoice(BLACK_CHESS_PIECE.KNIGHT)
          }

        }
        
      }
    }
  }, [players]);

  return (
    <>
      {!isSocketSpectator ? (
        <div className="w-1/2 bg-custom-cream">
          <div className="w-full flex flex-col h-full justify-between">
            <div>
              <div className="text-yellow-400 text-3xl text-center bg-custom-black">
                Players Info
              </div>
              <div className="flex justify-around text-custom-black text-xl text-center font-bold">
                <div className="w-1/2 border border-black border-solid">
                  <div>Player1: (You)</div>
                  <div className="flex border-x-0 border-y border-y-black border-solid px-2">
                    <div>Name:</div>

                    <div className="text-center w-full">
                      {self !== undefined && self !== null
                        ? self.username
                        : "Waiting..."}
                    </div>
                  </div>
                  <div className="flex border-x-0 border-y border-y-black border-solid px-2">
                    <div>Color:</div>
                    <div className="text-center w-full">
                      {self !== undefined && self !== null
                        ? self.color
                        : "Waiting..."}
                    </div>
                  </div>
                  <div className="flex px-2">
                    <div>Timer:</div>
                    <div className="text-center w-full">{selfTimer}</div>
                  </div>
                </div>

                <div className="w-1/2 border border-black border-solid">
                  <div>Player2: (Challenger)</div>
                  <div className="flex border-x-0 border-y border-y-black border-solid px-2">
                    <div>Name:</div>
                    <div className="text-center w-full">
                      {challenger !== undefined && challenger !== null
                        ? challenger.username
                        : "Waiting..."}
                    </div>
                  </div>
                  <div className="flex border-x-0 border-y border-y-black border-solid px-2">
                    <div>Color:</div>
                    <div className="text-center w-full">
                      {challenger !== undefined && challenger !== null
                        ? challenger.color
                        : "Waiting..."}
                    </div>
                  </div>
                  <div className="flex px-2">
                    <div>Timer:</div>
                    <div className="text-center w-full">{challengerTimer}</div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="text-yellow-400 text-3xl text-center bg-custom-black">
                Spectators
              </div>
              <div className="h-16 overflow-y-scroll text-custom-black text-2xl grid grid-cols-[1fr_10fr_1fr_10fr]">
                {spectators
                  ? spectators.map((child, index) => {
                      return (
                        <>
                          <div className="mx-2">{index + 1}. </div>
                          <div className="text-center">{child.username}</div>
                        </>
                      );
                    })
                  : ""}
              </div>
            </div>
            <div className="text-center text-yellow-400 text-3xl bg-custom-black">
              Previous Moves
            </div>
            <div className="h-[4.8rem]">
              {history === undefined ? (
              <div
                //Source: https://stackoverflow.com/questions/72391045/what-do-the-parameters-in-tailwind-grid-cols-1fr-700px-2fr-do
                //Source: https://stackoverflow.com/questions/67242334/tailwind-css-how-to-make-a-grid-with-two-columns-where-the-1st-column-has-20
                className="overflow-y-scroll text-custom-black bg-custom-cream grid grid-cols-[1fr_6fr_6fr] text-2xl text-center"
              ></div>
              ) : (
              <div className="h-[4.8rem] overflow-y-scroll text-custom-black bg-custom-cream grid grid-cols-[1fr_6fr_6fr] text-2xl text-center">
                {history.map((child, index) => {
                  return (
                    <>
                      {index % 2 === 0 ? (
                        <>
                          <div className="h-[min-content]">
                            {index / 2 + 1}.
                          </div>{" "}
                          <div className="h-[min-content]">{child["san"]}</div>
                        </>
                      ) : (
                        <div className="h-[min-content]">{child["san"]}</div>
                      )}
                    </>
                  );
                })}
              </div>
              )}
            </div>
            <div>
              <div className="text-5xl bg-custom-cream text-red-700 font-black text-center">
                <div className="text-3xl text-yellow-400 text-center bg-custom-black">
                  Pawn Promotion Choice
                </div>
                {self !== undefined && self.color.toLowerCase() === "black" ? (
                  <>
                    <div>{pawnPromotionChoice}</div>
                    <div className="bg-custom-cream flex justify-around">
                      <button
                        className="text-2xl text-black font-bold bg-custom-black rounded-md"
                        onClick={() =>
                          setPawnPromotionChoice(BLACK_CHESS_PIECE.ROOK)
                        }
                      >
                        {BLACK_CHESS_PIECE.ROOK}
                      </button>
                      <button
                        className="text-2xl text-black font-bold bg-custom-black rounded-md"
                        onClick={() =>
                          setPawnPromotionChoice(BLACK_CHESS_PIECE.KNIGHT)
                        }
                      >
                        {BLACK_CHESS_PIECE.KNIGHT}
                      </button>
                      <button
                        className="text-2xl text-black font-bold bg-custom-black rounded-md"
                        onClick={() =>
                          setPawnPromotionChoice(BLACK_CHESS_PIECE.BISHOP)
                        }
                      >
                        {BLACK_CHESS_PIECE.BISHOP}
                      </button>
                      <button
                        className="text-2xl text-black font-bold bg-custom-black rounded-md"
                        onClick={() =>
                          setPawnPromotionChoice(BLACK_CHESS_PIECE.QUEEN)
                        }
                      >
                        {BLACK_CHESS_PIECE.QUEEN}
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div>{pawnPromotionChoice}</div>
                    <div className="bg-custom-cream flex justify-around">
                      <button
                        className="text-2xl text-white font-bold bg-custom-black rounded-md"
                        onClick={() =>
                          setPawnPromotionChoice(WHITE_CHESS_PIECE.ROOK)
                        }
                      >
                        {WHITE_CHESS_PIECE.ROOK}
                      </button>
                      <button
                        className="text-2xl text-white font-bold bg-custom-black rounded-md"
                        onClick={() =>
                          setPawnPromotionChoice(WHITE_CHESS_PIECE.KNIGHT)
                        }
                      >
                        {WHITE_CHESS_PIECE.KNIGHT}
                      </button>
                      <button
                        className="text-2xl text-white font-bold bg-custom-black rounded-md"
                        onClick={() =>
                          setPawnPromotionChoice(WHITE_CHESS_PIECE.BISHOP)
                        }
                      >
                        {WHITE_CHESS_PIECE.BISHOP}
                      </button>
                      <button
                        className="text-2xl text-white font-bold bg-custom-black rounded-md"
                        onClick={() =>
                          setPawnPromotionChoice(WHITE_CHESS_PIECE.QUEEN)
                        }
                      >
                        {WHITE_CHESS_PIECE.QUEEN}
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="text-3xl text-yellow-400 text-center bg-custom-black">
              Game Result Actions
            </div>
            <div className="flex justify-around">
              <button
                className="bg-custom-black hover:bg-yellow-300 text-yellow-400 font-bold hover:text-custom-black rounded-md text-2xl w-1/2 p-1"
                onClick={() => socket.emit("resignation", roomId)}
              >
                Forfeit
              </button>
              <button
                className="bg-custom-black hover:bg-yellow-300 text-yellow-400 font-bold hover:text-custom-black rounded-md text-2xl w-1/2 p-1"
                onClick={() => socket.emit("drawOffered", roomId)}
              >
                Offer Draw
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-1/2 bg-custom-cream">
          <div className="w-full flex flex-col h-full justify-between items-stretch">
            <div>
              <div className="text-center text-3xl text-yellow-400 font-bold bg-custom-black">
                Players Info
              </div>
              <div className="flex justify-around text-black text-xl text-center font-bold">
                <div className="w-1/2 border border-black border-solid">
                  <div>Player1 </div>
                  <div className="flex border-x-0 border-y border-y-black border-solid px-2">
                    <div>Name:</div>

                    <div className="text-center w-full">
                      {self !== undefined && self !== null
                        ? self.username
                        : "Waiting..."}
                    </div>
                  </div>
                  <div className="flex border-x-0 border-y border-y-black border-solid px-2">
                    <div>Color:</div>
                    <div className="text-center w-full">
                      {self !== undefined && self !== null
                        ? self.color
                        : "Waiting..."}
                    </div>
                  </div>
                  <div className="flex px-2">
                    <div>Timer:</div>
                    <div className="text-center w-full">{selfTimer}</div>
                  </div>
                </div>

                <div className="w-1/2 border border-black border-solid">
                  <div>Player2 </div>
                  <div className="flex border-x-0 border-y border-y-black border-solid px-2">
                    <div>Name:</div>
                    <div className="text-center w-full">
                      {challenger !== undefined && challenger !== null
                        ? challenger.username
                        : "Waiting..."}
                    </div>
                  </div>
                  <div className="flex border-x-0 border-y border-y-black border-solid px-2">
                    <div>Color:</div>
                    <div className="text-center w-full">
                      {challenger !== undefined && challenger !== null
                        ? challenger.color
                        : "Waiting..."}
                    </div>
                  </div>
                  <div className="flex px-2">
                    <div>Timer:</div>
                    <div className="text-center w-full">{challengerTimer}</div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="text-center text-3xl text-yellow-400 font-bold bg-custom-black">
                Spectators
              </div>
              <div className="h-16 overflow-y-scroll text-custom-black text-2xl grid grid-cols-[1fr_10fr_1fr_10fr]">
                {spectators
                  ? spectators.map((child, index) => {
                      return (
                        <>
                          <div className="mx-2">{index + 1}. </div>
                          {child.id === socket.id ? (
                            <div className="text-center">
                              {child.username} (You)
                            </div>
                          ) : (
                            <div className="text-center">{child.username}</div>
                          )}
                        </>
                      );
                    })
                  : ""}
              </div>
            </div>
            <div className="text-center text-3xl text-yellow-400 font-bold bg-custom-black">
              Previous Moves
            </div>
            <div className="h-[11.65rem]">
            {history === undefined ? (
              <div
                //Source: https://stackoverflow.com/questions/72391045/what-do-the-parameters-in-tailwind-grid-cols-1fr-700px-2fr-do
                //Source: https://stackoverflow.com/questions/67242334/tailwind-css-how-to-make-a-grid-with-two-columns-where-the-1st-column-has-20
                className="overflow-y-scroll text-custom-black bg-custom-cream grid grid-cols-[1fr_6fr_6fr] text-2xl text-center"
              ></div>
              ) : (
              <div className="h-[11.65rem] overflow-y-scroll text-custom-black bg-custom-cream grid grid-cols-[1fr_6fr_6fr] text-2xl text-center">
                {history.map((child, index) => {
                  return (
                    <>
                      {index % 2 === 0 ? (
                        <>
                          <div className="h-[min-content]">
                            {index / 2 + 1}.
                          </div>{" "}
                          <div className="h-[min-content]">{child["san"]}</div>
                        </>
                      ) : (
                        <div className="h-[min-content]">{child["san"]}</div>
                      )}
                    </>
                  );
                })}
              </div>
              )}
            </div>
            <div className="text-center text-3xl text-yellow-400 font-bold bg-custom-black">
              Orientation
            </div>
            <div>
              {/* Source: https://chat.openai.com/share/74c6ed80-6104-4787-903d-ab0de1dd408e */}
              <button
                className={
                  orientation === "white"
                    ? "font-bold bg-yellow-300 text-custom-black rounded-md text-2xl w-1/2 p-1"
                    : "bg-custom-black text-yellow-400 font-bold hover:bg-yellow-300 hover:text-custom-black rounded-md text-2xl w-1/2 p-1"
                }
                onClick={() => setOrientation("white")}
              >
                White
              </button>
              {/* Source: https://chat.openai.com/share/74c6ed80-6104-4787-903d-ab0de1dd408e */}
              <button
                className={
                  orientation === "black"
                    ? "font-bold bg-yellow-300 text-custom-black rounded-md text-2xl w-1/2 p-1"
                    : "bg-custom-black text-yellow-400 font-bold hover:bg-yellow-300 hover:text-custom-black rounded-md text-2xl w-1/2 p-1"
                }
                onClick={() => setOrientation("black")}
              >
                Black
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
