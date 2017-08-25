import React from 'react';
// import {Link} from 'react-router'
// import Headroom from 'react-headroom'

// import {rhythm} from '../utils/typography'

import {SoundPlayerContainer} from 'react-soundplayer/addons';
import Soundcloud from '../soundcloud/soundcloud'
import ReactPlayer from 'react-player'

import './player.css'

// PrevIconSVG
let scAPI = {
  ClientId: Soundcloud.client_key,
  clientIdURI: `?client_id=${Soundcloud.client_key}`,
  scUserName: Soundcloud.username
}

class PlayerContainer extends React.Component {

  playPauseToggle() {
    let {playing, soundCloudAudio} = this.props;
    if (playing) {
      soundCloudAudio.pause();
    } else {
      soundCloudAudio.play();
    }
  }

  nextButton() {
    this.props.nextTrack();
  }

  render() {
    let {trackInfo} = this.props;
    //currentTime
    return (

      <div className='playerContainer' >

        <div className='player-meta-data'>
          <div >
            <h2 className='player-track-title'>{trackInfo
                ? trackInfo.title
                : 'No song loaded'}</h2>
          </div>
          <div >
            <h3 className='player-track-user'>{trackInfo
                ? trackInfo.user.username
                : '...'}</h3>
          </div>
        </div>

        <div  className="buttons-wrapper">
          <button icon={this.props.playing
            ? "pause"
            : "caret-right"} onClick={this.playPauseToggle.bind(this)} className='player-play-button'/>
          <button icon={"fast-forward"} onClick={this.nextButton.bind(this)} className='player-next-button'/>
        </div>

      </div>
    );
  }
}

class Player extends React.Component {
  
  state = {
    url: null,
    playing: true,
    volume: 0.8,
    played: 0,
    loaded: 0,
    duration: 0,
    tracks: [],
    currentTrack: {}
  }
    
    

  constructor() {
    super()
  }

  componentDidMount() {
    let header = new Headers({'Access-Control-Allow-Origin': '*'});
    let sentData = {
      method: 'get',
      mode: 'cors',
      header: header
    };
    const scUserDataURI = `https://api.soundcloud.com/users/${scAPI.scUserName}${scAPI.clientIdURI}`
    // let scUser = {};
    // fetch soundcloud user profile
    fetch(scUserDataURI, sentData).then((resp) => resp.json()).then((data) => {
      if (data.errors) {
        console.error('Error: ', data.errors);
        return;
      }
      // console.log('Data: ', data);
      this.setState({scUser: data});
      // fetch soundcloud user trackUser
      const scUserTracksURI = `https://api.soundcloud.com/users/${data.id}/tracks${scAPI.clientIdURI}`;
      return fetch(scUserTracksURI, sentData);
    }).then((resp) => resp.json()).then((tracks) => {
//       console.log(tracks);
      if (tracks.length) {
        this.setState({currentTrack: tracks[0], tracks})
      }
    }).catch((err) => {
      console.error('Error: ', err);
    })
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
  
    playPauseToggle() {
    let {playing, soundCloudAudio} = this.props;
    if (playing) {
      soundCloudAudio.pause();
    } else {
      soundCloudAudio.play();
    }
  }

  nextButton() {
    this.props.nextTrack();
  }
  playPause = () => {
    this.setState({ playing: !this.state.playing })
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
  
  
  render(){
    
    
//     console.log(this.state.currentTrack.permalink_url || '  -_-   permalink_url: none yet')
    
    const {permalink_url} = this.state.currentTrack || '';
    const clientId = Soundcloud.client_key;
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
              width='100%'
              height='100%'
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

  render2() {
    const {activeIndex} = this.state;
    const trackInfo = this.state.tracks[activeIndex] || {
        user: {}
      }
      let streamUrl
      // let resolveUrl
      if (activeIndex > -1) {
        // console.log(this.state.tracks);
        streamUrl = this.state.tracks[activeIndex].stream_url
        // resolveUrl = this.state.tracks[activeIndex].permalink_url
        // this.sc.soundCloudAudio.play({streamUrl: streamUrl})
        // console.log(streamUrl);\
                    // console.log(this.sc.soundCloudAudio);
        // #play
        // this.sc.soundCloudAudio.preload(streamUrl)
        // this.sc.soundCloudAudio.play()

      }

      return (
          <div className="player ">
            <SoundPlayerContainer clientId={this.state.clientId} ref={(sc) => {
              this.sc = sc;
            }}>
              <PlayerContainer trackInfo={trackInfo} nextTrack={this.nextTrack.bind(this)}/>
            </SoundPlayerContainer>
          </div>
      )

    }
  }

  export default Player;

  const styles = {

    menuContainer: {
      display: 'flex',
      flexDirection: 'row',
      padding: 8,
      justifyContent: 'space-around',
      alignItems: 'center',
      maxWidth: 670,
      width: "100%"

    },

    menuWrapper: {
      display: 'flex',
      flexDirection: 'row',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      backgroundColor: '#EED991',
      justifyContent: 'center'
    },

    menuItem: {
      display: 'flex',
      color: '#D32337',
      background: 'transparent',
      border: 'none',
      textDecoration: 'none'
    },

    trackTitle: {
      color: '#EED991',
      margin: 0,
      padding: 0,
      fontSize: 16,
      height: 20,
      marginBottom: 4,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    },

    trackUser: {
      color: 'rgba(255, 255, 255, .9)',
      margin: 0,
      padding: 0,
      fontSize: 16,
      height: 20,
      marginBottom: 0
    },

    redColor: {
      color: '#D32337'
    },

    playerContainer: {
      display: 'flex',
      flexDirection: 'row',
      background: '#D32337',
      // position: 'fixed',
      // bottom: 0,
      // left: 0,
      // right: 0

    },

    metaContainer: {
      display: 'flex',
      flex: 2,
      paddingLeft: 16,
      paddingRight: 16,
      paddingTop: 8,
      paddingBottom: 12,
      flexDirection: 'column',
      width: '76%'
    },

    controlsContainer: {
      display: 'flex',
      flex: 1,
      marginRight: 12,
      marginLeft: 12,
      alignItems: 'center'

    },

    controlsPlayContainer: {
      display: 'flex',
      flex: 1,
      marginRight: 12,
      color: '#fff',
      background: 'transparent',
      border: 'none'
    },

    controlsNextContainer: {
      display: 'flex',
      flex: 1,
      color: '#fff',
      background: 'transparent',
      border: 'none'

    }

  }

