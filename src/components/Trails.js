import React, { Component } from 'react';
import '../App.css';
import TrailItem from './TrailItem.js'

class Trails extends Component {
  render() {
    return (
      <ul className='trailList' tabindex="0">
        {this.props.venues &&
          this.props.venues.map((venue, id) => (
            <TrailItem key={id} {...venue}
            handleTrailItemClick={this.props.handleTrailItemClick}
            />
          ))}
      </ul>
    );
  }
}

export default Trails;