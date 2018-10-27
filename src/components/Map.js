import React, { Component } from 'react';
import {  withScriptjs,
          withGoogleMap,
          GoogleMap,
          Marker
        } from "react-google-maps";

const MyMapComponent = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap
      defaultZoom={12}
      zoom={props.zoom}
      defaultCenter={{ lat: 33.689826, lng: -117.806625 }}
    >
      {props.markers &&
        props.markers
          .filter(marker => marker.isVisible)
          .map((marker, id) => (
        <Marker key={id} position={{ lat: marker.lat, lng: marker.lng }} />
        ))}
  </GoogleMap>
  ))
);

class Map extends Component {
  render() {
    return (
      <MyMapComponent
        {...this.props}
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyCtbzZIfTIawx8Cdnrf0HxTJsQZ9767k-I"
        loadingElement={< div style={{ height: `100%` }} />}
        containerElement={< div style={{ height: `400vh` }} />}
        mapElement={< div style={{ height: `100%` }} />}
      />
    );
  }
}

export default Map;