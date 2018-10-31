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
      defaultZoom={13}
      zoom={props.zoom}
      defaultCenter={{ lat:33.684566, lng:-117.826508 }}

      // disabling default google map options
      options={{
        scrollwheel: false,
        mapTypeControl: false,
        fullscreenControl: false,
        streetViewControl: false,
      }}
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
                    <div className='infowindow'>
                      <img src={`${venueInfo.bestPhoto.prefix}200x200${venueInfo.bestPhoto.suffix}`} alt={'Trail'}/>
                      <p className='venue-name'>{venueInfo.name}</p>
                      <p className='address'>
                        {venueInfo.location.formattedAddress[0]}
                        {venueInfo.location.formattedAddress[1]}
                      </p>
                    </div>
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
  state = {
    hasError: false
  }

  // Listening for authentication errors
  gm_authFailure() {
    window.alert('Problems loading google maps')
  }

  componentDidCatch(error, info) {
    this.setState({
      hasError: true
    });
  }

  componentDidMount() {
    window.gm_authFailure = this.gm_authFailure;
  }

  render() {
    return (
      <MyMapComponent
        {...this.props}
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyCtbzZIfTIawx8Cdnrf0HxTJsQZ9767k-I"
        loadingElement={< div style={{ height: `100%` }} />}
        containerElement={< div style={{ height: `calc(100vh - calc(50px + 5vmin))` }} />}
        mapElement={< div style={{ height: `100%` }} />}
        role='application'
      />
    );
  }
}

export default Map;