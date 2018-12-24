import { html } from 'lit-html';
import { storiesOf } from '@storybook/polymer';
import BXDropdown from './dropdown';
import BXDropdownItem from './dropdown-item';

window.customElements.define(BXDropdown.is, BXDropdown);
window.customElements.define(BXDropdownItem.is, BXDropdownItem);

storiesOf('Dropdown', module).add(
  'Default',
  () => html`
    <bx-dropdown>
      <bx-dropdown-item value="all">Option 1</bx-dropdown-item>
      <bx-dropdown-item value="cloudFoundry">Option 2</bx-dropdown-item>
      <bx-dropdown-item value="staging">Option 3</bx-dropdown-item>
      <bx-dropdown-item value="dea">Option 4</bx-dropdown-item>
      <bx-dropdown-item value="router">Option 5</bx-dropdown-item>
    </bx-dropdown>
  `
);
