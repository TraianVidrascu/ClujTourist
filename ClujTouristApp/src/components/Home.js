import React, {Component} from 'react'
import {Link} from "react-router-dom";
import '../assets/css/main.css'
import 'bootstrap/dist/css/bootstrap.css'
//import 'jquery'
import {NotificationContainer, NotificationManager} from 'react-notifications';

import firebase from '../config/constants'

export default class Home extends Component {
    constructor() {
        super();
        this.state = {
            items: [],
            search: '',
            filter: 'all',
        }
    }
    componentDidMount() {
        const itemsRef = firebase.database().ref('items')

        itemsRef.on('value', (snapshot) => {
            const items = snapshot.val()
            this.setState({
                items: Object.keys(items).map(id => ({ id, ...items[id] }))
            })
        });
    }
    changeSearch(value) {
        this.setState({
            search: value
        })
    }
    changeFilter(value) {
        this.setState({
            filter: value
        })
    }

    deleteRow(id) {
        const newItems = this.state.items.filter(item => item.id !== id)

<<<<<<< HEAD
        this.setState({ items: newItems });

        // stergerea nu se face pe firebase
        firebase.database().ref('items').child(id).remove();
        NotificationManager.success('Deletion completed', 'Success');

    }
    filterItems() {
        const { search, filter, items } = this.state

        return items
            .filter(item => {
                if (search === '') return true
                if (search.length < 2) return false
                return item.name.toLowerCase().includes(search.toLowerCase())
            })
            .filter(item => {
                if (filter === 'all') return true
                if (filter === 'events') return item.start_date !== undefined
                if (filter === 'locations') return item.start_date === undefined
            })
    }
    renderSearch() {
        const { search } = this.state

<<<<<<< HEAD
        return (
            <input
                type="text"
                value={search}
                onChange={e => this.changeSearch(e.target.value)}
                className="form-control"
                style={{ marginBottom: 20 }}
                placeholder="Search by title..."
            />
        )
    }
    renderFilter() {
        const { filter } = this.state
=======
                                    </div>
                                    <a href="#" className="list-group-item list-group-item-action">
                                        <img src={item.profile_image} alt="Unavailable" width="100px" height="100px"/>
                                        <span>    Name: {item.name} </span>
                                        <span>Description: {item.description} </span>
                                        <span>Tags: {item.tag_string}</span>
>>>>>>> + added dependencies to package.json

        return (
            <div className="btn-group" style={{ marginBottom: 20 }}>
                <button
                    className={'btn btn-default' + (filter === 'all' ? ' active' : '')}
                    onClick={() => this.changeFilter('all')}
                >
                    All
                </button>
                <button
                    className={'btn btn-default' + (filter === 'events' ? ' active' : '')}
                    onClick={() => this.changeFilter('events')}
                >
                    Events
                </button>
                <button
                    className={'btn btn-default' + (filter === 'locations' ? ' active' : '')}
                    onClick={() => this.changeFilter('locations')}
                >
                    Locations
                </button>
            </div>
        )
    }
    renderItems() {
        const items = this.filterItems()
        const { authed } = this.props

        return (
            <div className="row justify-content-md-center">
                {items.map(item => (
                    <div key={item.id} className="col-xs-12 col-sm-6 col-md-6">
                        <NotificationContainer className="alert alert-success"/>
                        <div className="well well-sm">
                            <div className="row">
                                <div className="col-sm-6 col-md-4">
                                    <img src={item.profile_image} alt="" className="img-rounded img-responsive" />
                                </div>
                                <div className="col-sm-6 col-md-8">
                                    <h4>{item.name}</h4>
                                    <p>{item.description.slice(0, 95)} ... </p>
                                    {authed === false ? (
                                        <div className="btn-group">
                                            <Link to={'/objective/' + item.id}>
                                                <button className="btn btn-primary">
                                                    <span className="glyphicon glyphicon-info-sign" /> Info
                                                    </button>
                                            </Link>
                                        </div>
                                    ) : (
                                        <div className="btn-group admin-buttons">
                                            <button className="btn btn-primary"
                                                onClick={() => this.deleteRow(item.id)}>
                                                <span className="glyphicon glyphicon-remove" />
                                            </button>
                                            <button className="btn btn-primary">
                                                <Link to={'/objectives/' + item.id}>
                                                    <span className="glyphicon glyphicon-edit" />
                                                </Link>
                                            </button>
                                            <button className="btn btn-primary">
                                                <span className="glyphicon glyphicon-info-sign" />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )
    }
    render() {
        return (
            <div className="container">
                {this.renderSearch()}
                {this.renderFilter()}
                {this.renderItems()}
            </div>
        )
=======
        var items = this.state.items.filter(function(itm) {
            return item !== itm.id;
        });
        this.setState({ items: items });

        firebase.database().ref('items').child(item).remove();
    };

    render() {
        if (this.props.authed === false) {
            return (
                <div className="container">
                    <div className="row justify-content-md-center">
                        <div className="list-group">
                            {this.state.items.map((item, index) => {
                                return (
                                    <div key={index}>
                                        <div className="list-group-item list-group-item-action">
                                            <Link to={'/objectives/' + item.id}>
                                                <button type="submit">
                                                    <span className="glyphicon glyphicon-info-sign"/>
                                                </button>
                                            </Link>
                                        </div>

                                        <a href="#" className="list-group-item list-group-item-action">
                                            <img src={item.profile_image} alt="Unavailable image" width="100px"
                                                 height="100px"/>
                                            <span>    Name: {item.name} </span>
                                            <span>Description: {item.description} </span>
                                            <span>Tags: {item.tag_string}</span>
                                        </a>
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
                    <div className="row justify-content-md-center">
                        <div className="list-group">
                            {this.state.items.map((item, index) => {
                                return (
                                    <div key={index}>
                                        <div className="list-group-item list-group-item-action">
                                            <button type="submit"
                                                    onClick={(e) => this.deleteRow(item.id, e)}>
                                                <span className="glyphicon glyphicon-remove"/>
                                            </button>

                                            <Link to={'/objectives/' + item.id}>
                                                <button type="submit">
                                                    <span className="glyphicon glyphicon-edit"/>
                                                </button>

                                                <button type="submit">
                                                    <span className="glyphicon glyphicon-info-sign"/>
                                                </button>
                                            </Link>

                                        </div>
                                        <a href="#" className="list-group-item list-group-item-action">
                                            <img src={item.profile_image} alt="Unavailable image" width="100px"
                                                 height="100px"/>
                                            <span>    Name: {item.name} </span>
                                            <span>Description: {item.description} </span>
                                            <span>Tags: {item.tag_string}</span>

                                        </a>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            );
        }
>>>>>>> * disabled view for remove/ edit btn in Home page
    }
}
