/* eslint-disable import/prefer-default-export */

import Dropdown from './components/dropdown/dropdown.js';
import DropdownItem from './components/dropdown/dropdown-item.js';
import Loading from './components/loading/loading.js';
import Modal from './components/modal/modal.js';
import ModalLabel from './components/modal/modal-label.js';
import ModalHeading from './components/modal/modal-heading.js';
import ModalFooter from './components/modal/modal-footer.js';

customElements.define(Dropdown.is, Dropdown);
customElements.define(DropdownItem.is, DropdownItem);
customElements.define(Loading.is, Loading);
customElements.define(Modal.is, Modal);
customElements.define(ModalLabel.is, ModalLabel);
customElements.define(ModalHeading.is, ModalHeading);
customElements.define(ModalFooter.is, ModalFooter);

export { Dropdown, Loading, Modal, ModalLabel, ModalHeading, ModalFooter };
