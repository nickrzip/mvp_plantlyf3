import React from 'react';
import ReactDOM from 'react-dom';
import Pot from './components/pot.jsx';
import SideNav from './components/sideNav.jsx'
import Onboarding from './components/onboarding.jsx'
import Axios from 'axios';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            allRepos: '',
            plantIsDead: {},
            sideNavIsOpen: true,
            sideNavFlag: true,
            onboardingUser: true,
            seeds: [],
            seedsHist: [],
            currentPlant: '',
            wateringFrequency: ''
        }
    }

    setWateringFrequency (frequency) {
        var frequencies = [ 30*1000, 5*1000, 60*1000, 30*60*1000, 60*60*1000, 3*60*60*1000, 10*365*24*60*60*1000];
        this.setState({
            wateringFrequency: frequencies[frequency]
        });
    }

    componentDidMount() {

        setInterval(()=>{
            if (this.state.seeds.length > 0) {
                Axios.get('/hist').then((data) => {
                    this.setState({
                        seedsHist: data.data
                    })
                })
            }
        }, 5000);

        setInterval(() => {
            if(this.state.seedsHist.length !== 0) {
                for (let plant of this.state.seedsHist) {
                    var now = Date.now();
                    var newState;
                    if (now - Date.parse(plant.lastWatered) > this.state.wateringFrequency) {
                        newState = Object.assign({}, this.state.plantIsDead);
                        newState[plant.name] = true;
                        this.setState({
                            plantIsDead: newState
                        });
                    } else {
                        newState = Object.assign({}, this.state.plantIsDead);
                        newState[plant.name] = false;
                        this.setState({
                            plantIsDead: newState
                        });
                    }
                }
            }
        }, 1000)

    }

    //new Date(Date.parse("2013-05-29T17:35:15Z")-(5*60*1000))

    toggleSideNav() {
        var next = !this.state.sideNavIsOpen;
        this.setState({
            sideNavIsOpen: next
        }), setTimeout(() => {
            this.setState({
                sideNavFlag: !this.state.sideNavFlag
            });
        }, 500)
    }

    plantSeeds(names) {
        this.setState({
            seeds: names,
            onboardingUser: false
        })
        this.setState({
            plantIsDead: {}
        })
    }

    changePlant(plant) {
        var newCurrPlant = this.state.seeds.filter((seed) => {
            return seed.name === plant.name;
        })
        this.setState({
            currentPlant: plant
        })
    }

    render () {

      return (
          <div className = 'row-container background'>
            <SideNav sideNavIsOpen = {this.state.sideNavIsOpen} 
                     sideNavFlag = {this.state.sideNavFlag}
                     clickHandler = {() => {this.toggleSideNav()}}
                     seeds = {this.state.seeds}
                     changePlant = {(plant) => {
                         this.changePlant(plant);
                     }}/>
            <div className = 'plant-area'>
                <Onboarding onboardingUser = {this.state.onboardingUser}
                            plantSeeds = {(seeds) => {this.plantSeeds(seeds)}}
                            setWateringFrequency = {(frequency) => {this.setWateringFrequency(frequency)}}/>
                <Pot currentPlant = {this.state.currentPlant} plantIsDead = {this.state.plantIsDead}/>
            </div>
          </div>
      )
    }

}

ReactDOM.render(<App/>, document.getElementById('app'))
