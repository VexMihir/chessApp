import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

export default function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState('')

    async function handleSubmit(e) {
        e.preventDefault()

        //Source: Postman
        var requestOptions = {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                user: username,
                pwd: password,
            }),
            redirect: 'follow'
        };

        try {
            const response = await fetch("https://chessbackend-evhq.onrender.com/auth", requestOptions)
            // const response = await fetch('http://localhost:5001/auth' || "https://chessbackend-evhq.onrender.com/auth", requestOptions)
            // Source: https://chat.openai.com/share/7e0302c4-87a4-4a5a-9ae5-f74f4d358637
            if (!response.ok) {
                const errorMessage = await response.text()
                let isJSONObj = false
                if (errorMessage[0] === '{' || errorMessage[errorMessage.length - 1] === '}') {
                    isJSONObj = true
                }
                if (response.status === 409) {
                    if (isJSONObj) {
                        setErrorMessage(JSON.parse(errorMessage).message)
                    } else {
                        if (errorMessage === '')
                        setErrorMessage(errorMessage)
                    }
                    // Source: https://chat.openai.com/share/7e0302c4-87a4-4a5a-9ae5-f74f4d358637
                } else {
                    if (isJSONObj) {
                        setErrorMessage(JSON.parse(errorMessage).message)
                    } else {
                        setErrorMessage(errorMessage)
                    }
                }
            } else {
                navigate('/roomAssignment')
            }
        } catch (error) {
            console.error(error);
            // setErrorMessage(error)
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center h-[100vh] w-full m-[auto] text-black text-center'>
            <div className='text-5xl mb-2'>Multiplayer Mode</div>
                <div className='relative bg-white p-3'>
                    <div className='absolute right-[30px] cursor-pointer' onClick={() => {navigate('/')}}>❌</div>
                    <div className='text-4xl mb-5'>Login</div>
                    <div className='flex flex-col mb-1'>
                        <label className='text-left text-3xl mr-3'>Username</label>
                        <input className="text-3xl mr-3" type='text' 
                            onChange={(e) => setUsername(e.target.value)} 
                        />
                    </div>
                    <div className='flex flex-col'>
                        <label className='text-left text-3xl mr-3'>Password</label>
                        <input className="text-3xl mr-3" type='password'
                            onChange={(e) => setPassword(e.target.value)} 
                        />
                    </div>

                    {errorMessage !== "" ? 
                    <div className='text-[#ff4242] text-xl'>{errorMessage}</div>
                    :
                    <div className='text-xl'>&nbsp;</div>
                    }

                    <div className='mt-2'>
                        {/* Source: https://v1.tailwindcss.com/components/buttons */}
                        <button 
                            className='w-32 text-2xl bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-3 mx-2 border border-blue-500 hover:border-transparent rounded'
                            onSubmit={handleSubmit}>Login
                        </button>
                        <button className='w-32 text-2xl bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-3 mx-2 border border-blue-500 hover:border-transparent rounded' 
                                onClick={(e) => {
                                    e.preventDefault()
                                    navigate('/register')
                                }}>
                            Register
                        </button>
                    </div>
                </div>
            </form>
        </>
    )
}
