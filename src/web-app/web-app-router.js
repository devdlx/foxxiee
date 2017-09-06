/* eslint-disable */

import React, {PureComponent, PropTypes} from 'react';

import {BrowserRouter as Router, Route, Link, Switch, Redirect} from 'react-router-dom'

import WebAppBrowser from './web-app-browser';
// import Blog from '../pages/blog';
import WebAppAdminRouter from '../pages/web-app-admin-router';

import Login from '../pages/login';
// Store
import {observer} from "mobx-react";
import {musicItems, User, PlayerStore} from '../store';

// console.log('PlayerStore: ',PlayerStore)


window.User = User

const PrivateRoute =  observer ( ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    User.isAuthenticated ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
))









const WebAppRouter = observer (class WebAppRouter extends PureComponent {
  state = {}

  render() {
//     console.log(this.props.user)
    return (
      <div>
        <Router>
        <Switch>
          {
              this.props.user.isAuthenticated && 
              <Route path="/admin" component={WebAppAdminRouter}/>
          }
          
          <Route path="/login" component={Login}/>
          <Route path="/" component={WebAppBrowser} />
      
        </Switch>
        </Router>
      </div>
    );
  }

})

export default WebAppRouter

//           <PrivateRoute path="/admin" component={WebAppAdminRouter} user={User}/>


//             <Route path="/blog" component={Blog}/>