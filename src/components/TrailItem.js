import React, { Component } from 'react';
import '../App.css';

class TrailItem extends Component {
  render() {
    return (
      <li className='trailList' tabIndex="0" onClick={() => this.props.handleTrailItemClick(this.props)}>
        {this.props.name}
      </li>
    );
  }
}

export default TrailItem;