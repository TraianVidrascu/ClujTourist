import React, { Component } from 'react';
import firebase from '../config/constants';
import 'bootstrap/dist/css/bootstrap.css';

export default class ObiectivDP extends React.Component{
    getitem(id){

        data={
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
            data.name=snapshot.child('name').val();
            data.description=snapshot.child('description').val();
            data.location.lat=snapshot.child('location/lat').val();
            data.location.lng=snapshot.child('location/lng').val();
            data.address=snapshot.child('address').val();
            data.note=snapshot.child('note').val();
            data.tag_string=snapshot.child('tag_string').val();
            data.profile_image=snapshot.child('profile_image').val();
          });
        return data;
    }

    constructor(props){
        super(props);

        const item =  this.getitem(prorps.params.id);
        this.state={
            idItem : item.id,
            name: item.name,
            description: item.description,
            location: item.location,
            address: item.address,
            note: item.note,
            tag_string:item.tag_string,
            profile_image: item.profile_image
        }
    }
    
    render(){
        return(
            <div>
                <div  className="row" style={divStyle}>
                    <div className="col-sm-2 col-md-2">
                        <img className="img-rounded" alt="" src={this.state.profile_image}/>
                    </div>
                    <div className="col-sm-8 col-md-6" >
                        <h2>{this.state.name}</h2>
                        <p>address:{this.state.address}</p>
                        <p>tag:{this.state.tag_string}</p>
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