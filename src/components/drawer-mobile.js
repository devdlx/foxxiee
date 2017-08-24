/* eslint-disable */

// React imports
import React, {PureComponent} from 'react';

// Material Components Web
// Drawer
import { MDCTemporaryDrawerFoundation, MDCTemporaryDrawer } from "@material/drawer/dist/mdc.drawer";


export default class DrawerMobile extends PureComponent {
  state = {
    
  }

componentDidMount(){
  const drawer = new MDCTemporaryDrawer(this.mobiledrawerref);
//   console.log(this.refdrawer)
//   const drawer = new MDCTemporaryDrawer(document.querySelector('.mdc-temporary-drawer'));
  this.drawer = drawer;
}

  toggle(e){
    //   console.log(e)
//     console.log(this.refdrawer.open = !this.refdrawer.open)
    console.log(this.drawer.open = !this.drawer.open)
    
  }


  render() {
    return (
      <aside className="mdc-temporary-drawer" ref={(drawer) => {this.mobiledrawerref = drawer}}>
       <nav className="mdc-temporary-drawer__drawer">

    <header className="mdc-temporary-drawer__header">
      <div className="mdc-temporary-drawer__header-content">
        Header content goes here
      </div>
    </header>

      {this.props.children}
  </nav>

    
      </aside>
    );
  }


}
