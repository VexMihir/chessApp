import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import ChessApp from "./ChessApp.js"
import {mainStore} from "./Redux/Store/mainStore";

// const socket = io('http://localhost:5001');

// socket.on('connect', function() {
//   console.log('Connected to server');
// });

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    //<React.StrictMode>
        <Provider store={mainStore}>
            <ChessApp />
        </Provider>
    //</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
