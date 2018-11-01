import React, { Component } from 'react';
import { slide as Menu } from "react-burger-menu";
import '../App.css';
import Trails from './Trails.js'

class Sidebar extends Component {
constructor() {
  super();
  this.state = {
    query: "",
    venues: []
  };
}
  // Filter venue list
  filterTrails = () => {
    if (this.state.query.trim() !== "") {
      let trails = this.props.venues.filter(venue => venue.name.toLowerCase()
      .includes(this.state.query.toLowerCase()))
      return trails
    }
    return this.props.venues
  }

  updateQuery = (event) => {
    this.setState({
      query: event.target.value
    })

    // Match markers to filter result
    let markers = this.props.venues.map(venue => {
      let isMatch = venue.name.toLowerCase().includes(event.target.value.toLowerCase())
      let marker = this.props.markers.find(element => element.id === venue.id);
      if (isMatch) {
        marker.isVisible = true;
      } else {
        marker.isVisible = false;
      }
      return marker;
    });
    this.props.updateSuperState({ markers })
  }

  render() {
    return (
      // set sidebar to open on the right by default
      <Menu right isOpen={true} noOverlay>
        <div className='search-venue-wrapper'>
          <div className='search-venue-input-wrapper'>
            <input
              type={'search'}
              id={'search'}
              placeholder={'Filter Trails'}
              value={this.state.query}
              onChange={this.updateQuery}
              aria-label='filter'
            />
            <Trails {...this.props}
              venues={this.filterTrails()}
              handleTrailItemClick={this.props.handleTrailItemClick}
            />
            <div className='attribution'>
              <h3>Trail information provided by FourSquare</h3>
            </div>
          </div>
        </div>
      </Menu>
    );
  }
}

export default Sidebar;

