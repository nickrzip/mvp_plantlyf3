import React from 'react';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import ReactDOM from 'react-dom';
import Pot from './components/pot.jsx';
import SideNav from './components/sideNav.jsx'
import axios from 'axios';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentRepo: '',
            allRepos: '',
            plantIsDead: false,
            sideNavIsOpen: true
        }
    }

    addPlant(repoURL) {
      axios.post('/users', { 
        repoURL: repoURL
      }).catch((err) => {
          var error = err + '\nPlease enter a valid username'
          alert(error)
        });
    }

    toggleSideNav() {
        var next = this.state.sideNavIsOpen ? false : true;
        this.setState({
            sideNavIsOpen: next
        });
    }

    render () {

        let trigger = false;

        const sideNavState = (isTrue) => {
            if (isTrue) {
                trigger = isTrue;
                return (
                  <SideNav key = {'sideNav'} clickHandler = {() => {
                      this.toggleSideNav();
                  }}/>
                );
            } else {
                return <div></div>
            }
        }

      return (
          <div className = 'row-container background'>
            <CSSTransition
              in = {trigger}
              classNames = "sidenav"
              timeout = {1000}
              children = {sideNavState(this.state.sideNavIsOpen)}>
              {sideNavState(this.state.sideNavIsOpen)}
            </CSSTransition>
            <div className = 'plant-area'>
                <Pot clickHandler = {() => {
                    this.addPlant('www.aplant.com');
                }}/>
            </div>
          </div>
      )
    }

}

ReactDOM.render(<App/>, document.getElementById('app'))
