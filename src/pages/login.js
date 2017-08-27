/* eslint-disable */
// red #d60000
// gold #FBC02D

import React, {PureComponent} from 'react';
import {
  Link
} from 'react-router-dom'

import MediaQuery from 'react-responsive';

export default class Login extends PureComponent {
  state = {
     events: [],
      soundcloud: [],
      youtube: []
  }


componentWillMount() {


  }

 

  renderLanding() {
    
    return (
      <div>
      
      <div className="landing-wrapper">
        <div className="landing">
      
          <div className="flex-center landing-text-wrapper">
            <div className="landing-text">
      
              <div className="landing-text-wrapper" >
                <h2 className="mdc-typography--display2 --mdc-theme-primary landing-text-h2">Design</h2>
                <h2 className="mdc-typography--display2 --mdc-theme-accent mdc-button--accent landing-text-h2">Studios</h2>
                <hr className="" />
                <h3 className="--mdc-theme-text-hint-on-accent">Create.Publish.Market</h3>
              </div>
      
              <Link className="mdc-button mdc-button--accent dc-button--raised" to="admin">
                Sign Up
              </Link>
      
            </div>
          </div>
        </div>
      </div>
      </div>
    );
  }




renderHeading() {
    
    return (
      <div>    
     <MediaQuery query='(max-width: 440px)'>
          <div className="headerMobile">
            <img src="https://i3.sndcdn.com/avatars-000300901237-63o5oa-t500x500.jpg" width="100%" alt="Ahkiki La Foxxiee’s avatar"/>
          </div>
        </MediaQuery>
        <MediaQuery query='(min-width: 441px)'>
          <div className="headerDesktop">
            <img src="https://i1.sndcdn.com/visuals-000294198895-EGDUvy-t2480x520.jpg" width="100%" alt="Ahkiki La Foxxiee’s avatar"/>
          </div>
        </MediaQuery>
      </div>
    );
  }


render() {
    
    return (
      <div className="page page-login">
      
      {this.renderLanding()}
      
      </div>
    );
  }


}
