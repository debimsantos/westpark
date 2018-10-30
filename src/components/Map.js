import React, { Component } from 'react';
import {  withScriptjs,
          withGoogleMap,
          GoogleMap,
          Marker,
          InfoWindow
        } from 'react-google-maps';

/*
* Resource: https://tomchentw.github.io/react-google-maps/
*/

const MyMapComponent = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap
      defaultZoom={12}
      //zoom={props.zoom}
      defaultCenter={{ lat:33.684566, lng:-117.826508 }}
      >
      {props.markers &&
        props.markers
          .filter(marker => marker.isVisible)
          .map((marker, id, arr) => {
          // Generate markers on the venues from FourSquare
          const venueInfo = props.venues.find(venue => venue.id === marker.id);
          return (
            <Marker
              key={id}
              position={{ lat: marker.lat, lng: marker.lng }}
              onClick={() => props.handleMarkerClick(marker)}
              animation={arr.length === 1 ? window.google.maps.Animation.BOUNCE : window.google.maps.Animation.DROP}
            >
              {marker.isOpen &&
                venueInfo.bestPhoto && (
                // Pop-up display for venue name, image and address
                <InfoWindow>
                  <React.Fragment>
                    <img src={`${venueInfo.bestPhoto.prefix}200x200${venueInfo.bestPhoto.suffix}`} alt={'Trail'}/>
                    <h2 className='venue-name'>{venueInfo.name}</h2>
                    <h3 className='address'>{venueInfo.location.address}</h3>
                  </React.Fragment>
                </InfoWindow>
              )}
            </Marker>
          );
        })}
  </GoogleMap>
  ))
);

class Map extends Component {
  render() {
    return (
      <MyMapComponent
        {...this.props}
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyCtbzZIfTIawx8Cdnrf0HxTJsQZ9767k-I"
        loadingElement={< div style={{ height: `100vh` }} />}
        containerElement={< div style={{ height: `100vh` }} />}
        mapElement={< div style={{ height: `100vh` }} />}
        role='application'
      />
    );
  }
}

export default Map;