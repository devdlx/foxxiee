/* eslint-disable */
import {
  extendObservable,
  computed,
  map,
  toJS
} from 'mobx'

import {
  Soundcloud
} from '../components/soundcloud/soundcloud'


class PlayerStore {

  loading = true
  active = {
    title: 'unloaded'
  }
  url: null
  playing: false
  volume: 0.8
  played: 0
  loaded: 0
  duration: 0
  currentTrack: {}

  tracks = []

  constructor() {

    //     console.log('Player Store')
    extendObservable(this, {
      loading: this.loading,
      active: this.active,
      url: this.url,
      playing: this.playing,
      volume: this.volume,
      played: this.played,
      loaded: this.loaded,
      duration: this.duration,
      playbackRate: this.playbackRate,
      tracks: this.tracks
    });
  }


  loadAllTracks() {
    Soundcloud.fetchTracksPlayer().then((tracks) => {
      this.active = tracks[0]
      this.tracks = tracks
    })


    //     console.log(Soundcloud.fetchTracksPlayer())
  }


  playSoundcloudTrack(track) {
    this.active = track
  }

  playPause() {
    this.playing = !this.playing;
  }

}

export default PlayerStore