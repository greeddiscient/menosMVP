// src/components/AthletePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import NotFoundPage from '../NotFoundPage';
import mentors from '../../data/mentors';
import NavBar from'../NavBar';
import axios from 'axios';

export default class MentorPage extends React.Component {
  constructor(props){
    super(props)

    const mentorid = this.props.match.params.id;
    const mentor = mentors.filter((mentor) => mentor.id === mentorid)[0];
    this.state={
      question: '',
      mentor: mentor
    }
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
  questionChange(event) {
    this.setState({question: event.target.value});
  }

  submitQuestion(event) {
    var mentor= this.state.mentor
    console.log("mentorobj",this.state.mentor)
    if(window.IN.User.isAuthorized()){
      event.preventDefault()
      console.log("user is authorized")
      axios.post('/api/new_query',
      {
        "mentor": this.state.mentor.id,
        "askedBy": JSON.parse(sessionStorage.getItem('user')),
        "content": this.state.question
      })
      .then(function (response) {

        alert("You will be notified when "+mentor.name+ " replies")

      })
      .catch(function (error) {
        console.log(error);
      });
      this.setState({question: ''})

    }
    else{
      alert("You need to Log in with LinkedIn first")
      event.preventDefault();
      this.lilogin()
    }
  }
  lilogin(){
    window.IN.UI.Authorize().params({"scope":["r_basicprofile", "r_emailaddress"]}).place();
    window.IN.Event.on(window.IN, 'auth', this.getProfileData.bind(this));
  }
  getProfileData(){
    var that=this
    window.IN.API.Profile("me").fields("id,firstName,lastName,email-address,headline,picture-urls::(original),public-profile-url,location:(name)").result(function (me) {
        var profile = me.values[0];
        var id = profile.id;
        var firstName = profile.firstName;
        var lastName = profile.lastName;
        var emailAddress = profile.emailAddress;
        var pictureUrl = profile.pictureUrls.values[0];
        var profileUrl = profile.publicProfileUrl;
        var headline = profile.headline
        var country = profile.location.name;
        var user={
          id: id,
          firstName: firstName,
          lastName: lastName,
          headline: headline,
          emailAddress: emailAddress,
          pictureUrl: pictureUrl,
          profileUrl: profileUrl,
          country: country
        }
        sessionStorage.setItem('user', JSON.stringify(user))
        sessionStorage.setItem('loggedIn', 'true')
        that.setState({
          firstName: firstName,
          lastName: lastName,
          emailAddress: emailAddress,
          pictureUrl: pictureUrl,
          profileUrl: profileUrl
        })
        axios.post('/api/users', user)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    })
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
                Ask Me Anything (AMA)
              </h1>
              <form onSubmit={this.submitQuestion.bind(this)}>
                <label>
                  Ask {mentor.name} Anything:
                  <input type="text" value={this.state.question} onChange={this.questionChange.bind(this)} />
                </label>
                <input type="submit" value="Ask" />
              </form>
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
