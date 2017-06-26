import React, { Component } from 'react';
import {Redirect} from 'react-router';
import ReactDOM from 'react-dom';
import axios from 'axios';

export default class MentorLogin extends Component {
  constructor(props){
    super(props)
    this.state={
      username: '',
      password: '',
      loggedIn: false
    }
  }
  usernameChange(event){
    this.setState({username: event.target.value});
  }
  passwordChange(event){
    this.setState({password: event.target.value});

  }
  mentorLogin(event){
    var that=this
    event.preventDefault()
    axios.post('http://api.lvh.me:9000/mentorlogin', {
      username: this.state.username,
      password: this.state.password
    })
    .then(function (response) {
      console.log(response);
      if (response.data.hasOwnProperty('username')){
        sessionStorage.setItem('loggedIn','true')
        sessionStorage.setItem('mentorid',response.data.id)
        that.setState({loggedIn: true})
      }
      else{
        alert("Login Failed! Check your username and password")
      }
    })
    .catch(function (error) {
      console.log(error);
    });


  }
  render() {
    return (

      <div className="App">
        {this.state.loggedIn===true ? <Redirect to="/" /> : null}
        <form onSubmit={this.mentorLogin.bind(this)}>
          <label>
            Username:
            <input type="text" value={this.state.username} onChange={this.usernameChange.bind(this)} />
          </label>
          <label>
            Password:
            <input type="password" value={this.state.password} onChange={this.passwordChange.bind(this)} />
          </label>
          <input type="submit" value="Login" />
        </form>
      </div>
    );
  }
}
