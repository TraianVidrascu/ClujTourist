import React, {Component} from 'react'
import firebase from '../config/constants'
import {Link} from "react-router-dom";
import GoogleMap from './map/GoogleMap';

export default class Map extends Component {
    render() {
      return (
        <div className="container">
          <div className="row justify-content-md-center">
            <GoogleMap />
          </div>
        </div>
      );
  }
}
