/* eslint-disable */

// React imports
import React, {PureComponent} from 'react';

// Material Components Web
// Drawer
import {MDCPersistentDrawer} from "@material/drawer/dist/mdc.drawer";


export default class DrawerDesktop extends PureComponent {
  state = {
    
  }

componentDidMount(){
  const drawer = new MDCPersistentDrawer(this.desktopdrawerref);
  this.drawer = drawer;
  this.drawer.open = true
}

  toggle(e){
    //   console.log(e)
    console.log(this.drawer.open = !this.drawer.open)
  }

  render() {
    return (
      <aside className="mdc-persistent-drawer mdc-toolbar-fixed-adjust" ref={(drawer) => {this.desktopdrawerref = drawer}} style={this.props.style}>
       <nav className="mdc-persistent-drawer__drawer">
         
         
    {this.props.children}
        </nav>
      </aside>
    );
  }


}



// <header className="mdc-persistent-drawer__header">
//       <div className="mdc-persistent-drawer__header-content">
//         Header here
//       </div>
//     </header>