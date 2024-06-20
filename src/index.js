import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
// import App from './App';
// import './index.css'

import StarRating from './StarRating';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <StrictMode>
        {/*<App />*/}
        <StarRating 
        maxRating={5} 
        message={["Terrible", "Bad", "Okay", "Very Good", "Amazing"]}/>
        <StarRating 
        maxRating={10} 
        defaultRating={3}
        color='red' 
        size={24} 
        className="test"/>
    </StrictMode>
);   