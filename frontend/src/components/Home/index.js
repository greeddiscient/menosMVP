import React, { Component } from 'react';
import MentorPreview from '../MentorPreview';
import mentors from '../../data/mentors';
import NavBar from'../NavBar';
import Footer from '../Footer';
import {Link} from 'react-router-dom'
import {LinkContainer} from 'react-router-bootstrap'
import './index.css';
import autobind from 'autobind-decorator'
import axios from 'axios'
var querystring = require('querystring');

var splashMentors= mentors.filter(mentor=>
  mentor.id === "handry-satriago" ||
  mentor.id === "noni-purnomo" ||
  mentor.id === "yos-ginting"
)

class Home extends Component {
  constructor(props){
    super(props)
    this.state={

    }
    localStorage.setItem('init', 'hello')
  }

  render() {
    return (
      <div className="home">
        <NavBar/>

        {this.state.profile===undefined ? null : <h1>Welcome {this.state.firstName+" "+this.state.lastName}</h1>}
        <div className="splash-container">

        </div>
        <h1 className="introduction-header-label">
          Introduction
        </h1>
        <div className="about-splash">
          <img className="splash-img" src={require('../../img/about-mentor.png')}/>
          <div className= "about-splash-container">
            <h1 className="menos-title">Mentorship to Optimize Society</h1>
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
        <Footer/>
      </div>
    );
  }
}


export default Home;
