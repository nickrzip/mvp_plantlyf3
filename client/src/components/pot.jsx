import React from 'react'
import Tombstone from './tombstone.jsx'

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
                <Tombstone currentPlant = {props.currentPlant}/>
            </div>
        )

    }
}

export default Pot;