import React from 'react'
import io from "socket.io-client";

export const socket = io(process.env.REACT_APP_BACKEND_URL || 'http://localhost:5001')
// export const socket = io('http://localhost:5001')
// export const socket = io('https://chessbackend-evhq.onrender.com')
export const SocketContext = React.createContext()