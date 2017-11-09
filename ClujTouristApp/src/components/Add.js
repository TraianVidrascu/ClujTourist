import React, { Component } from 'react';
import firebase from '../config/constants'
export default class Add extends Component {
    constructor() {
        super();
        this.state = {
            title: '',
            description: '',
            image: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    handleSubmit(e) {
        e.preventDefault();
        const itemsRef = firebase.database().ref('items');
        const item = {
            title: this.state.title,
            description: this.state.description,
            image: this.state.image

        }
        itemsRef.push(item);
        this.setState({
            title: '',
            description: '',
            image: ''
        });
    }
    render() {
        return (
            <div className="row">
                <h1>Add to database</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Title</label>
                        <input type="text" className="form-control" name="title" placeholder="Title"  onChange={this.handleChange} value={this.state.title} />
                    </div>
                    <div className="form-group">
                        <label >Image</label>
                        <input type="text" className="form-control" name="image" placeholder="Image" onChange={this.handleChange} value={this.state.image}/>
                    </div>
                    <div className="form-group">
                        <label >Description</label>
                        <textarea className="form-control" rows="5" name="description" value={this.state.description} onChange={this.handleChange} />
                    </div>
                    <button type="submit" className="btn btn-primary">Add</button>
                </form>
            </div>
        );
    }
}
