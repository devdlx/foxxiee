/* eslint-disable */
import {
  extendObservable,
  computed,
  map,
  toJS
} from 'mobx'


class UserStore {

  waiting = true
  isAuthenticated = false
  firebase = null
  user = null

  constructor(firebase) {

    extendObservable(this, {
      isAuthenticated: this.isAuthenticated,
      waiting: this.waiting,
      user: this.user
    })

    this.firebase = firebase;
    this.auth = firebase.auth();
    this.database = firebase.database();
    this.storage = firebase.storage();
    this.userRef = firebase.database().ref('users')
    // Initiates Firebase auth and listen to auth state changes.

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // console.log('User is signed in')
//         console.log(user)
        let _user = {
          displayName: user.displayName,
          email: user.email,
          emailVerified: user.emailVerified,
          isAnonymous: user.isAnonymous,
          phoneNumber: user.phoneNumber || 0,
          photoURL: user.photoURL,
          providerData: user.providerData,
          refreshToken: user.refreshToken,
          uid: user.uid
        }
        //         console.log(_user)

        this.user = _user
        this.isAuthenticated = true;
      } else {
        // No user is signed in.
        console.log('no user', user)
        //     console.log(User.waiting)
        this.isAuthenticated = false;
      }
      this.waiting = false

    })

  }


  signInEmail(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((user) => {

        console.log(user)

      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
  }

  signInGoogle() {
    var provider = new this.firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/calendar');
    provider.addScope('https://www.googleapis.com/auth/firebase');
    provider.addScope('https://mail.google.com/');
    provider.addScope('profile');
    provider.addScope('email');
    provider.addScope('https://www.googleapis.com/auth/urlshortener');
    provider.addScope('https://www.googleapis.com/auth/youtube');
    provider.addScope('https://www.googleapis.com/auth/drive');


    this.firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      //console.log(user)
      let _user = {
        displayName: user.displayName,
        email: user.email,
        emailVerified: user.emailVerified,
        isAnonymous: user.isAnonymous,
        phoneNumber: user.phoneNumber || 0,
        photoURL: user.photoURL,
        providerData: user.providerData,
        refreshToken: user.refreshToken,
        lastLoggin: Date.now()
      }
      console.log(_user)

      this.user = _user
      this.user.uid = user.uid
      // this.isAuthenticated = true;
      this.userRef.child(user.uid).update(_user)
      this.userRef.child(`${user.uid}/activity`).push({type: 'account:loggin', lastLoggin: _user.lastLoggin})

    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });


  }

  get profile() {
    return toJS(this.user);
  }

  signOut() {
    this.waiting = true
    this.firebase.auth().signOut().then(() => {
      // Sign-out successful.
      this.userRef.child(`${user.uid}/activity`).push({type: 'account:logout', lastLoggin: _user.lastLoggin})
      this.waiting = false
    }).catch((error) => {
      // An error happened.
      console.error(error)
      this.waiting = false
      
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
export default UserStore