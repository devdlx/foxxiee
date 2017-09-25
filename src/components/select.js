/* eslint-disable */

// React imports
import React, {PureComponent} from 'react';

// Material Components Web
// Drawer
import { MDCSelectFoundation, MDCSelect} from "@material/select/dist/mdc.select";


 class Select extends PureComponent {
  state = {
    
  }

componentDidMount(){
  const select = new MDCSelect(this.selectRef);
  select.listen('MDCSelect:change', () => {
    alert(`Selected "${select.selectedOptions[0].textContent}" at index ${select.selectedIndex} ` +
        `with value "${select.value}"`);
  });
  this.select = select;
  console.log(this.select)
}


  render() {
    return (
<div  style={{width:60}}>
<div className="mdc-select" role="listbox" tabIndex="0" ref={(select) => {this.selectRef = select}}>
  <span className="mdc-select__selected-text">Pages</span>
  <div className="mdc-simple-menu mdc-select__menu">
    <ul className="mdc-list mdc-simple-menu__items">
      <li className="mdc-list-item" role="option" id="grains" aria-disabled="true">
        Pick a food group
      </li>
      <li className="mdc-list-item" role="option" id="grains" tabIndex="0">
        Bread, Cereal, Rice, and Pasta
      </li>
      <li className="mdc-list-item" role="option" id="vegetables" tabIndex="0">
        Vegetables
      </li>
      <li className="mdc-list-item" role="option" id="fruit" tabIndex="0">
        Fruit
      </li>
      <li className="mdc-list-item" role="option" id="dairy" tabIndex="0">
        Milk, Yogurt, and Cheese
      </li>
      <li className="mdc-list-item" role="option" id="meat" tabIndex="0">
        Meat, Poultry, Fish, Dry Beans, Eggs, and Nuts
      </li>
      <li className="mdc-list-item" role="option" id="fats" tabIndex="0">
        Fats, Oils, and Sweets
      </li>
    </ul>
  </div>
</div>
</div>
    );
  }


}


class Multi2 extends PureComponent {
  state = {
    
  }

componentDidMount(){
  const select = new MDCSelect(this.selectRef);
  select.listen('MDCSelectMulti:change', () => {
    alert(`Selected "${select.selectedOptions[0].textContent}" at index ${select.selectedIndex} ` +
        `with value "${select.value}"`);
  });
  this.select = select;
  console.log(this.select)
}


  render() {
    return (
      <select multiple size="6" className="mdc-multi-select mdc-list" >
  <optgroup className="mdc-list-group" label="Starches">
    <option className="mdc-list-item">
      Potato
    </option>
    <option className="mdc-list-item">
      Cereal
    </option>
  </optgroup>
  <option className="mdc-list-divider" role="presentation" disabled />
  <option>
    misc...
  </option>
</select>
      

    );
  }


}



class MultiCheck extends PureComponent {
  state = {
    
  }

componentDidMount(){
  const select = new MDCSelect(this.selectRef);
  select.listen('MDCSelectMulti:change', () => {
    alert(`Selected "${select.selectedOptions[0].textContent}" at index ${select.selectedIndex} ` +
        `with value "${select.value}"`);
  });
  this.select = select;
  console.log(this.select)
}


  render() {
    return (
      <div>
        <div className="mdc-form-field">
              <div className="mdc-checkbox">
                <input type="checkbox" id="basic-indeterminate-checkbox" className="mdc-checkbox__native-control" />
                <div className="mdc-checkbox__background">
                  <svg className="mdc-checkbox__checkmark" viewBox="0 0 24 24">
                    <path className="mdc-checkbox__checkmark__path" fill="none" stroke="white" d="M1.73,12.91 8.1,19.28 22.79,4.59"></path>
                  </svg>
                  <div className="mdc-checkbox__mixedmark"></div>
                </div>
              </div>
              <label for="basic-indeterminate-checkbox">This is my indeterminate checkbox</label>
            </div>
      
      <div className="mdc-form-field">
              <div className="mdc-checkbox">
                <input type="checkbox" id="basic-indeterminate-checkbox" className="mdc-checkbox__native-control" />
                <div className="mdc-checkbox__background">
                  <svg className="mdc-checkbox__checkmark" viewBox="0 0 24 24">
                    <path className="mdc-checkbox__checkmark__path" fill="none" stroke="white" d="M1.73,12.91 8.1,19.28 22.79,4.59"></path>
                  </svg>
                  <div className="mdc-checkbox__mixedmark"></div>
                </div>
              </div>
              <label for="basic-indeterminate-checkbox">This is my indeterminate checkbox</label>
            </div>
      
      
      <div className="mdc-form-field">
              <div className="mdc-checkbox">
                <input type="checkbox" id="basic-indeterminate-checkbox" className="mdc-checkbox__native-control" />
                <div className="mdc-checkbox__background">
                  <svg className="mdc-checkbox__checkmark" viewBox="0 0 24 24">
                    <path className="mdc-checkbox__checkmark__path" fill="none" stroke="white" d="M1.73,12.91 8.1,19.28 22.79,4.59"></path>
                  </svg>
                  <div className="mdc-checkbox__mixedmark"></div>
                </div>
              </div>
              <label for="basic-indeterminate-checkbox">This is my indeterminate checkbox</label>
            </div>
      
      
      <div className="mdc-form-field">
              <div className="mdc-checkbox">
                <input type="checkbox" id="basic-indeterminate-checkbox" className="mdc-checkbox__native-control" />
                <div className="mdc-checkbox__background">
                  <svg className="mdc-checkbox__checkmark" viewBox="0 0 24 24">
                    <path className="mdc-checkbox__checkmark__path" fill="none" stroke="white" d="M1.73,12.91 8.1,19.28 22.79,4.59"></path>
                  </svg>
                  <div className="mdc-checkbox__mixedmark"></div>
                </div>
              </div>
              <label for="basic-indeterminate-checkbox">This is my indeterminate checkbox</label>
            </div>
  
      </div>
      

    );
  }


}


export {Select, MultiCheck}

export default Select