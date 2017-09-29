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

const posts = map({})


class PostsStore {
  waiting = true

  constructor(firebase) {

    extendObservable(this, {
      waiting: this.waiting
    })

    this.firebase = firebase;
    this.auth = firebase.auth();
    this.database = firebase.database();
    this.postsRef = firebase.database().ref('posts')
    // Initiates Firebase auth and listen to auth state changes.

    this.postsRef.on('value', (_child) => {
      // console.log(_child.val());
      if (_child.val()) {
        const posts_ = _child.val()
        posts.replace(posts_)
      }

      this.waiting = false
    })

  }

  get posts() {
    return posts
  }

  post(postKey) {
    // if (posts.keys().length) {
    //   console.log('has em');
    // }
    // console.log(posts.keys());
    // console.log(posts.has(postKey), posts.get(postKey))
    let post_ = posts.has(postKey) ? posts.get(postKey) : {title:'404 Bruh'}
    // console.log(posts.get(postKey));
    return post_
    // return {title:'none'};
  }

  updatePage(item, postKey, added) {

    console.log(item, postKey, added)

    const postItemPath = "/posts/"+postKey+"/posts/" + item.id
    const itemPagePath = "/addons/Soundcloud/tracks/" + item.id + "/posts/" + postKey

    var updates = {};
    updates[postItemPath] = added;
    updates[itemPagePath] = added;
    // console.log(updates);
    this.firebase.database().ref().update(updates).then(() => {
      // console.log('it did it but it be trippn bro');
    });
  }



  update = (id, data) => {
    this.postsRef.update({
      [id]: data
    })
  }

  del = (id) => {
    this.postsRef.child(id).remove();
  }

}
export default PostsStore
