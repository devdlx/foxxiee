/* eslint-disable */
// red #d60000
// gold #FBC02D

import React, {PureComponent} from 'react';
import {
  Link
} from 'react-router-dom'

import MediaQuery from 'react-responsive';

import * as eventbrite from '../components/eventbrite/eventbrite';
import {Soundcloud} from '../components/soundcloud/soundcloud';
import * as youtube from '../components/youtube/youtube';

import './home.css'



const Amp = ()=>{
  return(
    <div className="i-amp-video-eq">
    <div className="-amp-video-eq-col">
      <div className="-amp-video-eq-1-1"></div>
      <div className="-amp-video-eq-1-2"></div>
    </div>
    <div className="-amp-video-eq-col">
      <div className="-amp-video-eq-2-1"></div>
      <div className="-amp-video-eq-2-2"></div>
    </div>
    <div className="-amp-video-eq-col">
      <div className="-amp-video-eq-3-1"></div>
      <div className="-amp-video-eq-3-2"></div>
    </div>
  
  </div>
  
  )
  
}



export default class Home extends PureComponent {
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

    Soundcloud.fetchTracksByUser(4).then((soundcloud) => {
      // console.log('fetchSoundcloud() ', soundcloud);
      this.setState({soundcloud})
    });

    youtube.fetchYoutube(6).then((youtube) => {
      // console.log('fetchYoutube() ', youtube);
      this.setState({youtube})
    });

  }

 

  renderLanding() {
    
    return (
      <div>
      
      <div className="landing-wrapper">
        <div className="landing">
      
          <div className="flex-center landing-text-wrapper">
            <div className="landing-text">
      
              <div className="landing-text-wrapper" >
                <h2 className="mdc-typography--display2 --mdc-theme-primary landing-text-h2">Design</h2>
                <h2 className="mdc-typography--display2 --mdc-theme-accent mdc-button--accent landing-text-h2">Studios</h2>
                <hr className="" />
                <h3 className="--mdc-theme-text-hint-on-accent">Create.Publish.Market</h3>
              </div>
      
              <Link className="mdc-button mdc-button--accent dc-button--raised" to="admin">
                Sign Up
              </Link>
      
            </div>
          </div>
        </div>
      </div>
      </div>
    );
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


renderGridItemYoutube(video){
const key= video.videoId
const itemId=video.videoId
const title=video.title 
const linkTo=`/page/media/${video.videoId}`
const pic= video.thumbnail
// console.log(video)

  return(
  <li className="mdc-grid-tile" key={key} to={linkTo}>
         <div className="mdc-grid-tile__innerWrapper">
        <div className="mdc-grid-tile__primary">
          <img className="mdc-grid-tile__primary-content" src={pic} />
        </div>
          <span className="mdc-grid-tile__secondary">
          <span className="mdc-grid-tile__title">{title}</span>
          <span className="mdc-grid-tile__support-text">{video.channelTitle}</span>
        </span>
        </div>
      </li>
  )
}



renderGridItemSoundcloud(track){
 const key = track.id
 const      itemId = track.id
 const      title = track.title 
 const linkTo = `/page/music/${track.id}`
 const pic = track.user.avatar_url
 const subtitle = track.user.username

  return(
  <li to={linkTo} className="mdc-grid-tile" key={key}>
     <div className="mdc-grid-tile__innerWrapper">
        <div className="mdc-grid-tile__primary">
          <img className="mdc-grid-tile__primary-content" src={pic} />
            <button className="mdc-fab material-icons media-button" aria-label="Favorite">
              <span className="mdc-fab__icon">
                play_arrow
              </span>
            </button>        
          </div>
          <span className="mdc-grid-tile__secondary">
          <span className="mdc-grid-tile__title">{title}</span>
          <span className="mdc-grid-tile__support-text">{subtitle}</span>
        </span>
     </div>
      </li>
  )
}

renderEventItemDateOnRight(event){
  return(
    <li className="mdc-list-item" key={event.key} style={{width: '48%'}}>
      <span className="mdc-list-item__text">
       {event.title}
        <span className="mdc-list-item__text__secondary">Secondary text</span>
      </span>
    <span className="mdc-list-item__end-detail grey-bg">{event.date}</span>
  </li>
  )
}


renderEventItem(event){
  return(
    <li className="mdc-list-item" key={event.key}>
      <span className="mdc-list-item__text">
       {event.title}
        <span className="mdc-list-item__text__secondary">{event.date}</span>
      </span>
  </li>
  )
}


render() {
    
    return (
      <div className="page page-home">
      
      {this.renderHeading()}
      
      <div className="mdc-layout-grid">
        <div className="mdc-layout-grid__inner">
          
        
        <div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-12">
            <section className="section-music">
              <h3>Music</h3>

              <div className="mdc-grid-list mdc-grid-list--twoline-caption">
                <ul className="mdc-grid-list__tiles">
                  {this.state.soundcloud.map((track, i) => this.renderGridItemSoundcloud(track))}
                </ul>
              </div>
            </section>
        </div>


        <div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-12">
          <section className="section-videos">
            <h3>Videos</h3>


            <div className="mdc-grid-list mdc-grid-list--twoline-caption mdc-grid-list--tile-aspect-3x2">
              <ul className="mdc-grid-list__tiles">
                  {this.state.youtube.map((video, i) => this.renderGridItemYoutube(video))}
              </ul>
            </div>




          </section>
        </div>

        

          <div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-12">
            <section className="events">
              <h3>Events</h3>
              <ul className="mdc-list mdc-list--two-line">
                
                {this.state.events.map((event, i) => this.renderEventItem(event))}
                
              </ul>
            </section>  
          </div>
       


        </div>
      </div>


      
      </div>
    );
  }


}
