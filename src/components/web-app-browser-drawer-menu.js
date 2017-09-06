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
            <NavLink activeClassName="mdc-persistent-drawer--selected" className="mdc-list-item" to="/">
                <i className="material-icons mdc-list-item__start-detail" aria-hidden="true">inbox</i>Home
            </NavLink>
            
            <NavLink activeClassName="mdc-persistent-drawer--selected" className="mdc-list-item" to="pages/music">
                <i className="material-icons mdc-list-item__start-detail" aria-hidden="true">star</i>Music
            </NavLink>
            
            <NavLink activeClassName="mdc-persistent-drawer--selected" className="mdc-list-item" to="pages/video">
                <i className="material-icons mdc-list-item__start-detail" aria-hidden="true">send</i>Videos
            </NavLink>
            
            <NavLink activeClassName="mdc-persistent-drawer--selected" className="mdc-list-item" to="pages/events">
                <i className="material-icons mdc-list-item__start-detail" aria-hidden="true">drafts</i>Events
            </NavLink>
      
            <NavLink activeClassName="mdc-persistent-drawer--selected" className="mdc-list-item" to="pages/contact">
                <i className="material-icons mdc-list-item__start-detail" aria-hidden="true">drafts</i>Contact
            </NavLink>
        </nav>

      
    </div>

      
    );
  }
}





