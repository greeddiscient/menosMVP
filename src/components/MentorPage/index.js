// src/components/AthletePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import NotFoundPage from '../NotFoundPage';
import mentors from '../../data/mentors';
import NavBar from'../NavBar';

export default class MentorPage extends React.Component {
  constructor(props){
    super(props)
  }
  renderDirectionalButtons(index){
    if (index ==0){
      var prevMentor= mentors[mentors.length-1];
      var nextMentor= mentors[index+1];
    }
    else if (index==mentors.length-1){

      var prevMentor= mentors[index-1];
      var nextMentor= mentors[0];
    }
    else{
      var prevMentor= mentors[index-1];
      var nextMentor= mentors[index+1];

    }
    return(
      <div className="directional-buttons">
        <Link to={`/mentors/${prevMentor.id}`}>
          <div className="prevButton">
            <i className="fa fa-angle-left fa-5x left-arrow" aria-hidden="true"></i>
            <h1 className="name">{prevMentor.name}</h1>
          </div>
        </Link>
        <Link to={`/mentors/${nextMentor.id}`}>
          <div className="nextButton">

            <i className="fa fa-angle-right fa-5x right-arrow" aria-hidden="true"></i>
            <h1 className="name">{nextMentor.name}</h1>
          </div>
        </Link>
      </div>



    )
  }

  render() {
    const mentorid = this.props.match.params.id;
    const mentor = mentors.filter((mentor) => mentor.id === mentorid)[0];
    if (!mentor) {
      return <NotFoundPage/>;
    }
    var index = mentors.findIndex(mentor => mentor.id==mentorid);

    // const headerStyle = { backgroundImage: `url(/img/${mentor.cover})` };
    return (


      <div className="athlete-full">
        <NavBar/>
        <Link to="/mentors">
          <h1 className="navigateBack">
            « Back to Mentors
          </h1>
        </Link>
        <div className="mentor-profile-container">
          {this.renderDirectionalButtons(index)}
          <div className="athlete">




            <div className= "mentor-header">
              <img className= "mentor-cover" src={require(`../../img/${mentor.cover}`)}/>
              <img className= "mentor-photo"  src={require(`../../img/${mentor.image}`)}/>
              <div className="mentor-name-position-container">
                <div className="mentor-name-position">
                  <h2 className="name">{mentor.name}</h2>
                  <h3 className="position">{mentor.position} of {mentor.company}</h3>
                </div>
              </div>


            </div>



            <div className="mentor-about">
              <h1 className="profile-label">
                Education
              </h1>
              <div className="education profile-content">
                {mentor.education}
              </div>
              <h1 className="profile-label">
                Background
              </h1>
              <div className="background profile-content">
                {mentor.background}
              </div>
              <h1 className="profile-label">
                Story
              </h1>
              <div className="story profile-content">
                {mentor.story}
              </div>
              <h1 className="profile-label">
                Ask Me Anything
              </h1>
              <h1 className="profile-label">
                Threads
              </h1>
            </div>
        </div>



        </div>

      </div>
    );
  }
}
// <section className="medals">
//   <p>Winner of <strong>{athlete.medals.length}</strong> medals:</p>
//   <ul>{
//     athlete.medals.map((medal, i) => <Medal key={i} {...medal}/>)
//   }</ul>
// </section>
