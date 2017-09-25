/* eslint-disable */
import {
  extendObservable,
  computed,
  toJS,
  observable,
  runInAction
} from 'mobx';
const {
  map
} = observable;

const pages = map({})

class PagesStore {

  constructor(firebase) {

    this.firebase = firebase;
    this.auth = firebase.auth();
    this.database = firebase.database();
    this.pagesRef = firebase.database().ref('pages')
    // Initiates Firebase auth and listen to auth state changes.

    this.pagesRef.on('value', (_child) => {
      pages.replace(_child.val())
    })

  }

  get pages() {
    return pages
  }
  
  page(pageKey) {
    console.log(pages.has(pageKey), pages[pageKey])
    return pages
  }

  updatePage(item, pageKey, added) {

    console.log(item, pageKey, added)

    const pageItemPath = "/pages/"+pageKey+"/posts/" + item.id
    const itemPagePath = "/addons/Soundcloud/tracks/" + item.id + "/pages/" + pageKey

    var updates = {};
    updates[pageItemPath] = added;
    updates[itemPagePath] = added;
    // console.log(updates);
    this.firebase.database().ref().update(updates).then(() => {
      // console.log('it did it but it be trippn bro');
    });
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