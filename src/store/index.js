/* eslint-disable */
import {
  extendObservable,
  computed,
  map,
  toJS,
  observable
} from 'mobx'


import {observer} from 'mobx-react';



import firebase from 'firebase'

import PlayerStore from './player'
import StorageStore from './storage'
import UserStore from './user'
import PagesStore from './pages'
import PostsStore from './posts'
import SoundcloudStore from './soundcloud'
import YoutubeStore from './youtube'



const config = {
  apiKey: "AIzaSyByzKb-Cu489zNHQZkuhfoOYr1oIelCr34",
  authDomain: "foxxieedotcom-56b41.firebaseapp.com",
  databaseURL: "https://foxxieedotcom-56b41.firebaseio.com",
  projectId: "foxxieedotcom-56b41",
  storageBucket: "foxxieedotcom-56b41.appspot.com",
  messagingSenderId: "1013557392388"
}

const app = firebase.initializeApp(config);

const root = firebase.database().ref()
const settings = firebase.database().ref('settings')



const User = new UserStore(firebase)
const pages = new PagesStore(firebase)
const posts = new PostsStore(firebase)
const Uploads = new StorageStore(firebase)
const Player = new PlayerStore(firebase)
const soundcloud = new SoundcloudStore(firebase)
const youtube = new YoutubeStore(firebase)

// window.soundcloud = soundcloud


// const soundcloud = new MobxFirebaseStore(firebase.database(app).ref('addons/Soundcloud'));

//
// var splash = observable({
//     loaded: false
// });





export {
  User,
  pages,
  posts,
  Uploads,
  Player,
  soundcloud,
  youtube

};
