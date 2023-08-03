import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Main() {
  return (
    <>
      <div className="flex flex-col">
        <div className="flex justify-center items-end text-6xl h-[49vh] w-[100%] mb-2 text-center text-black">
          Castle Conqure
        </div>

        <div className="flex items-start justify-center space-x-4 h-[49vh] text-center w-[100%]">
          <div className="h-1/4 w-1/4 flex flex-col justify-around p-2 bg-white text-black">
            Single Mode
          </div>
          <NavLink
            to={"login"}
            className="h-1/4 w-1/4 flex flex-col justify-around p-2 bg-white text-black"
          >
            Multiplayer Mode
          </NavLink>
        </div>
      </div>
    </>
  );
}
