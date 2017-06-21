import React, { Component } from 'react';
import MentorPreview from '../MentorPreview';
import mentors from '../../data/mentors';
import NavBar from'../NavBar';
import {Link} from 'react-router-dom'
import {LinkContainer} from 'react-router-bootstrap'
import './index.css';

var splashMentors= [mentors[0],mentors[1],mentors[2]]

class Home extends Component {
  render() {
    return (
      <div className="home">
        <NavBar/>
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
