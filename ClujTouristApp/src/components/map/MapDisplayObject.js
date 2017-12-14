import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import {Link} from "react-router-dom";

export default class MapDisplayObject extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const text_div_style = {
            'min-height': '30px',
            'min-width': '120px',
            backgroundColor: 'white',
            color: '#3f51b5',
            border: '5px solid #f44336',
        }
        const text_style = {
            padding: '5px',
        }
        return (
            <div>
                <div style={this.props.style}/>
                <div style={text_div_style}>
                    <div>
                        <Link to={'/objective/' + this.props.id}>
                            <button className="btn btn-primary">
                                <span className="glyphicon glyphicon-info-sign"/> Info
                            </button>
                        </Link>
                    </div>
                    <div>
                        <text style={text_style}>
                            {this.props.text}
                        </text>
                    </div>
                </div>

            </div>
        )
    }
}