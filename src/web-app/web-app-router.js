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

import * as Store from '../store';

window.Store = Store


const PassRoute =  observer ( ({ component: Component, ...rest }) => (
  <Route render={props => (
    (
      <Component {...props} store={Store}/>
    ) 
  )}/>
))

const PrivateRoute =  observer ( ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    User.isAuthenticated ? (
      <PassRoute path="/admin" component={Component}/>
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
//   console.log('User Observer: isAuthenticated ', Store.User.isAuthenticated)
//   console.log('User Observer: waiting ', Store.User.waiting)
    
    return (
      <div>
        <Router>
        <Switch>
      {
        Store.User.isAuthenticated && 
        <Route path='/admin' render={(props) => (
            <WebAppAdminRouter {...props} store={Store}/>
        )}/>
      }
      
      {
        Store.User.isAuthenticated && 
        <Route path='/login' render={(props) => (
          <Redirect to={{
            pathname: '/admin',
            state: { from: props.location }
          }}/>
        )}/>
      }
      
      
      {
        !Store.User.isAuthenticated && !Store.User.waiting && 
        <Route path='/admin' render={(props) => (
          <Redirect to={{
            pathname: '/login',
            state: { from: props.location }
          }}/>
        )}/>
      }
      
      
      {
        Store.User.waiting && 
        <Route path='/admin' render={(props) => (
          <div>loading...</div>
        )}/>
      }
          <PassRoute path="/login" component={Login}/>
          <PassRoute path="/" component={WebAppBrowser} />
          // ErrorRoute
        </Switch>
        </Router>
      </div>
    );
  }

})

export default WebAppRouter

//           <PrivateRoute path="/admin" component={WebAppAdminRouter}/>           
//           <Route path="/blog" component={Blog}/>
// <Route path='/admin' render={(props) => (
//             <WebAppAdminRouter {...props} store={Store}/>
//           )}/>