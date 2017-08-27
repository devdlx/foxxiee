/* eslint-disable */

import React from 'react';
// import {Link} from 'react-router'
// import Headroom from 'react-headroom'

// import {rhythm} from '../utils/typography'

import {SoundPlayerContainer} from 'react-soundplayer/addons';
import {Soundcloud, config, clientIdURI} from '../soundcloud/soundcloud'
import ReactPlayer from 'react-player'

import {observer} from "mobx-react";

import './player.css'

const Player = observer(class Player extends React.Component {
  
  state = {
    
  }
    
  constructor(props) {
    super()
//   console.log(props)
  }

  componentDidMount() {
//     console.log('Player Props: ', this.props.player)
    const {player} = this.props
    this.player = player
console.log(player.loadAllTracks())
  }

  playTrackAtIndex(playlistIndex) {
    // console.log(this.state.tracks)
    const {tracks} = this.state
    if (!tracks.length) {
      return
    }
    this.setState({currentTrack: tracks[playlistIndex]})
  }

  nextTrack() {
    // console.log("play nextTrack");
    // console.log(this.state.activeIndex + 1 === this.state.tracks.length);
    if (this.state.activeIndex + 1 === this.state.tracks.length) {
      this.setState({activeIndex: 0})
    } else {
      this.setState({
        activeIndex: this.state.activeIndex + 1
      })
    }

  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state === nextState) {
      return false;
    }
    return true;
  }
  

  nextButton() {
    this.props.nextTrack();
  }
  playPause = () => {
    this.player.playPause()
  }
  stop = () => {
    this.setState({ url: null, playing: false })
  }
  setVolume = e => {
    this.setState({ volume: parseFloat(e.target.value) })
  }
  setPlaybackRate = e => {
    console.log(parseFloat(e.target.value))
    this.setState({ playbackRate: parseFloat(e.target.value) })
  }
  onSeekMouseDown = e => {
    this.setState({ seeking: true })
  }
  onSeekChange = e => {
    this.setState({ played: parseFloat(e.target.value) })
  }
  onSeekMouseUp = e => {
    this.setState({ seeking: false })
    this.player.seekTo(parseFloat(e.target.value))
  }
  onProgress = state => {
    // We only want to update time slider if we are not currently seeking
    if (!this.state.seeking) {
      this.setState(state)
    }
  }
  
  
  render2(){
    
    
//     console.log(this.state.currentTrack.permalink_url || '  -_-   permalink_url: none yet')
    
    const {permalink_url} = this.state.currentTrack || '';
    const clientId = config.clientId;
    const {
      url, playing, volume,
      played, loaded, duration,
      playbackRate,
    } = this.state
    
    return(
      
      <header className="player mdc-toolbar mdc-toolbar--theme-dark">
            <div className="mdc-toolbar__row">
              <section className="mdc-toolbar__section mdc-toolbar__section--align-start">
                <ReactPlayer url={permalink_url} ref={player => { this.player = player }}
              className='react-player'
              width='36px'
              height='36px'
              playing={playing}
              playbackRate={playbackRate}
              volume={volume}
             
              onReady={() => console.log('onReady')}
              onStart={() => console.log('onStart')}
              onPlay={() => this.setState({ playing: true })}
              onPause={() => this.setState({ playing: false })}
              onBuffer={() => console.log('onBuffer')}
              onEnded={() => this.setState({ playing: false })}
              onError={e => console.log('onError', e)}
              onProgress={this.onProgress}
              onDuration={duration => this.setState({ duration })}
              soundcloudConfig={{clientId}}
              />
                <div className="meta-wrapper">
                  <h1 className="mdc-typography--title trackTitle">Title</h1>
                  <h1 className="mdc-typography--caption trackUser">Title</h1>
                </div>
              </section>
              <section className="mdc-toolbar__section mdc-toolbar__section--align-end" role="toolbar">
                <button className="material-icons mdc-toolbar__icon mdc-button mdc-button--raised mdc-button--accent player-button-back" aria-label="Download" alt="Download">fast_rewind</button>
                <button className="material-icons mdc-toolbar__icon mdc-button mdc-button--raised mdc-button--accent player-button-play" aria-label="Print this page" alt="Print this page" onClick={this.playPause} >play_arrow</button>
                <button className="material-icons mdc-toolbar__icon mdc-button mdc-button--raised mdc-button--accent player-button-next" aria-label="Bookmark this page" alt="Bookmark this page">fast_forward</button>
      
              </section>
            </div>
          </header>
      )
    
    }
    
    
    render(){
    
    
//     console.log(this.state.currentTrack.permalink_url || '  -_-   permalink_url: none yet')
    
    const {permalink_url} = this.state.currentTrack || '';
    const clientId = config.clientId;
    const {
      url, playing, volume,
      played, loaded, duration,
      playbackRate,
    } = this.props.player
    
    const {player} = this.props
    
    return(
      
      <header className="player mdc-toolbar mdc-toolbar--theme-dark">
            <div className="mdc-toolbar__row">
              <section className="mdc-toolbar__section mdc-toolbar__section--align-start">
                <ReactPlayer url={player.active.permalink_url} ref={reactplayer => { this.reactplayer = reactplayer }}
              className='react-player'
              width='36px'
              height='36px'
              playing={playing}
              playbackRate={playbackRate}
              volume={volume}
             
//               onReady={() => console.log('onReady')}
//               onStart={() => console.log('onStart')}
              onPlay={() => player.playing= true }
              onPause={() => this.setState({ playing: false })}
              onBuffer={() => console.log('onBuffer')}
              onEnded={() => this.setState({ playing: false })}
              onError={e => console.log('onError', e)}
//               onProgress={this.onProgress}
//               onDuration={duration => this.setState({ duration })}
              soundcloudConfig={{clientId}}
              />
                <div className="meta-wrapper">
                  <h1 className="mdc-typography--title trackTitle">{player.active.title}</h1>
                  <h1 className="mdc-typography--caption trackUser">{player.active.subtitle}</h1>
                </div>
              </section>
              <section className="mdc-toolbar__section mdc-toolbar__section--align-end" role="toolbar">
                <button className="material-icons mdc-toolbar__icon mdc-button mdc-button--raised mdc-button--accent player-button-back" aria-label="Download" alt="Download">fast_rewind</button>
                <button className="material-icons mdc-toolbar__icon mdc-button mdc-button--raised mdc-button--accent player-button-play" aria-label="Print this page" alt="Print this page" onClick={this.playPause} >play_arrow</button>
                <button className="material-icons mdc-toolbar__icon mdc-button mdc-button--raised mdc-button--accent player-button-next" aria-label="Bookmark this page" alt="Bookmark this page">fast_forward</button>
      
              </section>
            </div>
          </header>
      )
    
    }

  }
  )

  export default Player;
