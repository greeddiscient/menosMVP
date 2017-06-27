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
      queryResponses: []
    }
  }
  componentDidMount(){

    if (sessionStorage.getItem('loggedIn')===null){
      this.setState({loggedIn: false})
    }
    else{
      this.setState({loggedIn: true})
      this.getQueries()
    }
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

  responseChange(index,event){
    var queryResponses= this.state.queryResponses
    queryResponses[index]=event.target.value
    this.setState({queryResponses: queryResponses});
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
          Your queries: <br/>{this.renderQueries()}
        </div>
      </div>
    );
  }
}
