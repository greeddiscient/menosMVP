// src/components/AthletePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import NotFoundPage from '../NotFoundPage';
import mentors from '../../data/mentors';
import NavBar from'../NavBar';
import Footer from'../Footer';
import axios from 'axios';
import './index.css';

export default class MentorPage extends React.Component {
  constructor(props){
    super(props)

    const mentorid = this.props.match.params.id;
    const mentor = mentors.filter((mentor) => mentor.id === mentorid)[0];
    this.state={
      question: '',
      mentor: mentor,
      threads: [],
      threadFollowUps: [],
    }

  }
  componentWillReceiveProps(nextProps){
    const mentorid = nextProps.match.params.id;
    const mentor = mentors.filter((mentor) => mentor.id === mentorid)[0];
    this.setState({
      question: '',
      mentor: mentor,
      threads: [],
      threadFollowUps: [],
    })
    this.getMentorThreads(mentorid)
    console.log("componentreceivedprops")

  }
  componentDidMount(){
    const mentorid = this.props.match.params.id;
    const mentor = mentors.filter((mentor) => mentor.id === mentorid)[0];
    this.setState({
      question: '',
      mentor: mentor,
      threads: [],
      threadFollowUps: [],
    })
    this.getMentorThreads(mentorid)
    console.log("componentmounted")

  }
  getMentorThreads(mentorid){
    console.log("getting mentor threads for"+mentorid)
    var that= this
    axios.get('http://api.lvh.me:9000/threads/'+mentorid, {
    })
    .then(function (response) {
      console.log(response);
      that.setState({threads: response.data})
      var threadFollowUps=[]
      for(var i=0;i<response.data.length;i++){
        threadFollowUps.push('')
      }
      that.setState({threadFollowUps: threadFollowUps})
    })
    .catch(function (error) {
      console.log(error);
    });

  }
  renderMentorResponses(thread){

    var rows=[]
    for(var i=0;i<thread.responses.length;i++){
      var responseObj=thread.responses[i]
      if(JSON.stringify(responseObj.followUp) === JSON.stringify({})){
        rows.push(
          <div className="mentor-response">
            <div className="responded-by">
              {responseObj.mentor} responded:
            </div>
            <div className="response-content">
              {responseObj.content}
            </div>
          </div>
        )
      }
      else{
        console.log("its a followup")
      }
    }
    return(rows)
  }

  renderThreads(){
    var threads = this.state.threads
    console.log("threads",threads)
    if (threads.length ===0){
      return(
        <div className="threads">
          <div className= "thread-content">
            <div className= "thread-asked-by">
              Shaun Djuhari asked:
            </div>
            <div className= "thread-question">
              Hello Boss How are you
            </div>
            <div className="mentor-response">
              <div className="responded-by">
                Mentor responded:
              </div>
              <div className="response-content">
                Hello Bro how are you too
              </div>
            </div>
            <div className="question-form">
              <form>
                <label className="question-invitation">
                  Followup to this Thread:
                  <textarea rows="5" cols="30" className="question-box" type="text"></textarea>
                </label>
                <input className="question-submit" type="submit" value="Ask a Followup" />
              </form>
            </div>
          </div>
        </div>
      )
      // return(
      //   <div className="profile-content">
      //     {this.state.mentor.name} has not answered any questions.
      //   </div>
      // )
    }
    // {threads.map((thread,index)=>(
    //   <div className= "thread-content">
    //     <div className= "thread-asked-by">
    //       {thread.query.askedBy.firstName} asked:
    //     </div>
    //     <div className= "thread-question">
    //       {thread.query.content}
    //     </div>
    //     {this.renderMentorResponses(thread)}
    //     <form className="followup-thread" onSubmit={this.submitFollowUpThread.bind(this,index)}>
    //       <label>
    //         Ask a followup to {this.state.mentor.name}:
    //         <textarea rows="5" cols="30" className="question-box" type="text" value={this.state.threadFollowUps[index]} onChange={this.followUpChange.bind(this)}></textarea>
    //       </label>
    //       <input type="submit" value="Followup" />
    //     </form>
    //   </div>
    // ))}
    else{
      return(
        <div>

        </div>
      )
    }

  }
  submitFollowUpThread(index,event){
    var mentor= this.state.mentor
    var thread= this.state.threads[index]
    if(window.IN.User.isAuthorized()){
      event.preventDefault()
      console.log("user is authorized")
      // {
      //   "threadid": "594a421e8473c84fa06677b4",
      //   "mentors":["594a3089734d1d4955bd0c41","594a3311734d1d4955bd0daf"]
      //   "askedBy": "594a3311734d1d4955bd0daf",
      //   "content": "lets go"
      // }
      axios.post('http://api.lvh.me:9000/followup',
      {
        "threadid": thread._id,
        "mentors": thread.mentors,
        "askedBy": JSON.parse(sessionStorage.getItem('user')),
        "content": this.state.threadFollowUps[index]
      })
      .then(function (response) {

        alert("You followed up to this thread. You will be notified when "+mentor.name+ " replies")

      })
      .catch(function (error) {
        console.log(error);
      });
      var copyThreadFollowups= this.state.threadFollowUps
      copyThreadFollowups[index]=''
      this.setState({threadFollowUps: copyThreadFollowups})

    }
    else{
      alert("You need to Log in with LinkedIn first")
      event.preventDefault();
      this.lilogin()
    }

  }
  followUpChange(index,event){
    var threadFollowUps= this.state.threadFollowUps
    threadFollowUps[index]=event.target.value
    this.setState({threadFollowUps: threadFollowUps});
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
      axios.post('http://api.lvh.me:9000/new_query',
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
        axios.post('http://api.lvh.me:9000/users', user)
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


      <div className="mentor-full">
        {this.renderDirectionalButtons(index)}
        <NavBar/>
        <div className="mentor-profile-container">

          <div className="mentor">
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
                Ask Me Anything (AMA)
              </h1>
              <div className="question-form">
                <form onSubmit={this.submitQuestion.bind(this)}>
                  <label className="question-invitation">
                    Dear {this.state.mentor.name},
                    <textarea rows="10" cols="30" className="question-box" type="text" value={this.state.question} onChange={this.questionChange.bind(this)}></textarea>
                  </label>
                  <input className="question-submit" type="submit" value="Submit Question" />
                </form>
              </div>
              <h1 className="profile-label">
                Threads
              </h1>
              {this.renderThreads()}
            </div>
        </div>



        </div>
        <Footer/>
      </div>
    );
  }
}
