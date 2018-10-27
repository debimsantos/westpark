import React, { Component } from 'react';
import './App.css';
//import { getVenues } from './FourSquareAPI.js';
import Map from './components/Map.js';
import SquareAPI from './FourSquareAPI';

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
        ll: "33.689826, -117.806625",
        query: "trail",
        limit: 10
      }).then(results => console.log(results))
    }

  render() {
    return (
      <main>
        <div id='map'>
        <Map/>
        </div>
      </main>
    );
  }
}

export default App;