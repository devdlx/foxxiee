/* eslint-disable */
import {
  extendObservable,
  computed,
  map,
  toJS
} from 'mobx'


class MusicItemsFirebase {


  constructor() {
    

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


class PagesStore {

  waiting = true
  isAuthenticated = false
  pages = []

  constructor(firebase) {

    extendObservable(this, {
      isAuthenticated: this.isAuthenticated,
      waiting: this.waiting,
      pages: this.pages
    })

    this.firebase = firebase;
    this.auth = firebase.auth();
    this.database = firebase.database();
    this.pagesRef = firebase.database().ref('pages')
    // Initiates Firebase auth and listen to auth state changes.
    
    
    this.pagesRef.on('child_added', (_child) => {
      this.pages.push(_child.val())
    })

    
  }


 
  update = (id, data) => {
    this.pagesRef.update({
      [id]: data
    })
  }

  del = (id) => {
    this.pagesRef.child(id).remove();
  }

}
export default PagesStore