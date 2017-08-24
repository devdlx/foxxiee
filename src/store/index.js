import {
  extendObservable,
  computed,
  map,
  toJS
} from 'mobx'

import firebase from 'firebase'

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

class MusicItems {


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

const musicItems = new MusicItems();
export {
  musicItems
};