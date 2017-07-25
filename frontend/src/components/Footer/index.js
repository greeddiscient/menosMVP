import React from 'react';
import './index.css';

export default class Footer extends React.Component {

  constructor () {
    super()
    this.state = {
    }
  }
  render() {
    return (
      <div className="footer">
        <div className="contact-us">
          Reach Out Anytime:
        </div>
        <div className="email">
          support@menos.id
        </div>
      </div>
    );
  }
}
