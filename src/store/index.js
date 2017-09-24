/* eslint-disable */
import {
  extendObservable,
  computed,
  map,
  toJS
} from 'mobx'

import MobxFirebaseStore from 'mobx-firebase-store';
import {observer} from 'mobx-react';
import {createAutoSubscriber} from 'firebase-nest';


import firebase from 'firebase'

import PlayerStore from './player'
import StorageStore from './storage'
import UserStore from './user'
import PagesStore from './pages'
import SoundcloudStore from './soundcloud'



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
const Pages = new PagesStore(firebase);
const Uploads = new StorageStore(firebase)
const Player = new PlayerStore(firebase)
const soundcloud = new SoundcloudStore(firebase)
// window.soundcloud = soundcloud





// const soundcloud = new MobxFirebaseStore(firebase.database(app).ref('addons/Soundcloud'));


export {
  User,
  Pages,
  Uploads,
  Player,
  soundcloud
};