import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import '../../assets/css/main.css'
import {Link} from "react-router-dom";

const DetailsForObjective = React.createClass({

    render() {
        return(
            <div  className='objective-content' id='objective-content' style={this.props.styles.text_div_style}>
                <div>
                    <Link to={'/objective/' + this.props.id}>
                        <button className="btn btn-primary">
                            <span className="glyphicon glyphicon-info-sign"/> Info
                        </button>
                    </Link>

                    <button type="button" className="btn btn-default btn-sm" onClick={this.props.onClick}>
                        <span className="glyphicon glyphicon-remove-sign"/>
                    </button>
                </div>
                <div>
                    <text style={this.props.styles.text_style}>
                        {this.props.text}
                    </text>
                </div>
            </div>
        );
    },
});

export default class MapDisplayObject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showDetails: 0,
        }
    }

    changeHiddenDetailsStatus = () => {
        this.setState({
            showDetails: 1 - this.state.showDetails,
        });
        
        if (document.getElementById("objective-content")){
            if (this.state.showDetails) {
                document.getElementById("objective-content").style.display = "block";
            } else {
                document.getElementById("objective-content").style.display = "none";
            }
        }
    };

    styles = {
        text_div_style: {
            position: 'absolute',
            minWidth: '120px',
            minHeight: '60px',
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
            backgroundColor: 'white',
            color: '#3f51b5',
            border: '5px solid #f44336',
        },
        text_style : {
            padding: '5px',
            width: '100%',
            textAlign: 'center',
            marginTop: 10,
            fontWeight: 'bold',
            fontSize: '18px',
            color: 'black'
        }
    };

    render() {
        return (
            <div>
                <div  className='my-icon' style={this.props.style} onClick={this.changeHiddenDetailsStatus}>
                    {this.state.showDetails ?
                        <DetailsForObjective id={this.props.id} text={this.props.text} styles={this.styles} onClick={this.changeHiddenDetailsStatus}/> :
                        null
                    }
                </div>
            </div>
        );
    }
}


