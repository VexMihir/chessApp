import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Login() {
    return (
        <>
            <form className='flex justify-center items-center h-[100vh] w-full m-[auto] text-black text-center'>
                <div className='bg-white p-3'>
                    <div className='text-5xl mb-5'>Login</div>
                    <div className='flex mb-1'>
                        <label className='w-36 text-3xl mr-3'>Username</label>
                        <input className="text-3xl mr-3" type='text' />
                    </div>
                    <div className='flex'>
                        <label className='w-36 text-3xl mr-3'>Password</label>
                        <input className="text-3xl mr-3" type='password' />
                    </div>
                    <div className='mt-3'>
                        {/* Source: https://v1.tailwindcss.com/components/buttons */}
                        <NavLink to={"/roomAssignment"} className='w-32 text-2xl bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-3 mx-2 border border-blue-500 hover:border-transparent rounded'>Login</NavLink>
                        <NavLink to={"/register"} className='w-32 text-2xl bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-3 mx-2 border border-blue-500 hover:border-transparent rounded'>Register</NavLink>
                    </div>
                </div>
            </form>
        </>
    )
}
