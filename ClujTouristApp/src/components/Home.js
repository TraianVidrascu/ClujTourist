import React, {Component} from 'react'
import {Link} from "react-router-dom";
import ServiceObjective from './objectives/ServiceObjective';
import '../assets/css/main.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'jquery'
import firebase from '../config/constants'

export default class Home extends Component {
    constructor() {
        super();
        this.state = {
            items: [],
            searchKey: "",
            shouldHide: false,
            items_filtered: []
        }
        this.handleChange = this.handleChange.bind(this)
    }
    async handleChange (e) {
        this.setState({
            searchKey: e.target.value
        });
        if(this.state.searchKey.length < 2){
            this.setState({
                items_filtered: this.state.items
            });
        }
        else if(this.state.searchKey.length > 1) {
            this.setState({
                shouldHide: true
            });
            let key = this.state.searchKey
            const itemsRef = firebase.database().ref('items');
            itemsRef.on('value', (snapshot) => {
                let items = snapshot.val();
                let newState = [];
                for (let item in items) {
                    if(items[item].name.toLowerCase().includes(key.toLowerCase())){
                        newState.push({
                            id: item,
                            name: items[item].name,
                            description: items[item].description,
                            location: items[item].location,
                            address: items[item].address,
                            tag_string: items[item].tag_string,
                            note: items[item].note,
                            profile_image: items[item].profile_image
                        });
                    }
                }
                this.setState({
                    items_filtered: newState
                });
            });
        }
     }
    componentDidMount() {
        const itemsRef = firebase.database().ref('items');
        itemsRef.on('value', (snapshot) => {
            let items = snapshot.val();
            let newState = [];
            for (let item in items) {
                newState.push({
                    id: item,
                    name: items[item].name,
                    description: items[item].description,
                    location: items[item].location,
                    address: items[item].address,
                    tag_string: items[item].tag_string,
                    note: items[item].note,
                    profile_image: items[item].profile_image
                });
            }
            this.setState({
                items: newState
            });
        });
    }

    deleteRow = (item,e) => {
        e.preventDefault();

        var items = this.state.items.filter(function(itm) {
            return item !== itm.id;
        });
        this.setState({ items: items });

        firebase.database().ref('items').child(item);
    };
    formPreventDefault(e) {
        e.preventDefault();
    }
    render() {
        if (this.props.authed === false) {
            return (
                <div className="container">
                    <div className="row home_search">
                        <div className="form-group">
                            <form onSubmit={this.formPreventDefault} >
                                <input type="text" onChange={this.handleChange} className="form-control" id="keyword" placeholder="Search by title.."/>
                            </form>
                        </div>
                    </div><br/>
                    <div className="row justify-content-md-center">
                        <div className="list-group" className={!this.state.shouldHide ? 'hidden' : ''}>
                            {this.state.items_filtered.map((item, index) => {
                                return (
                                    <div key={index} className="col-xs-12 col-sm-6 col-md-6">
                                        <div className="well well-sm">
                                            <div className="row">
                                                <div className="col-sm-6 col-md-4">
                                                    <img src={item.profile_image} alt="" className="img-rounded img-responsive" />
                                                </div>
                                                <div className="col-sm-6 col-md-8">
                                                    <h4>{item.name}</h4>
                                                    <p>{item.description.slice(0,95)} .. </p>
                                                    <div className="btn-group">
                                                        <Link to={'/objectives/' + item.id}>
                                                            <button type="submit" className="btn btn-primary">
                                                                <span className="glyphicon glyphicon-info-sign"/> Info
                                                            </button>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="list-group" className={this.state.shouldHide ? 'hidden' : ''}>
                            {this.state.items.map((item, index) => {
                                return (
                                    <div key={index} className="col-xs-12 col-sm-6 col-md-6">
                                        <div className="well well-sm">
                                            <div className="row">
                                                <div className="col-sm-6 col-md-4">
                                                    <img src={item.profile_image} alt="" className="img-rounded img-responsive" />
                                                </div>
                                                <div className="col-sm-6 col-md-8">
                                                    <h4>{item.name}</h4>
                                                    <p>{item.description.slice(0,95)} .. </p>
                                                    <div className="btn-group">
                                                        <Link to={'/objectives/' + item.id}>
                                                            <button type="submit" className="btn btn-primary">
                                                                <span className="glyphicon glyphicon-info-sign"/> Info
                                                            </button>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="container">
                    <div className="row home_search">
                        <div className="form-group">
                            <form onSubmit={this.formPreventDefault} >
                                <input type="text" onChange={this.handleChange} className="form-control" id="keyword" placeholder="Search by title.."/>
                            </form>
                        </div>
                    </div><br/>
                    <div className="row justify-content-md-center">
                        <div className="list-group" className={!this.state.shouldHide ? 'hidden' : ''}>
                            {this.state.items_filtered.map((item, index) => {
                                return (
                                    <div key={index} className="col-xs-12 col-sm-6 col-md-6">
                                        <div className="well well-sm">
                                            <div className="row">
                                                <div className="col-sm-6 col-md-4">
                                                    <img src={item.profile_image} alt="" className="img-rounded img-responsive" />
                                                </div>
                                                <div className="col-sm-6 col-md-8">
                                                    <h4>{item.name}</h4>
                                                    <p>{item.description.slice(0,95)} .. </p>
                                                    <div className="btn-group admin-buttons">

                                                        <button className="btn btn-primary" type="submit"
                                                                onClick={(e) => this.deleteRow(item.id, e)}>
                                                            <span className="glyphicon glyphicon-remove"/>
                                                        </button>
                                                        <button type="submit" className="btn btn-primary">

                                                            <Link to={'/objectives/' + item.id}>
                                                                <span className="glyphicon glyphicon-edit"/>
                                                            </Link>

                                                        </button>
                                                        <button className="btn btn-primary" type="submit">
                                                            <span className="glyphicon glyphicon-info-sign"/>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="list-group" className={this.state.shouldHide ? 'hidden' : ''}>
                            {this.state.items.map((item, index) => {
                                return (

                                    <div key={index} className="col-xs-12 col-sm-6 col-md-6">
                                        <div className="well well-sm">
                                            <div className="row">
                                                <div className="col-sm-6 col-md-4">
                                                    <img src={item.profile_image} alt="" className="img-rounded img-responsive" />
                                                </div>
                                                <div className="col-sm-6 col-md-8">
                                                    <h4>{item.name}</h4>
                                                    <p>{item.description.slice(0,95)} .. </p>
                                                    <div className="btn-group admin-buttons">

                                                        <button className="btn btn-primary" type="submit"
                                                                onClick={(e) => this.deleteRow(item.id, e)}>
                                                            <span className="glyphicon glyphicon-remove"/>
                                                        </button>
                                                        <button type="submit" className="btn btn-primary">

                                                            <Link to={'/objectives/' + item.id}>
                                                                <span className="glyphicon glyphicon-edit"/>
                                                            </Link>

                                                        </button>
                                                        <button className="btn btn-primary" type="submit">
                                                            <span className="glyphicon glyphicon-info-sign"/>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            );
        }
    }
}
