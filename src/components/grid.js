/* eslint-disable */
import React, { PureComponent } from 'react';
// import PropTypes from 'prop-types';


export default class Grid extends PureComponent {

  static propTypes = {
    
  };

  constructor(props) {
    super(props);

    this.state = {
      
    };
  }


render

  render() {
    return (
      <div className="mdc-grid-list mdc-grid-list--twoline-caption">
        <ul className="mdc-grid-list__tiles" style={{width: 408}}>

        </ul>
      </div>
    );
  }

}
        
        
export class GridItem extends PureComponent {

  static propTypes = {
    
  };

  constructor(props) {
    super(props);

    this.state = {
      
    };
  }


render

  render() {
    return (
      <li className="mdc-grid-tile">
        <div className="mdc-grid-tile__primary">
          <img className="mdc-grid-tile__primary-content" src="https://unsplash.it/200/200" />
        </div>
          <span className="mdc-grid-tile__secondary">
          <span className="mdc-grid-tile__title">Single Very Long Grid Title Line</span>
          <span className="mdc-grid-tile__support-text">Support text</span>
        </span>
      </li>
    );
  }

}



