/* eslint-disable */

import React, {PureComponent} from 'react';

import {User} from '../store'
export default class Dashboard extends PureComponent {

  state = {
    user : User
  }

  render() {
    
    console.log(this.state.user)
        
    return (
      <div className="page admin-dashboard ">
        <h1 className="mdc-typography--display1">Dashboard {this.state.user.isAuthenticated}</h1>
      
      </div>
    );
  }


}
