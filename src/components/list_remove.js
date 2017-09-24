/* eslint-disable */
// red #d60000
// gold #FBC02D

import React, {PureComponent} from 'react';
import {Link} from 'react-router-dom'

import MediaQuery from 'react-responsive';

import * as eventbrite from '../components/eventbrite/eventbrite';
import {Soundcloud} from '../components/soundcloud/soundcloud';
import * as youtube from '../components/youtube/youtube';

import './list.css'

const Amp = () => {
  return (
    <div className="i-amp-video-eq">
      <div className="-amp-video-eq-col">
        <div className="-amp-video-eq-1-1"></div>
        <div className="-amp-video-eq-1-2"></div>
      </div>
      <div className="-amp-video-eq-col">
        <div className="-amp-video-eq-2-1"></div>
        <div className="-amp-video-eq-2-2"></div>
      </div>
      <div className="-amp-video-eq-col">
        <div className="-amp-video-eq-3-1"></div>
        <div className="-amp-video-eq-3-2"></div>
      </div>

    </div>

  )

}

const Grid = (props, type) => (
  <div className={`mdc-layout-grid ${props.type}`}>
    <div className="mdc-layout-grid__inner">
      <div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-12">
        <section className="section-music">
          <h3>{props.title}</h3>
          <div className="mdc-grid-list mdc-grid-list--twoline-caption">
            <ul className="mdc-grid-list__tiles">
              {props.items && props.items.map((gridItem, i) => (
                <li to={gridItem.linkTo} className="mdc-grid-tile" key={gridItem.key}>
                  <div className="mdc-grid-tile__innerWrapper">
                    <div className="mdc-grid-tile__primary">
                      <img className="mdc-grid-tile__primary-content" src={gridItem.cover}/>
                      <button className="mdc-fab material-icons media-button" aria-label="Favorite">
                        <span className="mdc-fab__icon">
                          play_arrow
                        </span>
                      </button>
                    </div>
                    <span className="mdc-grid-tile__secondary">
                      <span className="mdc-grid-tile__title">{gridItem.title}</span>
                      <span className="mdc-grid-tile__support-text">{gridItem.subtitle}</span>
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </div>
  </div>
);


export default class List extends PureComponent {

  componentWillMount() {
    console.log('Grid Items: ', this.props.items)
this.state = this.props
  }

  render() {
    const {props} = this

    return (
      <div className={`mdc-layout-grid ${props.type}`}>
        <div className="mdc-layout-grid__inner">
          <div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-12">
              <h3>{props.title}</h3>
              <div className="mdc-grid-list mdc-grid-list--twoline-caption">
                {!props.items.length && <h1>No Items</h1>}
                <ul className="mdc-grid-list__tiles">
                  {props.items && props.items.map((gridItem, i) => (
                    <li to={gridItem.linkTo} className="mdc-grid-tile" key={gridItem.key}>
                      <div className="mdc-grid-tile__innerWrapper">
                        <div className="mdc-grid-tile__primary">
                          <img className="mdc-grid-tile__primary-content" src={gridItem.cover}/>
                          <button className="mdc-fab material-icons media-button" aria-label="Favorite">
                            <span className="mdc-fab__icon">
                              play_arrow
                            </span>
                          </button>
                        </div>
                        <span className="mdc-grid-tile__secondary">
                          <span className="mdc-grid-tile__title">{gridItem.title}</span>
                          <span className="mdc-grid-tile__support-text">{gridItem.subtitle}</span>
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
          </div>
        </div>
      </div>
    )
  }

}
