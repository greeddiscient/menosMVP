import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

export default class MentorPreview extends React.Component {
  render() {
    return (
      <Link to={`/mentors/${this.props.id}`}>
        <div className="mentor-preview">
          <img src={require(`../../img/${this.props.image}`)}/>
          <div className="mentor-info">
            <h2 className="name">{this.props.name}</h2>
            <h3 className="company">{this.props.company}</h3>
            <div className="position">{this.props.position}</div>

          </div>


        </div>
      </Link>
    );
  }
}
