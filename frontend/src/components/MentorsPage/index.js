// src/components/IndexPage.js
import React from 'react';
import MentorPreview from '../MentorPreview';
import mentors from '../../data/mentors';
import NavBar from'../NavBar';
import Footer from '../Footer';
import './index.css';

export default class MentorsPage extends React.Component {
  render() {
    return (



      <div className="mentors-page">
        <NavBar/>
        <div className="mentors-introduction">
          <div className="header">
            Menos' Mentors
          </div>
          <div className="content">
            Our Mentors are the leaders of Indonesia who are highly passionate about giving back to the community and paying it forward. <br/>They will share their experiences and guide you on the integral philosophy you must adopt to excel in life. <br/><em>Click on a Mentor to ask them a question OR apply for a mentorship!</em>
          </div>
        </div>
        <div className="mentors-selector">
          {mentors.map(mentorData => <MentorPreview key={mentorData.id} {...mentorData} />)}
        </div>
        <Footer/>
      </div>
    );
  }
}
