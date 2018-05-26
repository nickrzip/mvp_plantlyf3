import React from 'react'
import Axios from 'axios';
import { resolve } from 'url';

class Onboarding extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            userSearchTerm: '',
            step1: true,
            step2: false,
            error: {false: ''},
            userRepos: [],
            seedsToPlant : {}
        }
    }

    onChange(e) {
        this.setState({
            userSearchTerm: e.target.value
        });
    }

    userNotFound() {
        console.log('try again with another user');
    }

    handleStep1Submit(event) {
        event.preventDefault();
        Axios.post('/users', {
          userName: this.state.userSearchTerm
        }).then((res) => {
          this.switchBetweenStep1and2();
          this.setState ({
            userRepos: res.data,
          });
        }).catch((err) => {
          this.userNotFound();
        });
    }

    handleStep2Submit(event) {
      event.preventDefault();
      var repos = [];
      for (let seed in this.state.seedsToPlant) {
        if(this.state.seedsToPlant[seed]) {
           repos = repos.concat(this.state.userRepos.filter((repo)=> {
             return repo.name === seed;
           }));
        }
      }
      this.props.plantSeeds(repos);
    }

    handleStep1InputChange(event) {
      var selectedIndex = event.target.selectedIndex;
      this.props.setWateringFrequency(selectedIndex);
    }

    handleStep2InputChange(event) {
      const checked = event.target.checked;
      const name = event.target.name;
      this.setState({
          seedsToPlant : Object.assign(this.state.seedsToPlant, {[name]:checked})
      });
    }

    switchBetweenStep1and2 () {
      if (this.state.step1) {
        this.setState({
          step1: false,
          step2: true
        });
      } else {
        this.setState({
            step1: true,
            step2: false
        });
      }
    }

    render() {
        if (this.props.onboardingUser) {
            if (this.state.step1) {
                return (
                <div className = 'form form-group'>
                    <form onSubmit = { (event) => this.handleStep1Submit(event) }>
                        <input name = "githubUser" value = {this.state.userSearchTerm} onChange={(e) => {this.onChange(e)} }></input>
                        <button type = "submit">Search User</button>
                        <div className = "frequency"> How frequently does your plant need to be watered? </div>
                        <div className = "frequency">
                            <i className = 'fa fa-tint water'/>
                            <select onChange = {((event) => this.handleStep1InputChange(event))}>
                                <option value = "Default">Default - 30 Seconds</option>
                                <option value = "5 Seconds">5 Seconds</option>
                                <option value = "1 Minute">1 Minute</option>
                                <option value = "30 Minutes">30 Minutes</option>
                                <option value = "1 Hour">1 Hour</option>
                                <option value = "3 Hours">3 Hours</option>
                                <option value = "10 Years">10 Years</option>
                            </select>
                        </div>
                    </form>
                </div>
                )
            } else if (this.state.step2) {
                return (
                <div className = 'form form-group'>
                    <div className = "btn btn-secondary" onClick = {this.switchBetweenStep1and2}>Go Back</div>
                    <form onSubmit = { (userInput) => this.handleStep2Submit(userInput) }>
                        <div className = "form-check form-options">
                            {this.state.userRepos.map((userRepo, index) => {
                                return (
                                    <div key = {index}>
                                        <input className = "form-check-input" type = "checkbox" name = {userRepo.name} value = "repo" onChange = {((event) => this.handleStep2InputChange(event))} ></input>
                                        <label className = "form-check-label" htmlFor = {userRepo.name}>Plant a seed for {userRepo.name}</label>
                                    </div>
                                )
                            })}
                        </div>
                        <button className = "btn btn-success"type = "submit">Plant Seeds</button>
                    </form>
                </div>)
            } 
        } else {
            return <div></div>
        }
    }

}

export default Onboarding;