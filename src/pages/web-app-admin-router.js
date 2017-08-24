/* eslint-disable */

// React imports
import React, {PureComponent} from 'react';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

// Custom Components
// Drawer
import DrawerDesktop  from "../components/drawer-desktop";
import DrawerMobile  from "../components/drawer-mobile";
import WebAppAdminDrawerMenu  from "../components/web-app-admin-drawer-menu";

// import Home from '../pages/home';
import AdminDashboard from '../pages/admin-dashboard';

// Admin Page CSS
import './web-app-admin.css'

export default class WebAppAdmin extends PureComponent {
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

componentWillUpdate(nextProps, nextState) {
  if (nextState.isMobile != this.state.isMobile ) {
//     console.log(this.state.isMobile)
    return true;
  }
  return false;
}

  render() {
    const {isMobile} = this.state
    return (
     <div className="page admin-page mdc-theme--dark">
      
      {isMobile && 
      
        <DrawerMobile ref={(drawer) => { this.drawer = drawer; }} >
          <WebAppAdminDrawerMenu />
        </DrawerMobile>
      
      }
      
      
      
      {!isMobile && 
      
        <DrawerDesktop ref={(drawer) => { this.drawer = drawer; }} style={{position:'absolute'}}>
          <WebAppAdminDrawerMenu />
        </DrawerDesktop>
      
      }
      
        <div className="web-admin-content">
            <header className="mdc-toolbar mdc-elevation--z4">
               <div className="mdc-toolbar__row">
                    <section className="mdc-toolbar__section mdc-toolbar__section--align-start">
                        <button className="demo-menu material-icons mdc-toolbar__icon--menu" onClick={(e)=>this.menuPress(e)}>menu</button>
                       <span className="mdc-toolbar__title catalog-title">Dashboard</span>
                    </section>
               </div>
           </header>

          <main className="mdc-toolbar-fixed-adjust2" style={{paddingTop:0}} style={{marginLeft: !isMobile ? 240 : 0, padding: '0 16px'}}>
            <Router>
              <div>    
                <Route component={AdminDashboard}/>
              </div>
            </Router>
          </main>
        </div>
    </div>
    );
  }


}
