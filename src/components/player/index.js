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

import * as store from '../../store';

const Player = observer(class Player extends React.Component {

  state = {

  }

  constructor(props) {
    super()
//   console.log(props)
  }

  componentDidMount() {
//     console.log('Player Props: ', this.props.player)
//     const {player} = this.props
    this.player = store.Player
  // console.log(store.Player.loadAllTracks())
  store.Player.loadAllTracks()
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

  clickPlayer = e =>{
    console.log(e);
  }


    render(){


//     console.log(this.state.currentTrack.permalink_url || '  -_-   permalink_url: none yet')

    const {permalink_url} = this.state.currentTrack || '';
    const clientId = config.clientId;
    const {
      url, playing, volume,
      played, loaded, duration,
      playbackRate,
    } = store.Player

    const {Player} = store

    return(
<div className="player">

 <div className="player-container" >
 <ReactPlayer url={"https://www.youtube.com/watch?v=ouNeYI1lHh0"} ref={reactplayer => { this.reactplayer = reactplayer }}
   className='react-player'
   width='100%'
   height=''
   playing={playing}
  playbackRate={playbackRate}
   volume={volume}

 //               onReady={() => console.log('onReady')}
 //               onStart={() => console.log('onStart')}
 onPlay={() => this.setState({ playing: true })}
 onPause={() => this.setState({ playing: false })}
 onBuffer={() => console.log('onBuffer')}
 onEnded={() => this.setState({ playing: false })}
 onError={e => console.log('onError', e)}
 //               onProgress={this.onProgress}
 //               onDuration={duration => this.setState({ duration })}
 soundcloudConfig={{clientId}}
 onClick={this.clickPlayer}

 style={{width: 200}}
 />
 </div>


 <ul className="mdc-list mdc-list--two-line mdc-list--avatar-list">
               <li className="mdc-list-item">
               <span className="mdc-list-item__start-detail grey-bg"></span>
               <span className="mdc-list-item__text">
                 Two-line item
                 <span className="mdc-list-item__text__secondary">Secondary text</span>
               </span>
             </li>
             <li className="mdc-list-item">
               <span className="mdc-list-item__start-detail grey-bg"></span>
               <span className="mdc-list-item__text">
                 Two-line item
                 <span className="mdc-list-item__text__secondary">Secondary text</span>
               </span>
             </li>
             <li className="mdc-list-item">
               <span className="mdc-list-item__start-detail grey-bg"></span>
               <span className="mdc-list-item__text">
                 Two-line item
                 <span className="mdc-list-item__text__secondary">Secondary text</span>
               </span>
             </li>
             <li className="mdc-list-item">
             <span className="mdc-list-item__start-detail grey-bg"></span>
             <span className="mdc-list-item__text">
               Two-line item
               <span className="mdc-list-item__text__secondary">Secondary text</span>
             </span>
           </li>
           <li className="mdc-list-item">
             <span className="mdc-list-item__start-detail grey-bg"></span>
             <span className="mdc-list-item__text">
               Two-line item
               <span className="mdc-list-item__text__secondary">Secondary text</span>
             </span>
           </li>
           <li className="mdc-list-item">
             <span className="mdc-list-item__start-detail grey-bg"></span>
             <span className="mdc-list-item__text">
               Two-line item
               <span className="mdc-list-item__text__secondary">Secondary text</span>
             </span>
           </li>
           <li className="mdc-list-item">
           <span className="mdc-list-item__start-detail grey-bg"></span>
           <span className="mdc-list-item__text">
             Two-line item
             <span className="mdc-list-item__text__secondary">Secondary text</span>
           </span>
         </li>
         <li className="mdc-list-item">
           <span className="mdc-list-item__start-detail grey-bg"></span>
           <span className="mdc-list-item__text">
             Two-line item
             <span className="mdc-list-item__text__secondary">Secondary text</span>
           </span>
         </li>
         <li className="mdc-list-item">
           <span className="mdc-list-item__start-detail grey-bg"></span>
           <span className="mdc-list-item__text">
             Two-line item
             <span className="mdc-list-item__text__secondary">Secondary text</span>
           </span>
         </li>
         <li className="mdc-list-item">
         <span className="mdc-list-item__start-detail grey-bg"></span>
         <span className="mdc-list-item__text">
           Two-line item
           <span className="mdc-list-item__text__secondary">Secondary text</span>
         </span>
       </li>
       <li className="mdc-list-item">
         <span className="mdc-list-item__start-detail grey-bg"></span>
         <span className="mdc-list-item__text">
           Two-line item
           <span className="mdc-list-item__text__secondary">Secondary text</span>
         </span>
       </li>
       <li className="mdc-list-item">
         <span className="mdc-list-item__start-detail grey-bg"></span>
         <span className="mdc-list-item__text">
           Two-line item
           <span className="mdc-list-item__text__secondary">Secondary text</span>
         </span>
       </li>
       <li className="mdc-list-item">
       <span className="mdc-list-item__start-detail grey-bg"></span>
       <span className="mdc-list-item__text">
         Two-line item
         <span className="mdc-list-item__text__secondary">Secondary text</span>
       </span>
     </li>
     <li className="mdc-list-item">
       <span className="mdc-list-item__start-detail grey-bg"></span>
       <span className="mdc-list-item__text">
         Two-line item
         <span className="mdc-list-item__text__secondary">Secondary text</span>
       </span>
     </li>
     <li className="mdc-list-item">
       <span className="mdc-list-item__start-detail grey-bg"></span>
       <span className="mdc-list-item__text">
         Two-line item
         <span className="mdc-list-item__text__secondary">Secondary text</span>
       </span>
     </li>
             </ul>








      <header className="player-controls mdc-toolbar mdc-toolbar--theme-dark-FFF">
            <div className="  mdc-toolbar__row">
              <section className="mdc-toolbar__section mdc-toolbar__section--align-start">

                <div className="meta-wrapper">
                  <h1 className="mdc-typography--title trackTitle">{Player.active.title}</h1>
                  <h1 className="mdc-typography--caption trackUser">{Player.active.subtitle}</h1>
                </div>
              </section>
              <section className="mdc-toolbar__section mdc-toolbar__section--align-end player-controls-buttons" role="toolbar">
                <button className="material-icons mdc-toolbar__icon mdc-button mdc-button--raised mdc-button--accent player-button-back" aria-label="Download" alt="Download">fast_rewind</button>
                  {
                    !this.state.playing &&
                    <button className="material-icons mdc-toolbar__icon mdc-button mdc-button--raised mdc-button--accent player-button-play" aria-label="Print this page" alt="Print this page" onClick={this.playPause} >play_arrow</button>
                  }
                  {
                    this.state.playing &&
                    <button className="material-icons mdc-toolbar__icon mdc-button mdc-button--raised mdc-button--accent player-button-pause" aria-label="Pause" alt="Pause" onClick={this.playPause} >pause</button>
                  }
                <button className="material-icons mdc-toolbar__icon mdc-button mdc-button--raised mdc-button--accent player-button-next" aria-label="Bookmark this page" alt="Bookmark this page">fast_forward</button>

              </section>
            </div>
          </header>
          </div>

      )

    }

  }
  )

  export default Player;
