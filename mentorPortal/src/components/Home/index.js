import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Redirect} from 'react-router';
import axios from 'axios'

export default class Home extends Component {
  constructor(props){
    super(props)
    this.state={

      queries: [],
      queryResponses: [],
      followUps: [],
      followUpResponses:[]
    }
  }
  componentDidMount(){

    if (sessionStorage.getItem('loggedIn')===null){
      this.setState({loggedIn: false})
    }
    else{
      this.setState({loggedIn: true})
      this.getQueries()
      this.getFollowups()
    }
  }

  getFollowups(){
    var that =this
    axios.get('http://api.lvh.me:9000/followups/'+sessionStorage.getItem('mentorid'), {
    })
    .then(function (response) {
      console.log(response);
      that.setState({followUps: response.data})
      var followUpResponses=[]
      for(var i=0;i<response.data.length;i++){
        followUpResponses.push('')
      }
      that.setState({followUpResponses: followUpResponses})
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  getQueries(){
    var that= this
    axios.get('http://api.lvh.me:9000/queries/'+sessionStorage.getItem('mentorid'), {
    })
    .then(function (response) {
      console.log(response);
      that.setState({queries: response.data})
      var queryResponses=[]
      for(var i=0;i<response.data.length;i++){
        queryResponses.push('')
      }
      that.setState({queryResponses: queryResponses})
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  replyQuery(index,event){
    console.log("replied query")
    event.preventDefault()

    var query=this.state.queries[index]
    var mentorid=sessionStorage.getItem('mentorid')
    var queryResponse= this.state.queryResponses[index]
    var response={
      mentor: mentorid,
      content: queryResponse,
      followUp: {}
    }
    var that=this
    axios.post('http://api.lvh.me:9000/new_thread',
    {
      "mentors": [mentorid],
      "query": query,
      "responses": [response]
    })
    .then(function (response) {
      that.getQueries()
      alert("You replied to "+query.askedBy.firstName)

    })
    .catch(function (error) {
      console.log(error);
    });
  }

  replyFollowUp(index,event){
    event.preventDefault()

    var followUp=this.state.followUps[index]
    console.log("followupobj", followUp)
    var mentorid=sessionStorage.getItem('mentorid')
    var followUpResponse= this.state.followUpResponses[index]
    var that=this
    axios.post('http://api.lvh.me:9000/respondfollowup/'+followUp.threadid,
    {
      mentor: mentorid,
      content: followUpResponse,
      followUp: followUp
    })
    .then(function (response) {
      that.getFollowups()
      alert("You replied to "+followUp.askedBy.firstName+"\'s followup")

    })
    .catch(function (error) {
      console.log(error);
    });
  }

  responseChange(index,event){
    var queryResponses= this.state.queryResponses
    queryResponses[index]=event.target.value
    this.setState({queryResponses: queryResponses});
  }

  followUpResponseChange(index,event){
    var followUpResponses= this.state.followUpResponses
    followUpResponses[index]=event.target.value
    this.setState({followUpResponses: followUpResponses});
  }

  renderQueries(){
    var queries = this.state.queries
    return(
      <div>
        {queries.map((query,index)=>(
          <div className= "query-content">
            <h1>Query: {query.content}</h1>
            <h1>Asked by: {query.askedBy.firstName}</h1>
            <form className="respond-query" onSubmit={this.replyQuery.bind(this,index)}>
              <label>
                Respond to {query.askedBy.firstName}:
                <input type="text" value={this.state.queryResponses[index]} onChange={this.responseChange.bind(this,index)} />
              </label>
              <input type="submit" value="Respond" />
            </form>
          </div>
        ))}
      </div>
    )
  }
  renderFollowUps(){
    var followUps = this.state.followUps
    return(
      <div>
        {followUps.map((followUp,index)=>(
          <div className= "followUp-content">
            <h1>Follow Up: {followUp.content}</h1>
            <h1>Asked by: {followUp.askedBy.firstName}</h1>
            <form className="followUp-query" onSubmit={this.replyFollowUp.bind(this,index)}>
              <label>
                Respond to {followUp.askedBy.firstName}:
                <input type="text" value={this.state.followUpResponses[index]} onChange={this.followUpResponseChange.bind(this,index)} />
              </label>
              <input type="submit" value="Respond" />
            </form>
          </div>
        ))}
      </div>
    )
  }
  render() {
    return (
      <div className="App">
        {this.state.loggedIn===false ? <Redirect to="/login" /> : null}
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div className= "Queries">
          Your Queries: <br/>{this.renderQueries()}
        </div>
        <div className= "FollowUps">
          Your Followups: <br/>{this.renderFollowUps()}
        </div>
      </div>
    );
  }
}
