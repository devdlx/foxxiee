/* eslint-disable */
// red #d60000
// gold #FBC02D

import React, {PureComponent} from 'react';
import {
  Link
} from 'react-router-dom'

import MediaQuery from 'react-responsive';

import {
  observer
} from "mobx-react";

import * as eventbrite from '../components/eventbrite/eventbrite';
import {Soundcloud} from '../components/soundcloud/soundcloud';
import * as youtube from '../components/youtube/youtube';

import './feed.css'


const CardCover = (props, context) =>
  <div className="mdc-card mdc-card--theme-dark" sytle={{backgroundImage: "url(" + props.track.artwork_url || props.track.user.avatar_url+ ")" }}> 
    <section className="mdc-card__primary">
      <h1 className="mdc-card__title mdc-card__title--large">{props.track.title}</h1>
      <h2 className="mdc-card__subtitle">{props.track.user.username}</h2>
    </section>
    <section className="mdc-card__actions">
      <button className="mdc-button mdc-button--compact mdc-button--theme-dark mdc-card__action">Action 1</button>
      <button className="mdc-button mdc-button--compact mdc-button--theme-dark mdc-card__action">Action 2</button>
    </section></div>;

    
const CardFull = (props, type) =>  
    <div className={`mdc-card demo-card demo-card--with-avatar mdc-card--theme-dark ${props.type}`}>
            <section className="mdc-card__primary">
              <div className="demo-card__avatar"></div>
              <h1 className="mdc-card__title">{props.title}</h1>
              <h2 className="mdc-card__subtitle">{props.type}</h2>
            </section>
            {props.wide && 
              <section className="mdc-card__media demo-card__16-9-media"></section>
            }
            
            <img src={ props.cover} className="card-image" />

             {props.description && <section className="mdc-card__supporting-text">
              {props.description}
            </section> }
            {props.actions && 
            <section className="mdc-card__actions">
              <button className="mdc-button mdc-button--compact mdc-card__action">Action 1</button>
              <button className="mdc-button mdc-button--compact mdc-card__action">Action 2</button>
            </section>
            }
          </div>;




const Feed = observer( class Feed extends PureComponent {
  state = {
     events: [],
      soundcloud: [],
      youtube: []
  }


componentWillMount() {
    eventbrite.fetchEvents(5).then((events) => {
      // console.log('fetchEvents() ',events);
      this.setState({events})
    });

//     Soundcloud.fetchTracksByUser(4).then((soundcloud) => {
//       console.log('fetchSoundcloud() ', soundcloud);
//       this.setState({soundcloud})
//     });

    youtube.fetchYoutube(6).then((youtube) => {
      console.log('fetchYoutube() ', youtube);
      this.setState({youtube})
    });

  }

 


renderHeading() {
    
    return (
      <div>    
     <MediaQuery query='(max-width: 440px)'>
          <div className="headerMobile">
            <img src="https://i3.sndcdn.com/avatars-000300901237-63o5oa-t500x500.jpg" width="100%" alt="Ahkiki La Foxxiee’s avatar"/>
          </div>
        </MediaQuery>
        <MediaQuery query='(min-width: 441px)'>
          <div className="headerDesktop">
            <img src="https://i1.sndcdn.com/visuals-000294198895-EGDUvy-t2480x520.jpg" width="100%" alt="Ahkiki La Foxxiee’s avatar"/>
          </div>
        </MediaQuery>
      </div>
    );
  }





render() {

const music = this.props.store.soundcloud.tracks.values();
console.log(music)
    
    return (
      <div className="page page-feed page-toolbar">
      
      {this.renderHeading()}

      <div className="feed">
        {music.map((track, i) => (<CardFull key={track.id} type="soundcloud"  cover={track.cover} title={track.title}  />))}
        {this.state.youtube.map((video, i) => (<CardFull key={video.videoId} type="youtube"  cover={video.thumbnails.high.url}  title={video.title}   />))}
      </div>
      
      </div>
    );
  }


})


// const FeedPage = observer(Feed)
// export default FeedPage

export default Feed