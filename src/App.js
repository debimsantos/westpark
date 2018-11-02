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
      zoom: 13,
      hasError: false,
      updateSuperState: obj => {
        this.setState(obj);
      }
    };
  }

  // close other markers when a new one is clicked
  closeMarkers = () => {
    const markers = this.state.markers.map(marker => {
      marker.isOpen = false;
      return marker;
    });
    this.setState({ markers: Object.assign(this.state.markers, markers) });
  };

  // opens infowindow when marker/venue is clicked
  handleMarkerClick = marker => {
    this.closeMarkers();
    marker.isOpen = true;
    this.setState({markers: Object.assign(this.state.markers, marker)});
    const venue = this.state.venues.find(venue => venue.id === marker.id);
    // fetch venue details from FourSquare API to populate infowindow
    FourSquareAPI.getVenueDetails(marker.id).then(res => {
      const newVenue = Object.assign(venue, res.response.venue);
      this.setState({
        venues: Object.assign(this.state.venues, newVenue),
        // center map and added a little nudge to the left
        center: {
          lat: newVenue.location.lat,
          lng: (newVenue.location.lng + 0.02 )
        }
      });
    }).catch(error => {
      alert('Problems retrieving information from FourSquare. Try again later');
      console.log('Error:', error)
    });
  }

  // on sidebar when a venue is clicked, marker for that venue pops
  handleTrailItemClick = venue => {
    const marker = this.state.markers.find(marker => marker.id === venue.id);
    this.handleMarkerClick(marker);
  };

    // search venues from FourSquare within Westpark Irvine area
    async componentDidMount() {
      await FourSquareAPI.search({
        //ll: '33.684566,-117.826508',
        near: 'Irvine,CA',
        query: 'trail',
        radius: 8000,
        limit: 12
      }).then(results => {
        // assign results to venues object
        const { venues } = results.response;
        const { center } = results.response.geocode.feature.geometry;

        // generate marker for each venue
        const markers = venues.map(venue => {
          return {
            lat: venue.location.lat,
            lng: venue.location.lng,
            isOpen: false,
            isVisible: true,
            id: venue.id
          };
        })
        this.setState({ venues, center, markers });
      }).catch(err => {
        window.alert('Problems retrieving information from FourSquare.    Try again later.');
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
          tabIndex={1}
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
              tabIndex={2}
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