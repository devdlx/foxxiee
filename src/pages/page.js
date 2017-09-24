/* eslint-disable */
import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import {NavLink} from 'react-router-dom';

import * as soundcloud from '../components/soundcloud/soundcloud';
import * as eventbrite from '../components/eventbrite/eventbrite';
import * as youtube from '../components/youtube/youtube';


import Moment from 'moment'



export default class Page extends PureComponent {
  componentWillMount() {
    // fetch data
    // const scdata = Soundcloud.fetchSoundcloud('sizzur_dlx');
    // this.setState({items: scdata.soundcloud.items, soundcloud: scdata.soundcloud});
    // console.log(scdata);
    console.log(this.props)
    this.setState({items: []});

    const {type} = {...this.props.match.params}
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




  render() {
    const {type} = this.state;
    // {items.map(item => <GridItem key={item.id} item={item}/>)}
    console.log(this.state)
    

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
