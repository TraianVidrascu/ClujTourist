import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css'

export default class MapDisplayObject extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div style={this.props.style} className="glyphicon glyphicon-map-marker">
{/*
                <text>{this.props.text}</text>
*/}
            </div>
        )
    }
}