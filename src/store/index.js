/* eslint-disable */
import {
  extendObservable,
  computed,
  map,
  toJS
} from 'mobx'

import firebase from 'firebase'

import PlayerStore from './player'

const config = {
  apiKey: "AIzaSyByzKb-Cu489zNHQZkuhfoOYr1oIelCr34",
  authDomain: "foxxieedotcom-56b41.firebaseapp.com",
  databaseURL: "https://foxxieedotcom-56b41.firebaseio.com",
  projectId: "foxxieedotcom-56b41",
  storageBucket: "foxxieedotcom-56b41.appspot.com",
  messagingSenderId: "1013557392388"
}

firebase.initializeApp(config);

const root = firebase.database().ref()
const items = firebase.database().ref('items/music')
const settings = firebase.database().ref('settings')
const user = firebase.database().ref('user')

const FB = {
  root,
  items,
  settings,
  user
}

class MusicItemsFirebase {


  constructor() {
    FB.items.on('child_added', (_child) => {
      items.push(_child.val())
    })

  }

  get items() {
    return toJS(this.items);
  }

  add = (data) => {
    const id = FB.items.push().key;
    this.update(id, data);
  }

  update = (id, data) => {
    FB.items.update({
      [id]: data
    })
  }

  del = (id) => {
    FB.items.child(id).remove();
  }

}

const musicItems = new MusicItemsFirebase();









class UserFirebase {

  waiting = true;

  constructor() {
    //     FB.user.on('value', (_child) => {
    //       console.log(_child.val())
    //     })
//     console.log('User Store')
    extendObservable(this, {
      isAuthenticated: this.isAuthenticated
    });
  }




  signIn() {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {

      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
  }

  get profile() {
    return toJS(this.user);
  }

  signOut() {
    firebase.auth().signOut().then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }

  update = (id, data) => {
    FB.user.update({
      [id]: data
    })
  }

  del = (id) => {
    FB.user.child(id).remove();
  }

}
const User = new UserFirebase();
// console.log("User - ", User)
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User is signed in.
//     console.log(user)
  } else {
    // No user is signed in.
//     console.log('no user', user)
//     console.log(User.waiting)
  }
  User.waiting = false
  User.isAuthenticated = true;
})

export {
  User, musicItems, PlayerStore
};