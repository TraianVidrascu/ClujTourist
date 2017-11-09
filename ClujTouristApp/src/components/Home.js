import React, { Component } from 'react'
import firebase from '../config/constants'

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
                    title: items[item].title,
                    description: items[item].description,
                    image: items[item].image
                });
            }
            this.setState({
                items: newState
            });
        });
    }
    render () {
        return (
                <div className="container">
                    <div className="row justify-content-md-center">
                        <div className="list-group">
                            {this.state.items.map((item) => {
                              return (
                                <a href="#" className="list-group-item list-group-item-action">
                                    <img src={item.image} width="100px" height="100px"/>
                                    <span>Description: {item.description}</span>
                                    <span>---- Title: {item.title}</span>
                                </a>
                              )
                            })}
                        </div>
                    </div>
                </div>
        )
    }
}
