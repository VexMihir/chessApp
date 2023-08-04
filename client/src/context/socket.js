// import socketio from 'socket.io-client'
import React from 'react'
import io from "socket.io-client";
// import {SOCKET_URL} from 'config'

// export const socket = io(process.env.REACT_APP_BACKEND_URL || 'http://localhost:5001' || 'https://chessbackend-evhq.onrender.com')
export const socket = io('https://chessbackend-evhq.onrender.com')
export const SocketContext = React.createContext()