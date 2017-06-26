import React from 'react';
import {Navbar,Nav,NavItem} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { IndexLinkContainer } from 'react-router-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

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
        <Navbar.Text pullRight>
          Loggedin as {sessionStorage.getItem('loggedIn')==='true' ? JSON.parse(sessionStorage.getItem('user')).firstName : "Guest" }
        </Navbar.Text>

      </Navbar>
      </div>
    );
  }
}
