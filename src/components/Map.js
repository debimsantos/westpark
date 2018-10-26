import React, { Component } from 'react';
import {  withScriptjs,
          withGoogleMap,
          GoogleMap,
          Marker
        } from "react-google-maps";

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={12}
    defaultCenter={{ lat: 33.687533, lng: -117.816489 }}
  >
    {props.isMarkerShown && <Marker position={{ lat: 33.687533, lng: -117.816489 }} />}
  </GoogleMap>
))

class Map extends Component {
  render() {
    return (
      < MyMapComponent
        isMarkerShown
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyCtbzZIfTIawx8Cdnrf0HxTJsQZ9767k-I"
        loadingElement={< div style={{ height: `100%` }} />}
        containerElement={< div style={{ height: `400px` }} />}
        mapElement={< div style={{ height: `100%` }} />}
      />
    );
  }
}

export default Map;

