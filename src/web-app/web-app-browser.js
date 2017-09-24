/* eslint-disable */

import React, {PureComponent, PropTypes} from 'react';

import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom'

import MediaQuery from 'react-responsive';

// Pages
import Feed from '../pages/feed';
import Page from '../pages/page';
import Detail from '../pages/detail';
// import List from '../pages/list';

// import Blog from '../pages/blog';

import {observer} from "mobx-react";

// import DrawerDesktop from "../components/drawer-desktop";
import DrawerMobile from "../components/drawer-mobile";
import WebAppBrowserDrawerMenu from "../components/web-app-browser-drawer-menu";
import WebAppHeaderTabs from "../components/web-app-header-tabs"

import Player from "../components/player";

import * as Store from '../store';

import './web-app-browser.css';


const PassRoute =   ({ component: Component, ...rest }) => (
  <Route  {...rest} render={props => (
    (
      <Component {...props} store={Store}/>
    ) 
  )}/>
)

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
//  const {soundcloud} = Store
//       const {soundcloud} = store
//     console.log('web app admin soundcloud store ', soundcloud.tracks.keys())
//         soundcloud.tracks.size

    return (

      <div className="page web-app-browser mdc-toolbar-fixed-adjust">

        <header className="mdc-toolbar mdc-toolbar--fixed mdc-toolbar--waterfall">
          <div className="mdc-toolbar__row">
            <section className="mdc-toolbar__section mdc-toolbar__section--align-start">
              <MediaQuery query='(max-width: 767px)'>
                <button className="demo-menu material-icons mdc-toolbar__icon--menu" onClick={(e) => this.menuPress(e)}>menu</button>
              </MediaQuery>
              <Link to="/" className="mdc-toolbar__title">DesignStudios</Link>
              <Link to="/admin">
                <button href="#" className="material-icons mdc-toolbar__icon--menu">menu</button>
              </Link>
            </section>

            <MediaQuery query='(min-width: 768px)'>

              <section className="mdc-toolbar__section mdc-toolbar__section--align-end">
                <WebAppHeaderTabs {...this.props}/>
              </section>
            </MediaQuery>

            <div role="progressbar" className={`mdc-linear-progress mdc-linear-progress--indeterminate header-progressbar ${this.props.store.User.waiting
              ? 'show'
              : 'hide'}`}>
              <div className="mdc-linear-progress__buffering-dots"></div>
              <div className="mdc-linear-progress__buffer"></div>
              <div className="mdc-linear-progress__bar mdc-linear-progress__primary-bar">
                <span className="mdc-linear-progress__bar-inner"></span>
              </div>
              <div className="mdc-linear-progress__bar mdc-linear-progress__secondary-bar">
                <span className="mdc-linear-progress__bar-inner"></span>
              </div>
            </div>

          </div>
        </header>

        <DrawerMobile ref={(drawer) => {
          this.drawer = drawer;
        }}>
          <WebAppBrowserDrawerMenu {...this.props}/>
        </DrawerMobile>

        <main className="">

          <Switch>
            <Route exact strict path="/page/:page/:itemId" component={Detail}/>

            <Route exact strict path="/page/:page" component={Page}/>

            <PassRoute exact strict path="/" component={Feed}/>
          </Switch>
        </main>

        <Player {...this.props} />

      </div>
    );

  }

})

export default WebAppBrowser
//             <Route exact strict path="/page/:page" component={Home}/>

// Main Style
//  style={{
//           paddingTop: 0
//         }, {
//           paddingBottom: 36
//         }, {
//           marginLeft: !isMobile
//             ? 240
//             : 0
//         }}

// {isMobile && <DrawerMobile ref={(drawer) => {
//           this.drawer = drawer;
//         }}>
//           <WebAppBrowserDrawerMenu  {...this.props} />
//         </DrawerMobile>
//         }

//         {!isMobile && <DrawerDesktop ref={(drawer) => {
//           this.drawer = drawer;
//         }} style={{
//           position: 'fixed'
//         }}>
//           <WebAppBrowserDrawerMenu  {...this.props} />
//         </DrawerDesktop>
//         }
