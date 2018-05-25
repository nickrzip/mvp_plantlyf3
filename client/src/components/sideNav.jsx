import React from 'react'

class SideNav extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {}
    }

    render () {
        return (<div onClick = {this.props.clickHandler}
                    className = 'side-nav'>Hey this is a side nav</div>);
    }
}

export default SideNav;