/* eslint-disable */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
// import * as Promise from 'es6-promise';
import * as Fetch from 'isomorphic-fetch';

import Moment from 'moment';

const personalToken = 'H6UGU45Z6VWGJAK5PS5T';

export default class EventBright extends Component {

  static propTypes = {};

  constructor(props) {
    super(props);
    const clientID = personalToken;
    var authURL = `https://www.eventbrite.com/oauth/authorize?response_type=token&client_id=${clientID}`
    this.state = {
      authURL
    };
  }

  componentWillMount() {
    fetch(this.state.authURL).then(function(response) {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response.json();
    }).then(function(events) {
//       console.log(events);
    });
  }

  render() {
    return (
      <div>EventBright</div>
    );
  }

}

export const fetchEvents = () => {

  var eventbriteEvents = `https://www.eventbriteapi.com/v3/users/me/owned_events/?token=${personalToken}`

  return fetch(eventbriteEvents).then(function(response) {
    if (response.status >= 400) {
      throw new Error("Bad response from server");
    }
    return response.json();
  }).then((data) => {
//     console.log(data);

//     let events = [];

    data.events.map((_event) => {
//       let modEvent = {};
//       console.log(_event);
//       modEvent.key = _event.id;
//       modEvent.date = Moment(_event.start.local).format("MMM Do YY");
//       modEvent.title = _event.name.text;
//       events.push(modEvent)
      
      _event.key = _event.id;
      _event.date = Moment(_event.start.local).format("MMM Do YY");
      _event.title = _event.name.text;

    });





    return data.events;
//     return events;
  });
}

export const fetchVenue = (id) => {

  var eventbriteEvents = `https://www.eventbriteapi.com/v3/venues/${id}/?token=${personalToken}`

  return fetch(eventbriteEvents).then(function(response) {
    if (response.status >= 400) {
      throw new Error("Bad response from server");
    }
    return response.json();
  })
}
