import React, { Component } from 'react';
import MentorPreview from '../MentorPreview';
import mentors from '../../data/mentors';
import NavBar from'../NavBar';
import {Link} from 'react-router-dom'
import {LinkContainer} from 'react-router-bootstrap'
import './index.css';
import autobind from 'autobind-decorator'
import axios from 'axios'
var querystring = require('querystring');

var splashMentors= [mentors[0],mentors[1],mentors[2]]

class Home extends Component {
  constructor(props){
    super(props)
    this.state={

    }
    localStorage.setItem('init', 'hello')
  }
  lilogin(){
    window.IN.UI.Authorize().params({"scope":["r_basicprofile", "r_emailaddress"]}).place();
    window.IN.Event.on(window.IN, 'auth', this.getProfileData.bind(this));
  }
  getProfileData(){
    var that=this
    window.IN.API.Profile("me").fields("id,firstName,lastName,email-address,picture-urls::(original),public-profile-url,location:(name)").result(function (me) {
        var profile = me.values[0];
        var id = profile.id;
        var firstName = profile.firstName;
        var lastName = profile.lastName;
        var emailAddress = profile.emailAddress;
        var pictureUrl = profile.pictureUrls.values[0];
        var profileUrl = profile.publicProfileUrl;
        var country = profile.location.name;
        localStorage.setItem('firstName', firstName)
        console.log('saved to localstorage during get profile', localStorage.getItem('firstName'))
        that.setState({
          profile: profile,
          firstName: firstName,
          lastName: lastName,
          emailAddress: emailAddress,
          pictureUrl: pictureUrl,
          profileUrl: profileUrl
        })
    })
    console.log("testwindow",window.profile)
  }

  getState(){
    console.log(this.state)
  }
  render() {
    return (
      <div className="home">
        <NavBar/>

        <h1 onClick = {this.lilogin.bind(this)}>LINKEDINLOGIN</h1>
        <h1 onClick = {this.getState.bind(this)}>GetSTATE</h1>
        {this.state.profile===undefined ? null : <h1>Welcome {this.state.firstName+" "+this.state.lastName}</h1>}
        <div className="splash-container">
          <h1>Achieve<br/> Greatness</h1>
        </div>

        <div className="about-splash">
          <img src={require('../../img/about-mentor.png')}/>
          <div className= "about-splash-container">
            <h1 className="menos-title">MENtorship to Optimize Society</h1>
            <p className="menos-intro">The pursuit of excellence can be demoralizing. At times, we feel lost - we don&#39;t know what to do or where to go. We need someone to point us in the right direction.<br/><br/>Menos connects you with highly established individuals that will guide you through your journey. Our mentors will give you solid advice based on their years and years of running successful companies.</p>
            <Link to= '/mentors'>
              <button className="btn-default btn-lg mentor-about-button">View All Mentors</button>
            </Link>
        </div>
        </div>

        <div className="mentor-splash">
          <h1 className="mentors-header-label">
            Mentors
          </h1>
          <div className="mentor-splash-preview">
            {splashMentors.map(mentorData => <MentorPreview key={mentorData.id} {...mentorData} />)}
          </div>
          <Link to= '/mentors'>
            <button className="btn-default btn-lg mentor-splash-button">View All Mentors</button>
          </Link>

        </div>

      </div>
    );
  }
}


export default Home;
