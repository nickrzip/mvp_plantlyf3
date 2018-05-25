import React from 'react'

import Plant from './plant.jsx'

const Pot = (props) => {
    return (
        <div className = 'pot' onClick = {props.clickHandler}> 
            <Plant/>
            <span>This is a protopot</span>
        </div>
    );
}

export default Pot;