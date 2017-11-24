import React, {Component} from 'react';
import firebase from '../../config/constants';

export default class ServiceObjective extends Component {
    constructor() {
    }
    
    getFirebaseRef(item) {
        firebase.database().ref(item);
    }

    getFirebaseChild(item, child) {
        firebase.database().ref(item).child(child);
    }

    removeFirebaseChild(item, child) {
        firebase.database().ref(item).child(child).remove();
    }
}
