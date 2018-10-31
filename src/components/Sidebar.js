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

  filterTheVenues = () => {
    if (this.state.query.trim() !== "") {
      let restaurants = this.props.venues.filter(venue => venue.name.toLowerCase()
      .includes(this.state.query.toLowerCase()))
      return restaurants
    }
    return this.props.venues
  }

  reviseQuery = (event) => {
    this.setState({
      query: event.target.value
    })

    let markers = this.props.venues.map(venue => {
      let doesMatch = venue.name.toLowerCase().includes(event.target.value.toLowerCase())
      let marker = this.props.markers.find(element => element.id === venue.id);
      if (doesMatch) {
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
      <Menu right isOpen={true} noOverlay>
        <div className='search-venue-wrapper'>
          <div className='search-venue-input-wrapper'>
            <input
              type={'search'}
              id={'search'}
              placeholder={'Filter Trails'}
              value={this.state.query}
              onChange={this.reviseQuery}
              aria-label='filter'
            />
            <Trails {...this.props}
              venues={this.filterTheVenues()}
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

