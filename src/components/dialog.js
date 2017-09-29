/* eslint-disable */

// React imports
import React, {PureComponent} from 'react';
import {observer} from "mobx-react";

import * as store from '../store'
// Material Components Web
// Drawer
import {MDCDialog, MDCDialogFoundation} from "@material/dialog/dist/mdc.dialog";

const Dialog = observer(class Dialog extends PureComponent {
  state = {
    items: [],
    waiting: true
  }

  componentDidMount() {
    const dialog = new MDCDialog(this.dialogRef)
    this.dialog = dialog

    //     window.pagesDialog = this

  }

  show(item) {

    // clear state
    this.setState({items: [], item: {}, waiting: true})
    // console.log(this.state.items, store)

    const itemPages = item.pages || []
    // console.log(store.pages.pages)
    const pagesValues = store.pages.pages.values()
    const pagesKeys = store.pages.pages.keys()
    let items = []

    if (pagesKeys.length) {
      pagesKeys.forEach((pageKey) => {
        const added = itemPages[pageKey]
          ? true
          : false
        items.push({pageKey, added})
      })
    }
    //         console.log(items)
    setTimeout(() => {
      this.setState({items, item, waiting: false})
      this.dialog.show()
    }, 6)

    return
    //   console.log(this.refdrawer)
    //   const drawer = new MDCTemporaryDrawer(document.querySelector('.mdc-temporary-drawer'));
  }

  updatePage(e) {
    //         console.log(e.target.value)
    const page = e.target.value
    const checked = e.target.checked
    //         this.setState({items, item})
    store.pages.updatePage(this.state.item, page, checked)
    //         console.log(this.state.item, page, checked)
  }

  componentWillUpdate() {}

  render() {

    const {items, waiting} = this.state

    return (
      <aside id="mdc-dialog-with-list" className="mdc-dialog" role="alertdialog" aria-labelledby="mdc-dialog-with-list-label" aria-describedby="mdc-dialog-with-list-description" ref={(dialog) => {
        this.dialogRef = dialog
      }}>
        <div className="mdc-dialog__surface">
          <header className="mdc-dialog__header">
            <h2 id="mdc-dialog-with-list-label" className="mdc-dialog__header__title">
              {this.state.item && "Add " + this.state.item.title + " to " + this.props.title}
            </h2>
          </header>
          <section id="mdc-dialog-with-list-description" className="mdc-dialog__body mdc-dialog__body--scrollable">
            <ul className="mdc-list">
              {items && !waiting && items.map((item, key) => (
                <li className="mdc-list-item" key={key}>
                  <div className="mdc-form-field mdc-form-field--align-end-FFF">
                    <div className="mdc-checkbox">
                      <input type="checkbox" id="basic-checkbox" className="mdc-checkbox__native-control" onChange={(e) => this.updatePage(e)} value={item.pageKey} defaultChecked={item.added}/>
                      <div className="mdc-checkbox__background">
                        <svg className="mdc-checkbox__checkmark" viewBox="0 0 24 24">
                          <path className="mdc-checkbox__checkmark__path" fill="none" stroke="white" d="M1.73,12.91 8.1,19.28 22.79,4.59"></path>
                        </svg>
                        <div className="mdc-checkbox__mixedmark"></div>
                      </div>
                    </div>
                    <label htmlFor="basic-checkbox">{item.pageKey}</label>
                  </div>

                </li>
              ))}
            </ul>
          </section>
          <footer className="mdc-dialog__footer">

            <button type="button" className="mdc-button mdc-dialog__footer__button mdc-dialog__footer__button--accept">Close</button>
          </footer>
        </div>
        <div className="mdc-dialog__backdrop"></div>
      </aside>
    );
  }

})

export {Dialog}

export default Dialog

//        <button type="button" className="mdc-button mdc-dialog__footer__button mdc-dialog__footer__button--cancel">Decline</button>
