/* eslint-disable */
import {extendObservable, computed, toJS, observable, runInAction} from 'mobx';
const {map} = observable;

const pages = map({})

class PagesStore {
  waiting = true

  constructor(firebase) {

    extendObservable(this, {waiting: this.waiting})

    this.firebase = firebase;
    this.auth = firebase.auth();
    this.database = firebase.database();
    this.pagesRef = firebase.database().ref('pages')
    // Initiates Firebase auth and listen to auth state changes.

    this.pagesRef.on('value', (_child) => {
      runInAction(() => {
        pages.replace(_child.val())
        this.waiting = false
      })
    })

  }

  get pages() {
    return pages
  }

  page(pageKey) {
    // console.log(pages.keys());
    // console.log(pageKey, pages.has(pageKey), pages.get(pageKey))
    let page_ = {
      posts: {
        keys: []
      }
    }
    if (pages.has(pageKey)) {
      page_ = pages.get(pageKey)
    }

    // console.log(Object.keys(page_.posts))
    console.log(page_.posts);
    // page_.posts = Object.keys(page_.posts)
    // console.log(page_);
    return {...pages.get(pageKey), posts: Object.keys(page_.posts)}
    // return {posts:{keys:[]}};
  }

  updatePage(item, pageKey, added, itemPagePath_) {

    // console.log(item, pageKey, added)

    const pageItemPath = "/pages/" + pageKey + "/posts/" + item.id
    const itemPagePath = "/posts/" + item.id + "/pages/" + pageKey

    var updates = {};
    updates[pageItemPath] = added
      ? true
      : null;
    updates[itemPagePath] = added
      ? true
      : null;
    // console.log(updates);
    this.firebase.database().ref().update(updates).then(() => {
      // console.log('it did it but it be trippn bro');
    });
  }

  update = (id, data) => {
    this.pagesRef.update({[id]: data})
  }

  del = (id) => {
    this.pagesRef.child(id).remove();
  }

}
export default PagesStore
