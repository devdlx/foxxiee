/* eslint-disable */
import * as Fetch from 'isomorphic-fetch';

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

export const config = {
  clientId: '7ce7c8ce794f080121b96a32aeff64f4',
  client_key: '7ce7c8ce794f080121b96a32aeff64f4',
  secret_key: 'f8bea6c179387b518fed1f4572020093',
  username2: 'sizzur_dlx',
  username: 'ahkiki_la_foxxiee'
};

export const clientIdURI = `?client_id=${config.clientId}`;

// config.fetchSoundcloud = (username) => {
//   let obj = {};
//   if (username === 'sizzur_dlx') {
//     obj = {
//       ...{
//         soundcloud,
//       },
//     };
//   }
//
//   return obj;
// };
//
// export default config;

let header = new Headers({
  'Access-Control-Allow-Origin': '*'
});
let sentData = {
  method: 'get',
  mode: 'cors',
  header: header
};

const scUserDataURI = `https://api.soundcloud.com/users/${config.username}${clientIdURI}`

let tracks = map({})
let profile = map({})

class SoundcloudStore {


  scUserTracksURI = ''

  constructor(firebase) {

    //     console.log('Soundcloud Store')
    //           extendObservable(this, {
    //             profile: this.profile,
    //             tracks: this.tracks
    //           });


    this.firebase = firebase;
    this.auth = firebase.auth();
    this.database = firebase.database();
    this.storage = firebase.storage();
    this.ref = firebase.database().ref('addons/Soundcloud')
    this.tracksRef = firebase.database().ref('posts')


    this.tracksRef.on('value', (snap) => {
      const items = snap.val();
      // console.dri('Soundcloud Tracks', snap.val())
      runInAction(() => {
        tracks.replace(items)
        // this.tracks.push({...items[0], key:snap.key})
      })
    })


    // console.log('this.fetchAll')
    //this.fetchAll();

  }


get tracks() {
  return tracks
}


  fetchAll() {


    //     console.log('Fetch all')

    window.fetch(scUserDataURI, sentData).then((resp) => resp.json()).then((data) => {
      if (data.errors) {
        console.error('Error: ', data.errors);
        return;
      }
      //       console.log('Data: ', data);

      // fetch soundcloud user trackUser
      //       this.profile = data
      //       console.dir(this)
      this.ref.child(`/profile`).set(data)
      this.scUserTracksURI = `https://api.soundcloud.com/users/${data.id}/tracks${clientIdURI}`;

      window.fetch(this.scUserTracksURI, sentData).then((resp) => resp.json()).then((tracks) => {
        //         console.log(tracks[0]);
        if (tracks.length) {

          tracks.forEach((data, index) => {

            let cover = data.artwork_url || data.user.avatar_url || ''
            cover = cover.replace('large', 't500x500')
            //             file = file.substr(0, file.lastIndexOf(".")) + ".htm";
            //             console.log(cover)
            let created_at = new Date(data.created_at).getTime()
            //             console.log(created_at)

            const savedTrack = {
              data,
              id: data.id,
              title: data.title,
              subtitle: data.user.username,
              cover: cover,
              created_at,
              type:'soundcloud'

            };


            this.tracksRef.child(`${data.id}`).update(savedTrack)
          });
        }
      }).catch((err) => {
        //       console.error('Error: ', err);
        //       return err;
      });


    });




  }

}
export default SoundcloudStore
