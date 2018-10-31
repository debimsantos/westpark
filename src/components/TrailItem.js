import React, { Component } from 'react';
import '../App.css';

class TrailItem extends Component {
  render() {
    return (
      <li className='trailList' onClick={() => this.props.handleTrailItemClick(this.props)}>
        {this.props.name}
      </li>
    );
  }
}

export default TrailItem;