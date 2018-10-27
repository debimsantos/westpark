import React, { Component } from 'react';
import {  withScriptjs,
          withGoogleMap,
          GoogleMap,
          Marker,
          InfoWindow
        } from "react-google-maps";

const MyMapComponent = withScriptjs(
  withGoogleMap(props => (
  <GoogleMap
    defaultZoom= {15}
    zoom= {props.zoom}
    defaultCenter= {{ lat: 33.687533, lng: -117.816489 }}
    center= {props.center}
  >
    {props.markers && props.markers
      .filter(marker => marker.isVisible)
      .map((marker, idx) => (
        <Marker>
          key={idx}
          position={{ lat: marker.lat, lng: marker.lng }}
          onClick={() => props.handleMarkerClick(marker)}
            {marker.isOpen && (
              <InfoWindow id='info-window'>
                <div>
                  <h3>{props.selected.venue.name}</h3>
                  <h3>{props.selected.venue.formattedAddress}</h3>
                </div>
              </InfoWindow>
            )}
        </Marker>
      ))}
  </GoogleMap>
  ))
);

class Map extends Component {
  render() {
    return (
      < MyMapComponent
        {...this.props}
        isMarkerShown
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyCtbzZIfTIawx8Cdnrf0HxTJsQZ9767k-I"
        loadingElement={< div style={{ height: `100%` }} />}
        containerElement={< div style={{ height: `100vh` }} />}
        mapElement={< div style={{ height: `100%` }} />}
      />
    );
  }
}

export default Map;