/* eslint-disable import/prefer-default-export */

import Dropdown from './components/dropdown/dropdown.js';
import DropdownItem from './components/dropdown/dropdown-item.js';
import Loading from './components/loading/loading.js';

customElements.define(Dropdown.is, Dropdown);
customElements.define(DropdownItem.is, DropdownItem);
customElements.define(Loading.is, Loading);

export { Dropdown, Loading };
