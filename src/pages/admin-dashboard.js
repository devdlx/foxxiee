/* eslint-disable */

import React, {PureComponent} from 'react'

import Dropzone from 'react-dropzone'


export default class Dashboard extends PureComponent {

  state = {
    
  }

  uploadItem(e){
    e.preventDefault();
    console.log(this.fileInput)
    Storage.upload(this.fileInput)
  }

  render() {
    
    const {User, Player} = this.props.store
        
    return (
      <div className="page admin-dashboard " style={{padding:24}}>
        <h1 className="mdc-typography--display1">Dashboard {User.isAuthenticated}</h1>
      
      <form id="image-form" action="#">
            <input id="mediaCapture" type="file" accept="*" ref={(input) => { this.fileInput = input; }}  onChange={(event)=> { console.log(this)}} />
            <button id="submitImage" title="Add an image" className="" onClick={(e)=>this.uploadItem(e)}>
              <i className="material-icons">image</i>
            </button>
          </form>
      
      </div>
    );
  }


}
