import React, { Component } from 'react';
import '../App.css';
import TrailItem from './TrailItem.js'

class Trails extends Component {
  render() {
    return (
      <ol className="trailList">
        {this.props.venues &&
          this.props.venues.map((venue, id) => (
            <TrailItem key={id} {...venue}
            handleTrailItemClick={this.props.handleTrailItemClick}
            />
          ))}
      </ol>
    );
  }
}

export default Trails;