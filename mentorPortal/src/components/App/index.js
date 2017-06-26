import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from '../Home';
import NotFoundPage from '../NotFoundPage';
import MentorLogin from '../MentorLogin';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path="/login" component={MentorLogin}/>
          <Route path="*" component={NotFoundPage}/>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
