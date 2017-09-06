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
    console.log(this.props)
    
    return (
      
     
    <div className="mdc-list-group">
        <nav className="mdc-list">
            <NavLink exact activeClassName="nav-active" to='/admin' className="mdc-list-item">
                <i className="material-icons mdc-list-item__start-detail" aria-hidden="true">dashboard</i>Dashboard
            </NavLink>
            <NavLink exact activeClassName="nav-active" to="/admin/pages" className="mdc-list-item">
                <i className="material-icons mdc-list-item__start-detail" aria-hidden="true">star</i>Pages
            </NavLink>
            <NavLink exact activeClassName="nav-active" to='/admin/media' className="mdc-list-item">
                <i className="material-icons mdc-list-item__start-detail" aria-hidden="true">send</i>Media
            </NavLink>
        </nav>

      <hr className="mdc-list-divider" />
      
        <nav className="mdc-list">
            <NavLink exact activeClassName="nav-active" to={'#'}className="mdc-list-item">
                <i className="material-icons mdc-list-item__start-detail" aria-hidden="true">email</i>Soundcloud
            </NavLink>
            <NavLink exact activeClassName="nav-active" to={'#'}className="mdc-list-item">
                <i className="material-icons mdc-list-item__start-detail" aria-hidden="true">delete</i>Youtube
            </NavLink>
            <NavLink exact activeClassName="nav-active" to={'#'}className="mdc-list-item">
                <i className="material-icons mdc-list-item__start-detail" aria-hidden="true">report</i>Eventbrite
            </NavLink>
        </nav>
      
      
      <hr className="mdc-list-divider" />
      
      
      <nav className="mdc-list">
            <NavLink exact activeClassName="nav-active" to={'#'}className="mdc-list-item">
                <i className="material-icons mdc-list-item__start-detail" aria-hidden="true">email</i>Settings
            </NavLink>
            <NavLink exact activeClassName="nav-active" to={'#'}className="mdc-list-item">
                <i className="material-icons mdc-list-item__start-detail" aria-hidden="true">delete</i>Trash
            </NavLink>
            <NavLink exact activeClassName="nav-active" to={'#'}className="mdc-list-item">
                <i className="material-icons mdc-list-item__start-detail" aria-hidden="true">report</i>Logout
            </NavLink>
        </nav><hr className="mdc-list-divider" />
      
      
      <nav className="mdc-list">
            <NavLink exact activeClassName="nav-active" to={'#'}className="mdc-list-item">
                <i className="material-icons mdc-list-item__start-detail" aria-hidden="true">email</i>Settings
            </NavLink>
            <NavLink exact activeClassName="nav-active" to={'#'}className="mdc-list-item">
                <i className="material-icons mdc-list-item__start-detail" aria-hidden="true">delete</i>Trash
            </NavLink>
            <NavLink exact activeClassName="nav-active" to={'#'}className="mdc-list-item">
                <i className="material-icons mdc-list-item__start-detail" aria-hidden="true">report</i>Logout
            </NavLink>
        </nav><hr className="mdc-list-divider" />
      
      
      <nav className="mdc-list">
            <NavLink exact activeClassName="nav-active" to={'#'}className="mdc-list-item">
                <i className="material-icons mdc-list-item__start-detail" aria-hidden="true">email</i>Settings
            </NavLink>
            <NavLink exact activeClassName="nav-active" to={'#'}className="mdc-list-item">
                <i className="material-icons mdc-list-item__start-detail" aria-hidden="true">delete</i>Trash
            </NavLink>
            <NavLink exact activeClassName="nav-active" to={'#'}className="mdc-list-item">
                <i className="material-icons mdc-list-item__start-detail" aria-hidden="true">report</i>Logout
            </NavLink>
        </nav><hr className="mdc-list-divider" />
      
      
      <nav className="mdc-list">
            <NavLink exact activeClassName="nav-active" to={'#'}className="mdc-list-item">
                <i className="material-icons mdc-list-item__start-detail" aria-hidden="true">email</i>Settings
            </NavLink>
            <NavLink exact activeClassName="nav-active" to={'#'}className="mdc-list-item">
                <i className="material-icons mdc-list-item__start-detail" aria-hidden="true">delete</i>Trash
            </NavLink>
            <NavLink exact activeClassName="nav-active" to={'#'}className="mdc-list-item">
                <i className="material-icons mdc-list-item__start-detail" aria-hidden="true">report</i>Logout
            </NavLink>
        </nav>
      
      
    </div>

      
    );
  }
}





