import React, { Component } from 'react';
import firebase from '../config/constants';
import 'bootstrap/dist/css/bootstrap.css';
import GoogleMap from './map/GoogleMap';

export default class EventDP extends React.Component{

    getitem(id){
        el={
            idItem : id,
            name: "",
            description: "",
            location: {lat: 46.77, lng: 23.62},
            address: "",
            note: 1,
            tag_string:"",
            profile_image: ""
        };
        firebase.database().ref('items/'+id).once('value').then(function(snapshot) {
            el.name=snapshot.child('name').val();
            el.description=snapshot.child('description').val();
            el.location.lat=snapshot.child('location/lat').val();
            el.location.lng=snapshot.child('location/lng').val();
            el.address=snapshot.child('address').val();
            el.note=snapshot.child('note').val();
            el.tag_string=snapshot.child('tag_string').val();
            el.profile_image=snapshot.child('profile_image').val();
          });
        return el;
    }
    getevent(id){
        e={
            idEvent : id,
            start_date:'',
            end_date:''
        };
        firebase.database().ref('events/'+id).once('value').then(function(snapshot) {
            e.start_date=snapshot.child('start_date').val();
            e.end_date=snapshot.child('end_date').val();
          });
        return e;
    }
    constructor(props){
        super(props);
        const event=this.getevent(props.params.id);
        const item = this.getitem(props.params.id);
        this.state={
            idObiectiv : item.id,
            idEvent:event.id,
            name: item.name,
            address:item.address,
            description: item.description,
            profile_image: item.profile_image,
            tag_string:item.tag_string,
            location:item.location,
            note:item.note,
            start:event.start_date,
            end:event.end_date
        }
    }
    
    render(){
        return(
            <div>
                <div  className="row" style={divStyle}>
                    <div className="col-sm-2 col-md-2">
                        <img className="img-rounded" alt="" src={this.state.profile_image}/>
                    </div>
                    <div className="col-sm-6 col-md-6">
                        <h2>{this.state.name}</h2>
                        <p>address:{this.state.address}</p>
                        <p>tag:{this.state.tag_string}</p>
                        <p>{this.state.start}-{this.state.end}</p>
                        <h4 style={notes}>Note:{this.state.note}</h4>
                    </div>
                    <div className="col-sm-2 col-md-4"style={map}>
                    <GoogleMap center={this.state.location} zoom={14}/>
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
var divStyle={
background: '#C0C0C0',
margin:'10px',
borderRadius: 10,
top:'50%',
bottom:'50%'
}
var notes={
color:"green"
}
var map={
height:'170px'
}