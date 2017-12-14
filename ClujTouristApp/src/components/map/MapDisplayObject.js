import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import '../../assets/css/main.css'
import {Link} from "react-router-dom";

export default class MapDisplayObject extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const text_div_style = {
            position: 'absolute',
            'min-width': '120px',
            'min-height': '60px',
            left: 0,
            top: 0,
            willChange: 'transform', // it looks like this setting make firefox random marker movements smaller
            backgroundSize: '30px 120px',
            backgroundRepeat: 'no-repeat',
            // transition: 'transform 0.25s ease',
            transition: 'transform 0.25s cubic-bezier(0.485, 1.650, 0.545, 0.835)',
            WebkitTransition: '-webkit-transform 0.25s cubic-bezier(0.485, 1.650, 0.545, 0.835)',
            transformOrigin: `${this.props.lng}px ${this.props.lat}px`,
            WebkitTransformOrigin: `${this.props.lng}px ${this.props.lat}px`,


            'min-width': '',
            backgroundColor: 'white',
            color: '#3f51b5',
            border: '5px solid #f44336',
        }
        const text_style = {
            padding: '5px',
            width: '100%',
            textAlign: 'center',
            marginTop: 10,
            fontWeight: 'bold',
            fontSize: '18px',
            color: 'black'
        }
        return (
            <div>
                <div  className='my-icon' style={this.props.style}/>
                <div  className='objective-content' style={text_div_style}>
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