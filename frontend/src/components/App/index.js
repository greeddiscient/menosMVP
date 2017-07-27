import React, { Component } from 'react';
import './index.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from '../Home';
import MentorPage from '../MentorPage';
import NotFoundPage from '../NotFoundPage';
import AboutPage from '../AboutPage';
import MentorsPage from '../MentorsPage';
import ReactGA from 'react-ga';

class GAListener extends React.Component {
  constructor(){
    super()
    ReactGA.initialize('UA-103424241-1');
  }

  componentDidMount() {
    this.sendPageView(this.context.router.history.location);
    this.context.router.history.listen(this.sendPageView);
  }

  sendPageView(location) {
    ReactGA.set({ page: location.pathname });
    ReactGA.pageview(location.pathname);
  }

  render() {
    return(<div></div>)
  }
}
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <GAListener>
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route path="/mentors/:id" component={MentorPage}/>
            <Route path="/about" component={AboutPage}/>
            <Route path="/mentors" component={MentorsPage}/>
            <Route path="*" component={NotFoundPage}/>
          </Switch>
        </GAListener>
      </BrowserRouter>
    );
  }
}

export default App;
