/* eslint-disable */
// red #d60000
// gold #FBC02D

import React, {PureComponent} from 'react';
import {
  Link
} from 'react-router-dom'

import MediaQuery from 'react-responsive';



import './login.css'


export default class Login extends PureComponent {
  state = {
     events: [],
      soundcloud: [],
      youtube: []
  }


  componentWillMount() {
    
//     console.log(this.props.store.User.waiting)


  }


  signInGoogle(){
    console.log('signInGoogle',this.props.user.signInGoogle)
//     this.props.user.signInGoogle()
  }

  signInEmail(){
    console.log(this.props.user.signInEmail)
//     this.props.user.signInEmail()
  }


 pressBack(){
    console.log(this.props.history.length >0)
   if ( this.props.history.length >0 ){
     this.props.history.goBack()
   }else{
     this.props.history.go('/')
   }
  }

 

  renderLogin() {
    
    return (
        <div className="login-wrapper">
      
      
      
       <header className="mdc-toolbar mdc-toolbar--fixed">
          <div className="mdc-toolbar__row">
            <section className="mdc-toolbar__section mdc-toolbar__section--align-start">
              
                <i className="material-icons mdc-toolbar__icon--menu" onClick={(e) => this.pressBack(e)}>arrow_back</i>
              
              
            </section>



<div role="progressbar" className="mdc-linear-progress mdc-linear-progress--accent mdc-linear-progress--indeterminate header-progressbar">
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
      
      
      
            <div className="login-content">
      
              <div className="login-header" >
                <h2 className="mdc-typography--display2 --mdc-theme-primary landing-text-h2">Design</h2>
                <h2 className="mdc-typography--display2 --mdc-theme-accent mdc-button--accent landing-text-h2">Studios</h2>
                <hr className="" />
                <h3 className="--mdc-theme-text-hint-on-accent">Create.Publish.Market</h3>
              </div>
      
              
      
            <form className="login-form" >
              <div className="mdc-form-field mdc-form-field--align-end">
                <div className="mdc-textfield" data-demo-no-auto-js="">
                  <input type="email" id="css-only-textfield" className="mdc-textfield__input" placeholder="Email"  ref={(input) => { this.email = input; }}  />
                </div>
              </div>


              <div className="mdc-form-field mdc-form-field--align-end">
                <div className="mdc-textfield" data-demo-no-auto-js="">
                  <input placeholder="Password"    required="" pattern=".{8,}" type="password" className="mdc-textfield__input" id="css-only-textfield" aria-controls="pw-validation-msg" autoComplete="current-password" ref={(input) => { this.password = input; }} />
                </div>
              </div>
      
              <input type="submit" className="mdc-button mdc-button--login mdc-button--raised" value="Login" onClick={this.signInEmail} />
           </form>
              
      
      
              <div className="login-actions">

                <button className="mdc-button mdc-button--raised mdc-button--google" onClick={(e)=>{this.props.store.User.signInGoogle()}}>
                  Google
                </button>
                
                <Link className="mdc-button mdc-button--signup mdc-button--primary mdc-button--raised" to="login/signup">
                  Sign Up
                </Link>
      
      
      
              </div>
            
  
      
            </div>
      </div>
    );
  }
  
  componentWillUpdate(nextp, nexts){
    console.log(nextp, nexts, this.props.store.User.isAuthenticated)
    
    return true
  }


render() {
  
  console.log()
    
    return (
      <div className="page page-login">
      
      {this.renderLogin()}
      
      </div>
    );
  }


}
