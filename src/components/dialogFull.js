/* eslint-disable */

// React imports
import React, {PureComponent} from 'react';
import {observer} from "mobx-react";

// Material Components Web
// Drawer
import {MDCDialog, MDCDialogFoundation} from "@material/dialog/dist/mdc.dialog";
import ReactPlayer from 'react-player'


import Player from './player'
import './player/player.css'


import {Soundcloud, config, clientIdURI} from './soundcloud/soundcloud'

import * as store from '../store';


const DialogFull = observer(class DialogFull extends PureComponent {
  state = {
    waiting: true
  }

  componentDidMount() {
    const dialog = new MDCDialog(this.dialogRef)
    this.dialog = dialog
    this.player = store.Player
  // console.log(store.Player.loadAllTracks())
  store.Player.loadAllTracks()
    // this.dialog.show()
  }

  show(item) {

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

  componentWillUpdate() {}

  render() {

    const {permalink_url} = this.state.currentTrack || '';
    const clientId = config.clientId;
    const {
      url, playing, volume,
      played, loaded, duration,
      playbackRate,
    } = store.Player

    const {Player} = store

    return (
      <aside id="mdc-dialog-with-list" className="mdc-dialog dialog-full player-dialog" role="alertdialog" aria-labelledby="mdc-dialog-with-list-label" aria-describedby="mdc-dialog-with-list-description" ref={(dialog) => {
        this.dialogRef = dialog
      }}>
        <div className="mdc-dialog__surface">
          <header className="mdc-dialog__header">
            <h2 id="mdc-dialog-with-list-label" className="mdc-dialog__header__title">
              {this.props.title}
            </h2>
          </header>

          <div className="player-container" >
          <ReactPlayer url={"https://www.youtube.com/watch?v=ouNeYI1lHh0"} ref={reactplayer => { this.reactplayer = reactplayer }}
            className='react-player'
            width='100vw'
            height='100%'
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
          />
          </div>

          <section id="mdc-dialog-with-list-description" className="mdc-dialog__body mdc-dialog__body--scrollable"></section>
          <footer className="mdc-dialog__footer">

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


            <button type="button" className="mdc-button mdc-dialog__footer__button mdc-dialog__footer__button--accept">Close</button>
          </footer>
        </div>
        <div className="mdc-dialog__backdrop"></div>
      </aside>
    );
  }

})

export {DialogFull}

export default DialogFull

//        <button type="button" className="mdc-button mdc-dialog__footer__button mdc-dialog__footer__button--cancel">Decline</button>
