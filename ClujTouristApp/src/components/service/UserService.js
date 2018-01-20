import React, {Component} from 'react';
import firebase from '../../config/constants';

export function getDatabase() {
    return firebase.database().ref("users")
}

export function isAdmin(uid) {
    if(uid === null){
        return false
    }
    var flag
    getDatabase().child(uid + "/info/admin").on('value', function (isAdmin) {
        flag = isAdmin.val();
    });
    return flag;
}

