/* eslint-disable */

// React imports
import React, {PureComponent} from 'react';

import {
  BrowserRouter as Router,
  Route,
  Link, Switch
} from 'react-router-dom'

import MediaQuery from 'react-responsive';

import {
  observer
} from "mobx-react";

// Custom Components
// Drawer
import DrawerDesktop  from "../components/drawer-desktop";
import DrawerMobile  from "../components/drawer-mobile";
import WebAppAdminDrawerMenu  from "../components/web-app-admin-drawer-menu";

import AdminPages from '../pages/admin-pages';
import AdminMedia from '../pages/admin-media';
import AdminDashboard from '../pages/admin-dashboard';
import AdminSettings from '../pages/admin-settings';
import AdminSoundcloud from '../pages/admin-soundcloud';


import * as Store from '../store';


// Admin Page CSS
import './web-app-admin.css'


const PlugRoute =  ({ component: Component, ...rest }) => {
  console.log(rest.computedMatch.params.Component)
  return
  (
  <Route {...rest} render={props => (
      <div><Component {...props}/></div>
    )
  }/>
  )
}




const PassRoute =   ({ component: Component, ...rest }) => (
  <Route  {...rest} render={props => (
    (
      <Component {...props} store={Store}/>
    ) 
  )}/>
)


const WebAppAdmin = observer(class WebAppAdmin extends PureComponent {
  state = {
    isMobile : true
  }


componentDidMount(){
  this.handleWindowSizeChange();
}

menuPress(e){
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
shouldComponentUpdate(nextp){
//   console.dir(nextp.store.soundcloud.tracks.splice())
  return true
}

componentWillUpdate(nextProps, nextState) {
  let _update = false
  if (nextState.isMobile != this.state.isMobile ) {
//     console.log(this.state.isMobile)
    _update =  true;
  }
  
  return _update;
}

  render() {
    const {isMobile} = this.state    
    
      const {soundcloud} = this.props.store
//       const {soundcloud} = store
//     console.log('web app admin soundcloud store ', soundcloud.tracks.keys())
        soundcloud.tracks.size
    return (
     <div className="page admin-page mdc-toolbar-fixed-adjust ">
      
      {isMobile && 
      
        <DrawerMobile ref={(drawer) => { this.drawer = drawer; }} >
          <WebAppAdminDrawerMenu {...this.props}  />
        </DrawerMobile>
      
      }
      
      
      {!isMobile && 
      
        <DrawerDesktop ref={(drawer) => { this.drawer = drawer; }}  style={{
          position: 'fixed'
        }}>
          <WebAppAdminDrawerMenu {...this.props} />
        </DrawerDesktop>
      
      }
      
        <div className="web-admin-content" style={{marginLeft: !isMobile ? 240 : 0}} >
            <header className="mdc-toolbar mdc-toolbar--fixed mdc-toolbar--waterfall">
               <div className="mdc-toolbar__row">
                    <section className="mdc-toolbar__section mdc-toolbar__section--align-start">  
                      <MediaQuery query='(max-width: 768px)'>
                        <button className="demo-menu material-icons mdc-toolbar__icon--menu" onClick={(e) => this.menuPress(e)}>menu</button>
                      </MediaQuery>
                      <span className="mdc-toolbar__title catalog-title">Dashboard</span>
                    </section>
               </div>
           </header>


          <main className="" >
              <Switch>
                <PassRoute exact path="/admin/pages" component={AdminPages}/>
                <PassRoute exact path="/admin/media" component={AdminMedia}/>
                <PassRoute exact path="/admin/settings" component={AdminSettings}/>
                
                <PassRoute path="/admin/plugins/Soundcloud/:page" component={AdminSoundcloud} />
                <PassRoute path="/admin/plugins/Soundcloud" component={AdminSoundcloud} />

                <PassRoute path="/admin" component={AdminDashboard}/>
              </Switch>
          </main>


        </div>
    </div>
    );
  }


})

export default WebAppAdmin



// <Route exact strict path="/admin" component={AdminDashboard} store={Store}/>  