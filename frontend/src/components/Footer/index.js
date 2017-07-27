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
        <div className="reach-out">
          <div className="contact-us">
            Reach Out Anytime:
          </div>
          <div className="email">
            support@menos.id
          </div>
        </div>
        <div className="copyright">
          © 2017 Menos. All Rights Reserved.
        </div>
      </div>
    );
  }
}
