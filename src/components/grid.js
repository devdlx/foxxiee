/* eslint-disable */
import React, { PureComponent } from 'react';
// import PropTypes from 'prop-types';

import {Select, Multi} from './select'

import './grid.css'



export default class TileGrid extends PureComponent {

  static propTypes = {

  };

  constructor(props) {
    super(props);

    this.state = {

    };
  }


  render() {
    return (
      <div className="mdc-grid-list mdc-grid-list--twoline-caption">
        <ul className="mdc-grid-list__tiles">

        </ul>
      </div>
    );
  }

}
        
        
export class Tile extends PureComponent {

  static propTypes = {

  };

  constructor(props) {
    super(props);

    this.state = {

    };
  }



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




export class Card extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
       view: 'ready'
    };
  }
  

  
  changeView(view){
    this.setState({view})
  }
  
  
  pagesDialogClick(){
//     console.log('pagesDialogClick', window.pagesDialog.show())
//     window
//     console.log(this.props.item.id)
    window.pagesDialog.show(this.props.item)
  }
  
  
render()  {
  
 const {view} = this.state 
 const {props} = this
  return (
    <div className="grid-card-item mdc-layout-grid__cell mdc-layout-grid__cell--span-6-desktop mdc-layout-grid__cell--span-8-tablet mdc-layout-grid__cell--span-12-phone  ">
     <div className="mdc-card mdc-elevation--z3">
            <div className="mdc-card__horizontal-block">
    
    { view==='ready' && 
    <section className="mdc-card__primary">
                <h1 className="mdc-card__title mdc-card__title--large primary-on-dark">{props.item.title}</h1>
                <h2 className="mdc-card__subtitle primary-on-dark">{props.item.subtitle}</h2>
              </section>
    }
    
    { view==='Analytics' && 
    <section className="mdc-card__primary">
                <h1 className="mdc-card__title mdc-card__title--large primary-on-dark">Analytics</h1>
    </section>
    }
    
    
              <img className="mdc-card__media-item mdc-card__media-item--1dot5x" src={props.item.cover} />
            </div>
            <section className="mdc-card__actions">
    
        { view==='ready'&& 
    
    
        <div style={{display: 'flex', justifyContent:'space-around1', flex:'1'}}>
              <button className="mdc-button mdc-button--compact mdc-card__action  mdc-button--raised" onClick={()=>this.pagesDialogClick()} >Pages</button>
              <button className="mdc-button mdc-button--compact mdc-card__action primary-on-dark" onClick={()=>this.changeView('Analytics')}>Analytics</button>
    
        </div>
        }
    
     { view!='ready' && 
    <button className="mdc-button mdc-button--compact mdc-card__action mdc-button--raised material-icons" onClick={()=>this.changeView('ready')}>arrow_back</button>
    }

            </section>
          </div>

    </div>
  )}
}

export class CardGrid extends PureComponent {

  static propTypes = {

  };

  constructor(props) {
    super(props);

    this.state = {

    };
  }


  render() {
    return (
       <div className="mdc-layout-grid">
        <div className="mdc-layout-grid__inner">
            {this.props.items.map((item, i) => <Card item={item} key={i} pagesClick={this.props.pagesClick} />)} 
        </div>
      </div>
    );
  }

}

//onMouseLeave={this.onMouseLeave} onMouseEnter={this.onMouseEnter}
// http://wrapbootstrap.com/preview/WB055J451
