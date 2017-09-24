/* eslint-disable */

// React imports
import React, {PureComponent} from 'react';

import {
  NavLink
} from 'react-router-dom'

// Material Components Web
// Drawer
// import {
//   MDCTabBar
// } from "@material/drawer/dist/mdc.tabs";

import './web-app-header-tabs.css'

export default class WebAppHeaderTabs extends PureComponent {
  state = {
    
  }


  componentDidMount() {
//       const tabs = new MDCPersistentDrawer(this.tabRef);
//       this.tabs = tabs;
    //   console.log(this.nav)
    //   this.drawer.unlisten("touchmove")
    // //     this.nav.unlisten("toucstart")

    //   this.drawer.open = true
  }



  render() {
    return (
     
    <nav id="basic-tab-bar" className="mdc-tab-bar" ref={(tabs) => {this.tabRef = tabs}}>
      <NavLink exact activeClassName="mdc-tab--active"  className="mdc-tab" to="/admin/plugins/Soundcloud">Home</NavLink>
      <NavLink exact activeClassName="mdc-tab--active" className="mdc-tab" to="/admin/plugins/Soundcloud/tracks">Tracks</NavLink>
      <NavLink exact activeClassName="mdc-tab--active" className="mdc-tab" to="/admin/plugins/Soundcloud/settings">Settings</NavLink>
       <span className="mdc-tab-bar__indicator"></span>
    </nav>

      
    );
  }
}





