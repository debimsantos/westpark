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
      defaultCenter={{ lat:33.6782, lng:-117.8018 }}

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
          const trailInfo = props.venues.find(venue => venue.id === marker.id);
          return (
            <Marker
              key={id}
              position={{ lat: marker.lat, lng: marker.lng }}
              onClick={() => props.handleMarkerClick(marker)}
              animation={marker.id === props.venues.id ? window.google.maps.Animation.BOUNCE :
                window.google.maps.Animation.DROP}
            >
              {marker.isOpen &&
                trailInfo.bestPhoto && (

                // Pop-up display for venue name, image and address
                <InfoWindow>
                  <React.Fragment>
                    <div className='infowindow'>
                      <img src={`${trailInfo.bestPhoto.prefix}200x200${trailInfo.bestPhoto.suffix}`} alt={'Trail'}/>
                      <p className='venue-name'>{trailInfo.name}</p>
                      <p className='address'>
                        {trailInfo.location.formattedAddress[0]} < br/>
                        {trailInfo.location.formattedAddress[1]}
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

  componentDidCatch(error) {
    console.log(error);
    this.setState({
      hasError: true
    })
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
        containerElement={< div style={{ height: `100vh` }} />}
        mapElement={< div style={{ height: `100%` }} />}
        role='application'
      />
    );
  }
}

export default Map;