import React, {Component} from 'react';
export default class MapDisplayObject extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <text>{this.props.text}</text>
            </div>
        )
    }
}