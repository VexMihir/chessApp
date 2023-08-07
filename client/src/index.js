import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import ChessApp from "./ChessApp.js"
import {mainStore} from "./Redux/Store/mainStore";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={mainStore}>
            <ChessApp />
        </Provider>
    </React.StrictMode>
);
reportWebVitals();
