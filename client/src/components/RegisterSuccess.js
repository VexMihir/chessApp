import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

export default function RegisterSuccess() {
    const navigate = useNavigate()
    return (
        <>
            <form className='flex justify-center items-center h-[100vh] w-full m-[auto] text-black text-center'>
                <div className='bg-white p-3'>
                    <div className='text-5xl mb-5'>Register Successfully</div>
                    <div className='flex mb-1'>
                        <p className='w-[600px] m-auto text-left text-3xl mr-3'>You successfully registered for a new username, you can click Confirm button to go back to login.</p>                        
                    </div>
                    <div className='mt-3'>
                        {/* Source: https://v1.tailwindcss.com/components/buttons */}
                        <div className='text-2xl bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-3 mx-2 border border-blue-500 hover:border-transparent rounded'
                            onClick={() => {
                                navigate('/login')
                            }}>
                                Confirm
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}