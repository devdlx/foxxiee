import React from 'react';
// import {Link} from 'react-router'
// import Headroom from 'react-headroom'

// import {rhythm} from '../utils/typography'

import {
  Button,
  // Icon,
  Row,
  Col
} from 'antd';

import {SoundPlayerContainer} from 'react-soundplayer/addons';
import Soundcloud from '../soundcloud/soundcloud'

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

      <Row type="flex" justify="space-between" className='playerContainer' align="middle">

        <Col span={16} className='player-meta-data'>
          <Col span={20}>
            <h2 className='player-track-title'>{trackInfo
                ? trackInfo.title
                : 'No song loaded'}</h2>
          </Col>
          <Col span={20}>
            <h3 className='player-track-user'>{trackInfo
                ? trackInfo.user.username
                : '...'}</h3>
          </Col>
        </Col>

        <Row type="flex" justify="center" className="buttons-wrapper">
          <Button icon={this.props.playing
            ? "pause"
            : "caret-right"} onClick={this.playPauseToggle.bind(this)} className='player-play-button'/>
          <Button icon={"fast-forward"} onClick={this.nextButton.bind(this)} className='player-next-button'/>
        </Row>

      </Row>
    );
  }
}

class Player extends React.Component {

  constructor() {
    super()

    this.state = {
      activeIndex: -1,
      clientId: Soundcloud.client_key,
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

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state === nextState) {
      return false;
    }
    return true;
  }

  render() {
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
        <div>

          <div>
            <SoundPlayerContainer clientId={this.state.clientId} ref={(sc) => {
              this.sc = sc;
            }}>
              <PlayerContainer trackInfo={trackInfo} nextTrack={this.nextTrack.bind(this)}/>
            </SoundPlayerContainer>
          </div>
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

  // <div style={styles.playerContainer}>
  //   <div style={styles.metaContainer}>
  //
  //     <div style={styles.trackTitle}>{trackInfo
  //         ? trackInfo.title
  //         : 'No song loaded'}</div>
  //
  //     <div style={styles.trackUser}>{trackInfo
  //         ? trackInfo.user.username
  //         : '...'}</div>
  //
  //   </div>
  //
  //   <div>
  //     <Button type="primary" icon={this.props.playing
  //       ? "pause"
  //       : "caret-right"} onClick={this.playPauseToggle.bind(this)}/>
  //
  //     <Button type="primary" icon={"fast-forward"} onClick={this.nextButton.bind(this)}/>
  //
  //   </div>
  // </div>

  //<div className="controls" style={styles.controlsContainer}>
  // <button style={styles.controlsPlayContainer} onClick={this.playPauseToggle.bind(this)}>
  //   {this.props.playing
  //     ? <Icon type="pause"/>
  //     : <Icon type="caret-right"/>}
  // </button>
  // <button style={styles.controlsNextContainer} onClick={this.nextButton.bind(this)}>
  //   <Icon type="fast-forward"/>
  // </button>
  // </div>
