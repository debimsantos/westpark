import React, { Component } from 'react';
import './App.css';
import FourSquareAPI from './FourSquareAPI.js';
import Map from './components/Map.js';
import Sidebar from './components/Sidebar.js';


class App extends Component {
  constructor() {
    super();
    this.state = {
      venues: [],
      markers: [],
      center: [],
      zoom: 12,
      hasError: false,
      updateSuperState: obj => {
        this.setState(obj);
      }
    };
  }

  closeMarkers = () => {
    const markers = this.state.markers.map(marker => {
      marker.isOpen = false;
      return marker;
    });
    this.setState({ markers: Object.assign(this.state.markers, markers) });
  };

  // opens infowindow for marker/venue
  handleMarkerClick = marker => {
    this.closeMarkers();
    marker.isOpen = true;
    this.setState({ markers: Object.assign(this.state.markers, marker) });

    const venue = this.state.venues.find(venue => venue.id === marker.id);

    // fetch venue details from FourSquare API to populate infowindow
    FourSquareAPI.getVenueDetails(marker.id).then(res => {
      const newVenue = Object.assign(venue, res.response.venue);
      this.setState({ venues: Object.assign(this.state.venues, newVenue) });
      // console.log(newVenue); uncomment to see location being clicked
    }).catch(error => {
      alert('Problems retrieving information from FourSquare. Try again later');
    });
  }

  // on sidebar when a venue is clicked, marker for that venue pops
  handleTrailItemClick = venue => {
    const marker = this.state.markers.find(marker => marker.id === venue.id);
    this.handleMarkerClick(marker);
  };

    // search venues from FourSquare within Westpark Irvine area
    componentDidMount() {
      FourSquareAPI.search({
        ll: '33.684566,-117.826508',
        query: 'trail',
        radius: 8000,
        limit: 10
      }).then(results => {
        // assign results to venues object
        const {venues} = results.response;

        // generate marker for each venue
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
      }).catch(err => {
        window.alert('Problems retrieving information from FourSquare. Try again later');
        console.log('FourSquare API request failed', err)
      });
    }

    componentDidCatch(error) {
      this.setState({ hasError: true })
    }

  render() {
    if (this.state.hasError) {
      return <p className='error-message'>There is a problem processing your request</p>
    }
    return (

      <div className='App' id='App'>

        <Sidebar
          pageWrapId={'page-wrap'}
          outerContainerId={'App'}
          {...this.state}
          handleTrailItemClick={this.handleTrailItemClick}
        />

        <div id='page-wrap'>
          <header className='header'>
            <nav>
              <h1 className='App-title'>WestPark Trails</h1>
            </nav>
          </header>

          <main className='main-content'>
            <Map {...this.state}
              handleMarkerClick={this.handleMarkerClick}
            />
          </main>
        </div>

        <footer className='footer'>
          <p>WestPark Trails</p>
          <p>Google Maps | FourSquare</p>
          <p>Developer: <a href='mailto:debimortola@gmail.com'>
            Debi Mortola</a></p>
        </footer>

      </div>

    );
  }
}

export default App;