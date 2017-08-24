import * as Fetch from 'isomorphic-fetch';

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

  return fetch("https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=PL19ohT5PbRoyNcSPLn7dgwZ6Y39QWaWBF&key=" + Youtube.api_key).then((resp) => {
    return resp.json();
    // console.log(resp);
  }).then((data) => {
    // console.log(data);

    let items = [];

    for (var video in data.items) {
      if (data.items.hasOwnProperty(video)) {
        // console.log(data.items[video].snippet);
        data.items[video].snippet.videoId = data.items[video].snippet.resourceId.videoId;
        data.items[video].snippet.thumbnail = data.items[video].snippet.thumbnails.default.url;
        // console.log(data.items[video].snippet.thumbnails.default.url);
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
