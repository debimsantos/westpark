import React, { Component } from 'react';
import './App.css';
import { getVenues } from './FourSquareAPI.js';
import Map from './components/Map.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      venues: [],
      selectedVenues: {},
      markers: [],
      center: [],
      zoom: 8
    };
  }

  closeAllMarkers = () => {
    const markers = this.state.markers.map(marker => {
      marker.isOpen = false;
      return marker;
    });
    this.setState({ markers: Object.assign(this.state.markers, markers)});
  };

  handleMarkerClick = marker => {
    this.closeAllMarkers();
    marker.isOpen = true;

    const selected = this.state.venues[marker.id]
    this.setState({
      markers: Object.assign(this.state.markers, marker),
      selected: Object.assign(selected),
     });
  };

  componentDidMount() {
    getVenues(res => {
      const venues = res.data;
      const center = res.response.geocode.feature.geometry;
      const markers = venues.map(venue => {
        return {
          lat: venue.location.lat,
          lng: venue.location.lng,
          isOpen: false,
          isVisible: true,
          id: venue.id
        };
      });
      this.setState({ venues, markers, center})
    })
  }

  render() {
    return (
      <div className='App' id='App'>
        <main>
          <div id='map'>
          <Map {...this.state}
            handleMarkerClick={this.handleMarkerClick}
          />
          </div>
        </main>
      </div>
    );
  }
}

export default App;