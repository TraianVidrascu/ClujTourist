import React, {Component} from 'react';
import firebase from '../config/constants';
import 'bootstrap/dist/css/bootstrap.css';
import GoogleMap from './map/GoogleMap';

export default class ObjectiveDP extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            name: '',
            address: '',
            description: '',
            profile_image: '',
            tag_string: '',
            location: '',
            note: 0,
            start: '',
            end: ''
        }
    }

    componentDidMount() {
        firebase.database().ref('items').child(this.props.match.params.id).once('value').then((snapshot) => {
                let item = snapshot.val();
                this.setState({
                    item: item.id,
                    id: item,
                    name:
                    item.name,
                    description:
                    item.description,
                    location:
                    item.location,
                    address:
                    item.address,
                    tag_string:
                    item.tag_string,
                    note:
                    item.note,
                    profile_image:
                    item.profile_image,
                    start:
                    item.start_date,
                    end:
                    item.end_date,
                    image:
                    item.profile_image
                })
            }
        )
    }

    getdate(date) {
        var temp = date.split('-');
        var year = temp[0];
        var month = temp[1];
<<<<<<< HEAD
        var day = String(temp[2]).split('T')[0]; 
        var time = String(temp[2]).split('T')[1]; 
=======
        var day = String(temp[2]).split('T')[0];
        var time = String(temp[2]).split('T')[1];
>>>>>>> develop
        return day + '/' + month + '/' + year + ' ' + time;
    }

    render() {
        if (this.state.start != undefined)
            return (
                <div>
                    <div className="row" style={divStyle}>
                        <div className="col-sm-2 col-md-2">
                            <img className="img-rounded" alt="" src={this.state.profile_image}/>
                        </div>
                        <div className="col-sm-6 col-md-6">
                            <h2>{this.state.name}</h2>
                            <p>address:{this.state.address}</p>
                            <p>tag:{this.state.tag_string}</p>
                            <p>{this.getdate(this.state.start)} - {this.getdate(this.state.end)}</p>
                            <h4 style={notes}>Note:{this.state.note}</h4>
                        </div>
                    </div>
                    <div class="row" style={divStyle}>
                        <p>Description:</p>
                        <p>{this.state.description}</p>
                    </div>
                </div>
            );
        else
            return (
                <div>
                    <div className="row" style={divStyle}>
                        <div className="col-sm-2 col-md-2">
                            <img className="img-rounded" alt="" src={this.state.profile_image}/>
                        </div>
                        <div className="col-sm-8 col-md-6">
                            <h2>{this.state.name}</h2>
                            <p>address:{this.state.address}</p>
                            <p>tag:{this.state.tag_string}</p>
                            <h4 style={notes}>Note:{this.state.note}</h4>
                        </div>
                    </div>
                    <div class="row" style={divStyle}>
                        <p>Description:</p>
                        <p>{this.state.description}</p>
                    </div>
                </div>
            );
    }
}
var divStyle = {
    background: '#C0C0C0',
    margin: '10px',
    borderRadius: 10,
    top: '50%',
    bottom: '50%'
}
var notes = {
    color: "green"
}
var map = {
    height: '170px'
<<<<<<< HEAD
}
=======
}
>>>>>>> develop
