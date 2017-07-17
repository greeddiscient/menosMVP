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
            <h1>{responseObj.mentor} responded: {responseObj.content}</h1>
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
    return(
      <div>
        {threads.map((thread,index)=>(
          <div className= "thread-content">
            <h1>Query: {thread.query.content}</h1>
            <h1>Asked by: {thread.query.askedBy.firstName}</h1>
            {this.renderMentorResponses(thread)}
            <form className="followup-thread" onSubmit={this.submitFollowUpThread.bind(this,index)}>
              <label>
                Ask a followup to {this.state.mentor.name}:
                <input type="text" value={this.state.threadFollowUps[index]} onChange={this.followUpChange.bind(this,index)} />
              </label>
              <input type="submit" value="Followup" />
            </form>
          </div>
        ))}
      </div>
    )
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
              {this.renderThreads()}
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
