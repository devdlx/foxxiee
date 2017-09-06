/* eslint-disable */

import React, {PureComponent} from 'react';

import Dropzone from 'react-dropzone'

import {User, Storage} from '../store'
export default class AdminPages extends PureComponent {

  state = {
    user : User
  }

uploadItem(e){
  e.preventDefault();
  console.log(this.fileInput)
  Storage.upload(this.fileInput)
}

  render() {
    
    console.log(this.state.user)
        
    return (
      <div className="page admin-dashboard ">
        <h1 className="mdc-typography--display1">AdminPages {this.state.user.isAuthenticated}</h1>
      
      <form id="image-form" action="">
            <input id="mediaCapture" type="file" accept="*" ref={(input) => { this.fileInput = input; }}  onChange={(event)=> { console.log(this)}} />
            <button id="submitImage" title="Add an image" className="" onClick={(e)=>this.uploadItem(e)}>
              <i className="material-icons">image</i>
            </button>
          </form>
      
      
      </div>
    );
  }


}
