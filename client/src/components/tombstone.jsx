import React from 'react'

const Tombstone = (props) => {
    if (props.currentPlant) {
        return (
            <div className = 'tombstone'>
                {props.currentPlant.name}
            </div>
        );
    } else {
        return (
            <div></div>
        )
    }

}

export default Tombstone;


//Cool things we could do with the available data
// Use anime js
// 