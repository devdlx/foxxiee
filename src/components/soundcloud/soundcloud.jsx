/* eslint-disable */
// import soundcloud from './test'

import * as Fetch from 'isomorphic-fetch';
// console.log(fetch)

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

let header = new Headers({'Access-Control-Allow-Origin': '*'});
let sentData = {
  method: 'get',
  mode: 'cors',
  header: header
};

const scUserDataURI = `https://api.soundcloud.com/users/${config.username}${clientIdURI}`
let scUser = {};

// fetch soundcloud user profile
const fetchTracksByUser = (returnCount = 0) => {
  // console.log(window.fetch)
  return window.fetch(scUserDataURI, sentData).then((resp) => resp.json()).then((data) => {
    if (data.errors) {
      console.error('Error: ', data.errors);
      return;
    }
    // console.log('Data: ', data);

    // fetch soundcloud user trackUser
    const scUserTracksURI = `https://api.soundcloud.com/users/${data.id}/tracks${clientIdURI}`;
    return window.fetch(scUserTracksURI, sentData);
  }).then((resp) => resp.json()).then((tracks) => {
    //     console.log(tracks[0]);
    if (tracks.length) {

      tracks.forEach(function(item, index) {
        tracks[index] = {
          ...item,
          key: item.id
        };
      });
      //           tracks[i].key = tracks[i].id;

      if (returnCount) {
        return tracks.slice(0, returnCount);
      }

      return tracks;
    }
  }).catch((err) => {
    console.error('Error: ', err);
    return err;
  })
}

const fetchSoundcloudByKey = (key) => {

  return fetch(`https://api.soundcloud.com/tracks/${key}/${clientIdURI}`).then((resp) => {
    return resp.json();
    // console.log(resp);
  }).then((data) => {
    // console.log(data);
    return data;
  }).catch((err) => {
    console.log(err);
  });

}

const fetchTracksPlayer = () => {
  // Fetch list from firebase

  const scUserDataURI = `https://api.soundcloud.com/users/${config.username}${clientIdURI}`

  // fetch soundcloud user profile
  return fetch(scUserDataURI, sentData).then((resp) => resp.json()).then((data) => {
    if (data.errors) {
      console.error('Error: ', data.errors);
      return;
    }

    // fetch soundcloud user trackUser
    const scUserTracksURI = `https://api.soundcloud.com/users/${data.id}/tracks${clientIdURI}`;
    return fetch(scUserTracksURI, sentData);
  }).then((resp) => resp.json()).then((tracks) => {
    //       console.log(tracks);
    if (tracks.length) {
      return tracks
    }
  }).catch((err) => {
    console.error('Error: ', err);
  })
}



const getUserProfile = () => {
  // Fetch list from firebase

  const scUserDataURI = `https://api.soundcloud.com/users/${config.username}${clientIdURI}`

  // fetch soundcloud user profile
  return fetch(scUserDataURI, sentData).then((resp) => resp.json()).then((data) => {
    if (data.errors) {
      console.error('Error: ', data.errors);
      return;
    }

    // fetch soundcloud user trackUser
    const scUserTracksURI = `https://api.soundcloud.com/users/${data.id}/tracks${clientIdURI}`;
    return fetch(scUserTracksURI, sentData);
  }).then((resp) => resp.json()).then((tracks) => {
    //       console.log(tracks);
    if (tracks.length) {
      return tracks
    }
  }).catch((err) => {
    console.error('Error: ', err);
  })
}





const Soundcloud = {
  config,
  fetchSoundcloudByKey,
  fetchTracksByUser,
  fetchTracksPlayer,
  getUserProfile
}

export {Soundcloud}
