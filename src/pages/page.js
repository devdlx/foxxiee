import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import {Link} from 'react-router-dom';

import * as soundcloud from '../components/soundcloud/soundcloud';
import * as eventbrite from '../components/eventbrite/eventbrite';
import * as youtube from '../components/youtube/youtube';

import {
  // GridItem,
  MediaCard
} from '../components/card/card.jsx'

// import Moment from 'moment'



class Page extends PureComponent {
  componentWillMount() {
    // fetch data
    // const scdata = Soundcloud.fetchSoundcloud('sizzur_dlx');
    // this.setState({items: scdata.soundcloud.items, soundcloud: scdata.soundcloud});
    // console.log(scdata);
    this.setState({items: []});

    const {type} = {
      ...this.props.match.params
    }
    // console.log(type);

    if (type === 'music') {

      soundcloud.fetchSoundcloud().then((soundcloud) => {
        // console.log('fetchSoundcloud() ', soundcloud);
        this.setState({items: soundcloud, type})
      });

    }

    if (type === 'media') {

      youtube.fetchYoutube().then((youtube) => {
        // console.log('fetchYoutube() ', youtube);
        this.setState({items: youtube, type})
      });
    }

    if (type === 'events') {

      eventbrite.fetchEvents().then((events) => {
        // console.log('fetchEvents() ',events);
        this.setState({items: events, type})
      });

    }

  }

  renderMedia() {
    const {items} = this.state
    return (
      <div >
        {items.map((track, i) => <MediaCard key={track.videoId} itemId={track.videoId} title={track.title} linkTo={`/page/media/${track.videoId}`} pic={track.thumbnail}/>)}
      </div>
    )
  }

  renderMusic() {
    const {items} = this.state
    return (
      <div >
        {items.map((track, i) => <MediaCard key={track.id} itemId={track.id} title={track.title} linkTo={`/page/music/${track.id}`} pic={`${track.user.avatar_url}`}/>)}
      </div>
    )
  }

  renderEvents() {
    const {items} = this.state
    return (
      <div >
        <div />
      </div>
    )
  }

  render() {
    const {type} = this.state;
    // {items.map(item => <GridItem key={item.id} item={item}/>)}

    if (type === 'music') {
      return (
        <div >
          {this.renderMusic()}
        </div>
      )
    }

    if (type === 'media') {
      return (
        <div >
          {this.renderMedia()}
        </div>
      );
    }

    if (type === 'events') {
      return (
        <div >
          {this.renderEvents()}
        </div>
      );
    }

    return (
      <div >
        No items
      </div>
    );

  }
}

Page.propTypes = {
  match: PropTypes.shape({}).isRequired
};

export default Page;
