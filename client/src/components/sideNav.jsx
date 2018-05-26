import React from 'react'
import {CSSTransition, TransitionGroup} from 'react-transition-group';

class SideNav extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {}
    }

    render () {
        if (this.props.sideNavFlag) {
            return (<CSSTransition
                in = {this.props.sideNavIsOpen}
                classNames = "sidenav"
                timeout = {700}>
                <div className = 'side-nav'>
                    <div className = "side-nav-spacing btn btn-primary btn-plant" onClick = {this.props.clickHandler}>Hide Side Nav</div>
                    {this.props.seeds.map((seed, index) => {
                        return (
                            <div className = "side-nav-spacing btn btn-primary btn-plant" key = {index} onClick = {() => {
                                this.props.changePlant(seed)}
                            }>{seed.name}</div>
                        )
                    })}
                </div>
            </CSSTransition>)
        } else {
            return (<CSSTransition
                in = {!this.props.sideNavIsOpen}
                classNames = "sidenav"
                timeout = {700}>
                <div className = 'side-nav-button' onClick = {this.props.clickHandler}></div>
            </CSSTransition>)
        }
    }
}

export default SideNav;

// let trigger = false;

// const sideNavState = (isTrue) => {
//     if (isTrue) {
//         trigger = isTrue;
//         return (
//           <SideNav key = {'sideNav'} clickHandler = {() => {
//               this.toggleSideNav();
//           }}/>
//         );
//     } else {
//         return <div></div>
//     }
// }