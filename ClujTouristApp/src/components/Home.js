import React, {Component} from 'react'
import {Link} from "react-router-dom";
import ServiceObjective from './ServiceObjective';

export default class Home extends Component {
    constructor() {
        super();
        this.state = {
            items: []
        }
    }

    componentDidMount() {
        const itemsRef = ServiceObjective.getFirebaseRef('items');
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

        ServiceObjective.removeFirebaseChild('items', item);
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
                                            <img src={item.profile_image} alt="Unavailable" width="100px" height="100px"/>
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
                                            <img src={item.profile_image} alt="Unavailable" width="100px"
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
    }
}
