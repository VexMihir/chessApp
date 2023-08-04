import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'


export default function Main() {
  const navigate = useNavigate()

  return (
    <>
      <div className="flex flex-col">
        <div className="flex justify-center items-end text-6xl h-[49vh] w-[100%] mb-2 text-center text-black">
          Castle Conqure
        </div>

        <div className="flex items-start justify-center space-x-4 h-[49vh] text-center w-[100%]">
          <div className="h-1/4 w-1/4 flex flex-col justify-around p-2 bg-white text-black cursor-pointer hover:bg-black hover:text-white">
            <div className='text-xl'>Single Mode</div>
            <div className='text-3xl'>Human vs AI</div>
          </div>

          <div
            // to={"login"}
            className="h-1/4 w-1/4 flex flex-col justify-around p-2 bg-white text-black cursor-pointer hover:bg-black hover:text-white"
            onClick={(e) => {
              navigate('/login')
            }}
          >
            <div className='text-xl'>Multiplayer Mode</div>
            <div className='text-3xl'>Human vs Human</div>

          </div>
        </div>
      </div>
    </>
  );
}
