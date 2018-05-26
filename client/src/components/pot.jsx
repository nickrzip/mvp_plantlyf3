import React from 'react'

import Plant from './plant.jsx'

const Pot = (props) => {
    if (!props.plantIsDead[props.currentPlant.name]) {
        return (
            <div className = 'pot'> 
                <Plant currentPlant = {props.currentPlant}/>
            </div>
        );
    } else {
        return (
            <div className = 'pot'> 
            </div>
        )

    }
}

export default Pot;