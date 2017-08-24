/* eslint-disable */

import React, {PureComponent, PropTypes} from 'react';

import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom'

import WebAppBrowser from './web-app-browser';
// import Blog from '../pages/blog';
import WebAppAdminRouter from '../pages/web-app-admin-router';

// Store
import { observer } from 'mobx-react';
import {musicItems} from '../store';

export default class WebAppRouter extends PureComponent {
  state = {}

  render() {
    return (
      <div>
        <Router>
        <Switch>
          <Route path="/admin" component={WebAppAdminRouter}/>
          <Route component={WebAppBrowser}/>
        </Switch>
        </Router>
      </div>
    );
  }

}

//             <Route path="/blog" component={Blog}/>