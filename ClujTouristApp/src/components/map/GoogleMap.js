import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class GoogleMap extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <GoogleMapReact
        defaultCenter={this.props.center}
        defaultZoom={this.props.zoom}
        style={{height: '300px'}}
      >
        <AnyReactComponent
          lat={46.7712101}
          lng={23.623635299999933}
          text={'Cluj-Napoca'}
        />
      </GoogleMapReact>
    );
  }
}

GoogleMap.defaultProps = {
  center: {lat: 46.77, lng: 23.62},
  zoom: 11
};

export default GoogleMap;
