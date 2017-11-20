import React, {Component} from 'react';
import firebase from '../../config/constants'
import {NotificationContainer, NotificationManager} from 'react-notifications';

export default class EditObjective extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemRef: firebase.database().ref('items').child(this.props.match.params.id),
            item: '',
            name: '',
            description: '',
            location: '', // coordoante epntru googlemaps
            address: '', // adresa
            tag_string: '',// utilizat pentru filtrare de exmplu #bar#nightlife#obiective sau #concerct#event
            note: 0, //nota de la 1 la 5, default 0
            profile_image: ''// web link catre imagine
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.state.key = this.props.match.params.id;
        this.state.itemRef.once('value')
            .then((snapshot) => {
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
                    item.profile_image
                })
            }
        )
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.state.itemRef.update({
            "name": this.state.name,
            'description': this.state.description,
            'location': this.state.location,
            'address': this.state.address,
            'tag_string': this.state.tag_string,
            'note': this.state.note,
            'profile_image': this.state.profile_image
        });
        NotificationManager.success('Update completed', 'Success');

    }

    render() {
        return (<div className="row">
            <NotificationContainer className="alert alert-success"/>
            <h1>Edit { this.state.name}</h1>
             <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" className="form-control" name="name" placeholder="Name" onChange={this.handleChange} value={this.state.name} />
                </div>
                <div className="form-group">
                    <label >Image</label>
                    <input type="text" className="form-control" name="profile_image" placeholder="Profile Image" onChange={this.handleChange} value={this.state.profile_image}/>
                </div>
                <div className="form-group">
                    <label >Description</label>
                    <textarea className="form-control" rows="5" name="description" value={this.state.description} onChange={this.handleChange} />
                </div>
                <div className="form-group">
                    <label >Location</label>
                    <textarea className="form-control" name="location" value={this.state.location} onChange={this.handleChange} />
                </div>
                <div className="form-group">
                    <label >Address</label>
                    <textarea className="form-control" name="address" value={this.state.address} onChange={this.handleChange} />
                </div>
                <div className="form-group">
                    <label > Tags</label>
                    <textarea className="form-control" name="tag_string" value={this.state.tag_string} onChange={this.handleChange} />
                </div>
                <button type="submit" className="btn btn-primary">Save changes</button>
            </form>

        </div>)
    }
}