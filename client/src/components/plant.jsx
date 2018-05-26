import React from 'react'

const Plant = (props) => {
    if (props.currentPlant) {
        return (
            <div className = 'plant'>
                <div className = 'smile'></div>
            </div>
        );
    } else {
        return (
            <div></div>
        )
    }

}

export default Plant;


//Cool things we could do with the available data
// Use anime js
// 