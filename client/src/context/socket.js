import React from 'react'
import io from "socket.io-client";

export const socket = io(process.env.REACT_APP_BACKEND_URL || 'http://localhost:5001')
export const SocketContext = React.createContext()