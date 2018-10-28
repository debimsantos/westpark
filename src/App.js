import React, { Component } from 'react';
import './App.css';
import SquareAPI from './FourSquareAPI.js';
import Map from './components/Map.js';
import Sidebar from './components/Sidebar.js';


class App extends Component {
  constructor() {
    super();
    this.state = {
      venues: [],
      markers: [],
      center: [],
      zoom: 12
    };
  }

  closeAllMarkers = () => {
    const markers = this.state.markers.map(marker => {
      marker.isOpen = false;
      return marker;
    });
    this.setState({ markers: Object.assign(this.state.markers, markers) });
  };

  handleMarkerClick = marker => {
    this.closeAllMarkers();
    marker.isOpen = true;
    this.setState({ markers: Object.assign(this.state.markers, marker) });

    const venue = this.state.venues.find(venue => venue.id === marker.id);

    SquareAPI.getVenueDetails(marker.id).then(res => {
      const newVenue = Object.assign(venue, res.response.venue);
      this.setState({ venues: Object.assign(this.state.venues, newVenue) });
      // console.log(newVenue); uncomment to see location being clicked
    });
  }

    componentDidMount() {
      SquareAPI.search({
        ll: "33.689826,-117.806625",
        query: "trail",
        radius: 8000
      }).then(results => {
        const {venues} = results.response;
        //const {center} = results.response.geocode.feature.geometry;
        const markers = venues.map(venue => {
          return {
            lat: venue.location.lat,
            lng: venue.location.lng,
            isOpen: false,
            isVisible: true,
            id: venue.id
          };
        });
        this.setState({ venues, markers });
        console.log(results);
      });
    }

  render() {
    return (

      <div className='App'>
        <header>
          <div className='header'>WESTPARK TRAILS</div>
        </header>
        <main>

          <Sidebar
            pageWrapId={"page-wrap"}
            outerContainerId={"App"}
            {...this.state}
          />

          <Map {...this.state}
            handleMarkerClick={this.handleMarkerClick}
          />
        </main>

      <footer className='footer'>
        <p>WestPark Trails</p>
        <p>Google Maps | FourSquare</p>
        <p>Developer: <a href="mailto:debimortola@gmail.com">
          Debi Mortola-Santos</a></p>
      </footer>

      </div>

    );
  }
}

export default App;