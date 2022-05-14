import React, {useRef}from 'react';

export const Test = React.memo((props) => {
    //const renders = useRef(0);
    console.log('renders: ');

    return <button onClick={props.increment}> Test</button>  // increnet 1 
});