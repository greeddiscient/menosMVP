import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';


export default class Header extends React.Component {

  render() {
    return (

      <div className = "header-logo">
        <Link to='/'>
        <img className ="menos-sq-logo" src={require('../../img/menos-sq-logo.png')} />
        </Link>
      </div>
    );
  }
}
