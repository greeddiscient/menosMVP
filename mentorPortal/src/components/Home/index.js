import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Redirect} from 'react-router';

export default class Home extends Component {
  constructor(props){
    super(props)
    this.state={

    }
  }
  componentDidMount(){

    if (sessionStorage.getItem('loggedIn')===null){
      this.setState({loggedIn: false})
    }
    else{
      this.setState({loggedIn: true})
    }
  }
  render() {
    return (
      <div className="App">
        {this.state.loggedIn===false ? <Redirect to="/login" /> : null}
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}
