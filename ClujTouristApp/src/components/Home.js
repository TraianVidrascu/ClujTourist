import React, {Component} from 'react'
import firebase from '../config/constants'
import {Link} from "react-router-dom";


export default class Home extends Component {
    constructor() {
        super();
        this.state = {
            items: []
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
        })
        this.setState({ items: items });

        firebase.database().ref('items').child(item).remove();
    }

    render() {
        return (
            <div className="container">
                <div className="row justify-content-md-center">
                    <div className="list-group">
                        {this.state.items.map((item) => {
                            return (
                                <div>
                                    <div className="list-group-item list-group-item-action">
                                        <button type="submit" className="glyphicon glyphicon-remove"
                                                onClick={(e) => this.deleteRow(item.id, e)}
                                        ></button>
                                        <Link to={'/objectives/'+ item.id}>
                                            <button type="submit" className="glyphicon glyphicon-edit"><span className="glyphicon glyphicon-info-sign"/></button>
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
        )
    }
}
