import React from 'react';
import {Navbar,Nav,NavItem} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { IndexLinkContainer } from 'react-router-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './index.css';
import axios from 'axios'

export default class NavBar extends React.Component {

  constructor () {
    super()
    this.state = {
      }
    }
  handleSelect(selectedKey) {
    this.setState({activeKey: selectedKey})
    console.log(this.state)
  }

  lilogin(){
    window.IN.UI.Authorize().params({"scope":["r_basicprofile", "r_emailaddress"]}).place();
    window.IN.Event.on(window.IN, 'auth', this.getProfileData.bind(this));
  }
  lilogout(){
    alert("You Will be Logged Out of Menos")
    window.IN.User.logout();
    sessionStorage.setItem('loggedIn', 'false')
    this.setState({loggedOut: true})
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
  renderLoggedin(){
    if(sessionStorage.getItem('loggedIn')==='true'){
      return(
        <div className="loggedin" onClick={this.lilogout.bind(this)}>
          {JSON.parse(sessionStorage.getItem('user')).firstName} {JSON.parse(sessionStorage.getItem('user')).lastName}
        </div>
      )
    }
    else{
      return(
        <img className="lilogin" onClick = {this.lilogin.bind(this)} src={require('../../img/linkedinsignin.png')}/>
      )
    }
  }
  render() {
    return (

      <div>
      <Navbar inverse>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to='/' className='navbar-brand'>menos</Link>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav activeKey={this.state.activeKey} onSelect={this.handleSelect.bind(this)}>
          <IndexLinkContainer to="/">
            <NavItem eventKey={1}>Home</NavItem>
          </IndexLinkContainer>
          <LinkContainer to= "/mentors">
            <NavItem eventKey={2}>Mentors</NavItem>
          </LinkContainer>
          <LinkContainer to="/about">
            <NavItem eventKey={3}>About</NavItem>
          </LinkContainer>
        </Nav>
        <Nav pullRight className="login">
          {this.renderLoggedin()}
        </Nav>

      </Navbar>
      </div>
    );
  }
}
