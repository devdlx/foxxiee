/* eslint-disable */
import React from 'react';
// import PropTypes from 'prop-types';

import ReactPlayer from 'react-player';

import * as soundcloud from '../components/soundcloud/soundcloud';
// import * as eventbrite from '../../components/eventbrite/eventbrite';
import * as youtube from '../components/youtube/youtube';

export const YoutubeCard1 = ({
  itemId,
  title,
  subtitle,
  pic = null,
  linkTo
}) => (
  <div xs={24} sm={12} md={12} lg={10} xl={12} style={cardStyles.player}>
    <div bordered={false} bodyStyle={cardStyles.body} style={cardStyles.card}>
      <div className="mediacard-image">
        <button className="player-button animated" shape="circle" icon="caret-right" style={cardStyles.button} size={'large'}/>
        <img alt="example" width="100%" src={`${pic}`}/>
      </div>
    </div >
  </div >
);

export const cardStyles = {
  playerRow: {
    display: 'flex',
    background: '#2f2f2f',
    margin: '0 -8px'
  },
  card: {
    border: 'none',
    borderRadius: 0
  },
  player: {
    margin: '0 auto'
  },
  body: {
    padding: 0
  },
  button: {
    fontSize: 36
  }
}


class ItemDetail extends React.Component {

  static propTypes = {};

  constructor(props) {
    super(props);

    this.state = {
      itemKey: null,
      loading: true
    };

  }

  componentWillMount() {
    // console.log(this.props);

    const {type, itemKey} = {
      ...this.props.match.params
    }

    // let item = {}

    if (type === 'music') {

      soundcloud.fetchSoundcloudByKey(itemKey).then((_soundcloud) => {
        console.log('fetchSoundcloud() ', _soundcloud);
        this.setState({type, itemKey, _soundcloud})
      });

    }

    if (type === 'media') {

      youtube.fetchYoutubeByKey(itemKey).then((youtube) => {
        console.log('fetchYoutube() ', youtube);
        this.setState({type, itemKey, youtube})
      });
    }

    if (type === 'events') {

      // eventbrite.fetchEventsByKey(itemKey).then((events) => {
      //   // console.log('fetchEvents() ',events);
      // this.setState({type, itemKey, events})

      // });

    }

    // console.log(type, itemKey, item);

  }

  render() {
    const {
      // type,
      itemKey,
      youtube,
      _soundcloud,
      // events,
      // loading
    } = this.state
    // console.log(type)

    if (youtube) {
      return (
        <div>
          <div style={cardStyles.playerRow}>
            <ReactPlayer url={`https://www.youtube.com/watch?v=${itemKey}`} width={'100%'} height={'40vw'}/>
          </div>
          <div>
            <div className="mediacard-text text-white">
              {youtube.title && <h2 className="ellipsis">{youtube.title}</h2>}
              {youtube.channelTitle && <h3>{youtube.channelTitle}</h3>}
            </div>
          </div>
        </div>
      );
    }

    if (_soundcloud) {
      console.log(soundcloud.config);
      // const config = soundcloud.config;
      return (
        <div>
          <div style={cardStyles.playerRow}>
            <ReactPlayer url={`${_soundcloud.stream_url}`} width={'100%'} height={'40vw'} playing soundcloudConfig={{
              clientId: '7ce7c8ce794f080121b96a32aeff64f4',
              showArtwork: true
            }}/>
          </div>
          <div>
            <div className="mediacard-text text-white">
              {_soundcloud.title && <h2 className="ellipsis">{_soundcloud.title}</h2>}
              {_soundcloud.permalink_url && <h3>{_soundcloud.permalink_url}</h3>}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div>
        <div>
          <div>
            Error
          </div>
        </div>
      </div>
    );

  }

}

export default ItemDetail;

// <YoutubeCard key={youtube.id} itemId={youtube.id} title={youtube.title} pic={`${youtube.thumbnail}`} onready={this._onReady}/ >
