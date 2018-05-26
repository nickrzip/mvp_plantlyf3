import React from 'react'

const Tombstone = (props) => {
    if (props.currentPlant) {
        return (
            <div className = 'tombstone'>
                {props.currentPlant.name + '\n' + '\n'}
                {props.currentPlant.created_at.substring(0,10)} to {props.currentPlant.updated_at.substring(0,10)}
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