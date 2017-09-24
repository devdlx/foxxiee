/* eslint-disable */

import React, {
  PureComponent
} from 'react';

import Dropzone from 'react-dropzone'

import './admin-media.css'


export default class AdminMedia extends PureComponent {

  state = {
    selected: {}
  }

  componentDidMount() {

    console.log(this.props)
    //     const {page} = this.props.match.params

  }

  uploadItem(e) {
    e.preventDefault();
//     console.log(this.fileInput)
//     console.log(this.props.store)
    this.props.store.Uploads.upload(this.fileInput)
  }

  updateSelected(e) {
    console.log(this.fileInput.files[0])
    this.setState({
      selected: this.fileInput.files[0]
    })
  }

  selectFile(e) {
    e.preventDefault()
    console.dir(this.fileInput.click())
  }


  render() {

      //     console.log(this.state.store)

      return (
      <div className="page admin-dashboard ">
        <h1 className="mdc-typography--display2">Media {this.props.store.User.user.displayName}</h1>
        <form id="image-form" action="">
            <input id="mediaCapture" type="file" accept="*" ref={(input) => { this.fileInput = input; }}  onChange={(event)=> { this.updateSelected(event)}} />
            <a className="mdc-button mdc-button--raised"  onClick={(e)=>this.selectFile(e)} >{this.state.selected.name || 'Select File'}</a>
            <button id="submitImage" title="Add an image" className="mdc-button mdc-button--raised material-icons" onClick={(e)=>this.uploadItem(e)}>
              cloud_upload
            </button>
        </form>
      </div>
    );
  }


}
