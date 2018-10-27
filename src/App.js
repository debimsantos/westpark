import React, { Component } from 'react';
import './App.css';
import SquareAPI from './FourSquareAPI.js';
import Map from './components/Map.js';


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
            isVisible: true
          };
        });
        this.setState({ venues, markers });
        console.log(results);
      });
    }

  render() {
    return (
      <main>
        <div className='App'>
        <Map {...this.state}/>
        </div>
      </main>
    );
  }
}

export default App;