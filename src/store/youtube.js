/* eslint-disable */
import * as Fetch from 'isomorphic-fetch';

import {extendObservable, computed, toJS, observable, runInAction} from 'mobx';
const {map} = observable;

const Youtube = {
  api_key: 'AIzaSyDvobc7q9T-jf9XEQIyPLSA4Jh8E0u49Ss'
};

export const fetchYoutube = (returnCount = 0) => {
  // const apiuri =

  // let header = new Headers({'Access-Control-Allow-Origin': '*'});
  // let sentData = {
  //   method: 'get',
  //   mode: 'cors',
  //   header: header
  // };
  //playlistId=PL19ohT5PbRoyNcSPLn7dgwZ6Y39QWaWBF

  return fetch("https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=UUN0-h9TsT6xwe3gb-rSykkw&key=" + Youtube.api_key).then((resp) => {
    return resp.json();
    // console.log(resp);
  }).then((data) => {
    // console.log(data);

    let items = [];

    for (var video in data.items) {
      if (data.items.hasOwnProperty(video)) {
        // console.log(data.items[video].snippet);
        data.items[video].snippet.videoId = data.items[video].snippet.resourceId.videoId;
        data.items[video].snippet.thumbnail = data.items[video].snippet.thumbnails.medium.url || data.items[video].snippet.thumbnails.default.url;
        //         console.log(data.items[video].snippet.thumbnails);
        items.push(data.items[video].snippet)
      }
    }

    if (returnCount) {
      return items.slice(0, returnCount);
    }

    return items;
  }).catch((err) => {
    console.log(err);
  });

}

export const fetchYoutubeByKey = (key) => {

  return fetch(`https://www.googleapis.com/youtube/v3/videos?id=${key}&key=${Youtube.api_key}&part=snippet%2CcontentDetails%2Cstatistics`).then((resp) => {
    return resp.json();
    // console.log(resp);
  }).then((data) => {
    console.log(data);
    const item = {}
    item.thumbnail = data.items[0].snippet.thumbnails.default.url
    item.id = key
    item.title = data.items[0].snippet.title
    item.description = data.items[0].snippet.description

    // Channel Info
    // item.channel = {};
    item.channelTitle = data.items[0].snippet.channelTitle

    return item;
  }).catch((err) => {
    console.log(err);
  });

}

let videos = map({})
let settings = map({})

class YoutubeStore {

  constructor(firebase) {

    this.firebase = firebase;
    this.auth = firebase.auth();
    this.database = firebase.database();
    this.storage = firebase.storage();
    this.ref = firebase.database().ref('addons/Youtube')
    this.videosRef = firebase.database().ref('posts')

    this.videosRef.on('value', (snap) => {
      const items = snap.val();
      // console.dri('Soundcloud Tracks', snap.val())
      runInAction(() => {
        videos.replace(items)
        // this.videos.push({...items[0], key:snap.key})
      })
    })

    // console.log('this.fetchAll')
    //this.fetchAll();

  }

  get videos() {
    return videos
  }

  fetchAll() {

    //     console.log('Fetch all')

    window.fetch("https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=UUN0-h9TsT6xwe3gb-rSykkw&key=" + Youtube.api_key).then((resp) => resp.json()).then((data) => {
      if (data.errors) {
        console.error('Error: ', data.errors);
        return;
      }

      const items = data.items
      console.log(items);

      if (items.length) {

        items.forEach((video, index) => {
          // console.log(data, index);
          const id = video.snippet.resourceId.videoId
          console.log(id);
          const title = video.snippet.title
          const subtitle = video.snippet.channelTitle
          const cover = video.snippet.thumbnails.medium.url || video.snippet.thumbnails.default.url;
          const created_at = new Date(video.snippet.publishedAt).getTime()
          //             console.log(created_at)

          const savedTrack = {
            data,
            id,
            title,
            subtitle,
            cover: cover,
            created_at,
            type:'youtube'
          };
          // console.log(savedTrack);
          //
          this.videosRef.child(`${id}`).update(savedTrack)
        });
      }

    });

  }

}
export default YoutubeStore
