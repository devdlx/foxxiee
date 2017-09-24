/* eslint-disable */

import React, {
  Component
} from 'react';

import MediaQuery from 'react-responsive';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'

import {observer} from "mobx-react";

import SoundcloudTabs from "../components/soundcloud-tabs"

import {CardGrid} from "../components/grid"

import * as store from '../store';

import './admin-soundcloud.css'


// const PassRoute =  observer ( ({ component: Component, ...rest }) => (
//   <Route render={props => (
//     (
//       <Component {...props} items={props.store.soundcloud.tracks} objectWanted={FromImportedStore}/>
//     ) 
//   )}/>
// ))


const AdminGridRoute =  observer ( ({ ...rest }) => (
  <Route render={props => (
    (
      <Grid {...props} items={store.soundcloud.tracks} {...rest} />
    ) 
  )}/>
))



class AdminSoundcloud extends Component {

  state = {tracks:[]}

  componentDidMount() {
//{soundcloud.profile.username}
//     const {soundcloud} = this.props.store
//     const items = soundcloud.tracks.toJSON()
//     console.log(items)
    
    
    
    
    
    
    
    
  }


// shouldComponentUpdate(nextp){
//   console.log(nextp.store.soundcloud.tracks.size, this.props.store.soundcloud.tracks.size)
  
//   if  (nextp.store.soundcloud.tracks.size !== this.props.store.soundcloud.tracks.size){    
//     console.log(this.props.store.soundcloud.tracks.toJS())
//     return true
//   }
// //   console.dir(nextp.store.soundcloud.tracks === this.props.store.soundcloud.tracks)
//   return false
// }










  render() {
//       const {soundcloud} = this.props.store
//     console.log('Rednering', soundcloud.tracks.size)
//       soundcloud.tracks.toJSON().map((i) =>{
//         console.log(soundcloud.tracks)
//       })
    
    const tracks = this.props.store.soundcloud.tracks.values()
//     tracks.forEach((value, i)=>{
//       console.log(value, i)
//     })
    
    const {page} = this.props.match.params
    
//     console.log(page)
    
    
    return (
      <div className="page admin-soundcloud theme-soundcloud page-toolbar">

        <header className="mdc-toolbar soundcloud">
          <div className="mdc-toolbar__row">
            <section className="mdc-toolbar__section mdc-toolbar__section--align-start">

              <Link to="/" className="mdc-toolbar__title">Soundcloud </Link>
              <MediaQuery query='(max-width: 767px)'>
                <button className="demo-menu material-icons mdc-toolbar__icon--menu" onClick={(e) => this.menuPress(e)}>play</button>
              </MediaQuery>
            </section>

            <MediaQuery query='(min-width: 600px)'>

              <section className="mdc-toolbar__section mdc-toolbar__section--align-end">
                <SoundcloudTabs {...this.props}/>
              </section>
            </MediaQuery>

          </div>
        </header>

        <div className="content">
          {page === "tracks" && <CardGrid items={tracks} />}
         </div>
    </div>
    );
  }
}


// const AdminSoundcloudObserver = observer(AdminSoundcloud)
export default AdminSoundcloud //Observer


//  <Switch>

//                 <Route exact path="/admin/plugins/Soundcloud" render={props => (
//                     <div> Dashboard</div>
//                 )} />
//                 <AdminGridRoute path="/admin/plugins/Soundcloud/tracks" />


//                 <Route path="/admin/plugins/Soundcloud/settings" render={props => (
//                     <div> Settings</div>
//                 )} />

//               </Switch>


// {tweets.keys().reverse().map(messageKey => this.renderTweet(messageKey, tweets.get(messageKey)))}





//   <div className={`mdc-layout-grid`}>
//         <div className="mdc-layout-grid__inner">
//           <div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-12">
//               <h3>{"Tracks"}</h3>
//               <div className="mdc-grid-list mdc-grid-list--twoline-caption">

//                 {!tracks.length && <h1>No Items</h1>}
//                 <ul className="mdc-grid-list__tiles">
                 
                 
//                   {
//                     tracks.map((gridItem, i) => (
//     <li to={gridItem.linkTo|| ''} className="mdc-grid-tile" key={i}>
//       <div className="mdc-grid-tile__innerWrapper">
//         <div className="mdc-grid-tile__primary">
//           <img className="mdc-grid-tile__primary-content" src={gridItem.cover}/>
//           <button className="mdc-fab material-icons media-button" aria-label="Favorite">
//             <span className="mdc-fab__icon">
//               play_arrow
//             </span>
//           </button>
//         </div>
//         <span className="mdc-grid-tile__secondary">
//           <span className="mdc-grid-tile__title">{gridItem.title}</span>
//           <span className="mdc-grid-tile__support-text">{gridItem.subtitle}</span>
//         </span>

//         </div>
//                     </li>
//                   ))
//                 }

  
//                 </ul>
//               </div>
//             </div>
//           </div>
//         </div>
