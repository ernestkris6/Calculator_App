import React, { StrictMode, useState } from 'react';
import ReactDOM from 'react-dom/client';
// import App from './App';
// import './index.css'

import StarRating from './StarRating';
import Rate from './TextExpander';
import TextExpander from './TextExpander';
const root = ReactDOM.createRoot(document.getElementById('root'));

// function Test(){

//     const [moviesRating, setMoviesRating] = useState(0);

//     return(
//         <div>
//        <StarRating color='blue' maxRating={10} onSetRating={setMoviesRating} />
//        <p>This movie has {moviesRating} rating</p>
//        </div>
//     )
// }

root.render(
    <StrictMode>
        {/* <App /> */}
        {/* <StarRating 
        maxRating={5} 
        message={["Terrible", "Bad", "Okay", "Very Good", "Amazing"]}
        />
        
        <StarRating 
        maxRating={10} 
        defaultRating={3}
        color='red' 
        size={24} 
        className="test"/>

        <Test />
        <Rate maxRating={5}/>  */}
        <TextExpander />
    </StrictMode>
);   