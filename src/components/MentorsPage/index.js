// src/components/IndexPage.js
import React from 'react';
import MentorPreview from '../MentorPreview';
import mentors from '../../data/mentors';
import NavBar from'../NavBar';

export default class MentorsPage extends React.Component {
  render() {
    return (



      <div className="home">
        <NavBar/>
        <h1 className="mentors-header-label">
          Mentors
        </h1>
        <div className="athletes-selector">
          {mentors.map(mentorData => <MentorPreview key={mentorData.id} {...mentorData} />)}
        </div>
      </div>
    );
  }
}
