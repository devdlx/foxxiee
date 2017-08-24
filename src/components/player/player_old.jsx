import React from 'react'
import {Link} from 'react-router'
import Headroom from 'react-headroom'

// import {rhythm} from '../utils/typography'

import { Icons} from 'react-soundplayer/components';
// PlayButton, NextButton
import {SoundPlayerContainer} from 'react-soundplayer/addons';
const {SoundCloudLogoSVG, PlayIconSVG, PauseIconSVG, NextIconSVG, PrevIconSVG} = Icons;

let scAPI = {
  ClientId: config.scClientId,
  clientIdURI: `?client_id=${config.scClientId}`,
  scUserName: config.scUserName
}

class Player extends React.Component {

  constructor() {
    super();
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

  render() {
    let {trackInfo, currentTime} = this.props;

    return (
      <div style={styles.playerContainer}>
        <div style={styles.metaContainer}>

          <div style={styles.trackTitle}>{trackInfo
              ? trackInfo.title
              : 'No song loaded'}</div>

          <div style={styles.trackUser}>{trackInfo
              ? trackInfo.user.username
              : '...'}</div>

        </div>

        <div className="controls" style={styles.controlsContainer}>
          <button style={styles.controlsPlayContainer} onClick={this.playPauseToggle.bind(this)}>
            {this.props.playing
              ? <PauseIconSVG/>
              : <PlayIconSVG/>}

          </button>
          <button style={styles.controlsNextContainer} onClick={this.nextButton.bind(this)}>
            <NextIconSVG/>
          </button>
        </div>
      </div>
    );
  }
}

class Template extends React.Component {

  constructor() {
    super()

    this.state = {
      activeIndex: -1,
      clientId: config.clientId,
      tracks: []
    };
  }

  componentDidMount() {

    let header = new Headers({'Access-Control-Allow-Origin': '*'});
    let sentData = {
      method: 'get',
      mode: 'cors',
      header: header
    };
    const scUserDataURI = `https://api.soundcloud.com/users/${scAPI.scUserName}${scAPI.clientIdURI}`
    let scUser = {};
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
      // console.log(tracks);

      if (tracks.length) {
        this.setState({activeIndex: 0, tracks})
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
    this.setState({streamUrl: tracks[0].stream_url})
    this.sc.soundCloudAudio.play({streamUrl: tracks[0].stream_url})

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

  renderHeader1() {
    return (
      <Headroom wrapperStyle={{}} style={{
        background: 'lightgray',
        padding: '1rem'
      }}>

        <Link to={prefixLink('/')}>Home</Link>
        <Link to={prefixLink('/about1')}>About</Link>
        <Link to={prefixLink('/music')}>Music</Link>
        <Link to={prefixLink('/videos')}>Videos</Link>

      </Headroom>
    )
  }

  renderHeader() {
    return (
      <div style={styles.menuWrapper}>
        <div style={styles.menuContainer}>

          <Link to={prefixLink('/')} style={styles.menuItem}>Home</Link>
          <Link to={prefixLink('/about1/')} style={styles.menuItem}>About</Link>
          <Link to={prefixLink('/music')} style={styles.menuItem}>Music</Link>
          <Link to={prefixLink('/videos')} style={styles.menuItem}>Videos</Link>

        </div>
      </div>
    )
  }

  render() {

    // console.log(this.state.activeIndex);
    const {activeIndex} = this.state;
    const trackInfo = this.state.tracks[activeIndex] || {
        user: {}
      }
      let streamUrl,
        resolveUrl
      if (activeIndex > -1) {
        // console.log(this.state.tracks);
        streamUrl = this.state.tracks[activeIndex].stream_url
        // resolveUrl = this.state.tracks[activeIndex].permalink_url
        // this.sc.soundCloudAudio.play({streamUrl: streamUrl})
        // console.log(streamUrl);\
                    // console.log(this.sc.soundCloudAudio);
        this.sc.soundCloudAudio.preload(streamUrl)
        this.sc.soundCloudAudio.play()

      }

      return (
        <div style={styles.body}>

          {this.renderHeader()}

          <div>
            <SoundPlayerContainer ref={(sc) => {
              this.sc = sc;
            }} clientId={this.state.clientId}>
              <Player trackInfo={trackInfo} nextTrack={this.nextTrack.bind(this)}/>
            </SoundPlayerContainer>
          </div>

          {this.props.children}

        </div>

      )

    }
  }

  export default Template;

  const styles = {

    body: {
      paddingBottom: 100,
      paddingTop: 45
    },

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
      marginBottom: 4
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
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0

    },

    metaContainer: {
      display: 'flex',
      flex: 8,
      paddingLeft: 16,
      paddingRight: 16,
      paddingTop: 8,
      paddingBottom: 12,
      flexDirection: 'column'
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
