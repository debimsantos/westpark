import React, { Component } from 'react';
import './App.css';
import { getVenues } from './FourSquareAPI.js';

class App extends Component {

  componentDidMount() {
    this.loadMap()
  }

  // Display map
  loadMap = () => {
    addScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyCtbzZIfTIawx8Cdnrf0HxTJsQZ9767k-I&callback=initMap")
    window.initMap = this.initMap
  }

  // Initialize map with Wespark lat lng
  initMap = () => {
    let map = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: 33.687533, lng: -117.816489 },
      zoom: 13
    })
  }

  render() {
    return (
      <main>
        <div id='map'></div>
      </main>
    );
  }
}

// Script for the google map
let addScript = (src) => {
  let index = window.document.getElementsByTagName('script')[0]
  let script = window.document.createElement('script')
  script.src = src
  script.async = true
  script.defer = true
  index.parentNode.insertBefore(script, index)
}

export default App;