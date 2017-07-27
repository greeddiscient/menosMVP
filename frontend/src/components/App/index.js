import React, { Component } from 'react';
import './index.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from '../Home';
import MentorPage from '../MentorPage';
import NotFoundPage from '../NotFoundPage';
import AboutPage from '../AboutPage';
import MentorsPage from '../MentorsPage';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path="/mentors/:id" component={MentorPage}/>
          <Route path="/about" component={AboutPage}/>
          <Route path="/mentors" component={MentorsPage}/>
          <Route path="*" component={NotFoundPage}/>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
