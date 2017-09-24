/* eslint-disable */

// React imports
import React, {PureComponent} from 'react';
import {
  NavLink
} from 'react-router-dom'

import './web-app-admin-drawer-menu.css'

export default class AdminDrawerMenu extends PureComponent {
  state = {
    
  }


  render() {
    return (
      
     
    <div className="mdc-list-group">
        
      <nav className="mdc-list">
            <NavLink exact activeClassName="mdc-persistent-drawer--selected" className="mdc-list-item" to="/">
                <i className="material-icons mdc-list-item__start-detail" aria-hidden="true">home</i>Home
            </NavLink>
            
            <NavLink exact activeClassName="mdc-persistent-drawer--selected" className="mdc-list-item" to="/pages/music">
                <i className="material-icons mdc-list-item__start-detail" aria-hidden="true">headset</i>Music
            </NavLink>
            
            <NavLink exact activeClassName="mdc-persistent-drawer--selected" className="mdc-list-item" to="/pages/video">
                <i className="material-icons mdc-list-item__start-detail" aria-hidden="true">video_library</i>Videos
            </NavLink>
            
            <NavLink exact activeClassName="mdc-persistent-drawer--selected" className="mdc-list-item" to="/pages/events">
                <i className="material-icons mdc-list-item__start-detail" aria-hidden="true">date_range</i>Events
            </NavLink>
      
            <NavLink exact activeClassName="mdc-persistent-drawer--selected" className="mdc-list-item" to="/pages/contact">
                <i className="material-icons mdc-list-item__start-detail" aria-hidden="true">perm_contact_calendar</i>Contact
            </NavLink>
        </nav>

      
    </div>

      
    );
  }
}





