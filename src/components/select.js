/* eslint-disable */

// React imports
import React, {PureComponent} from 'react';

// Material Components Web
// Drawer
import { MDCSelectFoundation, MDCSelect} from "@material/select/dist/mdc.select";


export default class Select extends PureComponent {
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
