/* eslint-disable */

import React, {PureComponent, PropTypes} from 'react';

import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

import Home from '../pages/home';
import Page from '../pages/page';
import Detail from '../pages/detail';
// import Blog from '../pages/blog';
import MediaQuery from 'react-responsive';

import {observer} from "mobx-react";


import DrawerDesktop from "../components/drawer-desktop";
import DrawerMobile from "../components/drawer-mobile";
import WebAppAdminDrawerMenu from "../components/web-app-admin-drawer-menu";

import Player from "../components/player";

import {musicItems, User, PlayerStore} from '../store';


import './web-app-browser.css';

const WebAppBrowser = observer(class WebAppBrowser extends PureComponent {

  state = {
    isMobile: true
  }

  componentDidMount() {
    this.handleWindowSizeChange();
//   console.log('WebApp: ',this.props)
  }

  menuPress(e) {
    //   console.log(e)
    //   console.log(this.drawer.open = !this.drawer.open)
    this.drawer.toggle();
  }

  componentWillMount() {
    window.addEventListener('resize', this.handleWindowSizeChange);
  }

  // make sure to remove the listener
  // when the component is not mounted anymore
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange);
  }

  handleWindowSizeChange = () => {
    //   console.log(window.innerWidth)
    //   this.setState({ width: window.innerWidth });
    const isMobile = window.innerWidth <= 767;
    //   console.log(isMobile)
    this.setState({isMobile})
    //   const
    //   this.drawer.change class = ''
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.isMobile != this.state.isMobile) {
      //     console.log(this.state.isMobile)
      return true;
    }
    return false;
  }

  render() {
    const {isMobile} = this.state
    return (

      <div className="page web-app-browser mdc-toolbar-fixed-adjust">

        <header className="mdc-toolbar mdc-toolbar--fixed mdc-toolbar--waterfall">
          <div className="mdc-toolbar__row">
            <section className="mdc-toolbar__section mdc-toolbar__section--align-start">
              <MediaQuery query='(max-width: 768px)'>
                <button className="demo-menu material-icons mdc-toolbar__icon--menu" onClick={(e) => this.menuPress(e)}>menu</button>
              </MediaQuery>
              <span className="mdc-toolbar__title">DesignStudios</span>
              <Link to="/admin">
                <button href="#" className="material-icons mdc-toolbar__icon--menu">menu</button>
              </Link>
            </section>
          </div>
        </header>

        {isMobile && <DrawerMobile ref={(drawer) => {
          this.drawer = drawer;
        }}>
          <WebAppAdminDrawerMenu/>
        </DrawerMobile>
}

        {!isMobile && <DrawerDesktop ref={(drawer) => {
          this.drawer = drawer;
        }} style={{
          position: 'fixed'
        }}>
          <WebAppAdminDrawerMenu/>
        </DrawerDesktop>
}

        <main className="" style={{
          paddingTop: 0
        }, {
          paddingBottom: 36
        }, {
          marginLeft: !isMobile
            ? 240
            : 0
        }}>
          <Router>
            <div>
              <Route exact strict path="/" component={Home}/>
              <Route exact strict path="/page/:page" component={Page}/>
              <Route exact strict path="/page/:page/:itemId" component={Detail}/>
            </div>
          </Router>
        </main>

        <Player player={PlayerStore}/>

      </div>
    );
  }

})

export default WebAppBrowser
//             <Route exact strict path="/page/:page" component={Home}/>