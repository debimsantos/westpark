import React, { Component } from 'react';
import './App.css';
//import { getVenues } from './FourSquareAPI.js';
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

  render() {
    return (
      <main>
        <div id='map'>
        <Map {...this.props}/>
        </div>
      </main>
    );
  }
}

export default App;