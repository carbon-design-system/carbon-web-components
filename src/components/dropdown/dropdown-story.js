import { html } from 'lit-html';
import { storiesOf } from '@storybook/polymer';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';
import './dropdown';
import './dropdown-item';

const createProps = () => ({
  open: boolean('Open (open)', false),
  disabled: boolean('Disabled (disabled)', false),
  light: boolean('Light variant (light)', false),
  value: text('The value of the selected item (value)', ''),
  triggerContent: text('The default content of the trigger button (trigger-content)', 'Select an item'),
  disableSelection: boolean(
    'Disable user-initiated selection change (Call event.preventDefault() in bx-dropdown-beingselected event)',
    false
  ),
});

storiesOf('Dropdown', module)
  .addDecorator(withKnobs)
  .add('Default', () => {
    const { open, disabled, light, value, triggerContent, disableSelection } = createProps();
    const beforeSelectedAction = action('bx-dropdown-beingselected');
    const handleBeforeSelected = evt => {
      beforeSelectedAction(evt);
      if (disableSelection) {
        evt.preventDefault();
      }
    };
    return html`
      <bx-dropdown
        ?open=${open}
        ?disabled=${disabled}
        ?light=${light}
        value=${value}
        trigger-content=${triggerContent}
        @bx-dropdown-beingselected=${handleBeforeSelected}
        @bx-dropdown-selected=${action('bx-dropdown-selected')}
      >
        <bx-dropdown-item value="all">Option 1</bx-dropdown-item>
        <bx-dropdown-item value="cloudFoundry">Option 2</bx-dropdown-item>
        <bx-dropdown-item value="staging">Option 3</bx-dropdown-item>
        <bx-dropdown-item value="dea">Option 4</bx-dropdown-item>
        <bx-dropdown-item value="router">Option 5</bx-dropdown-item>
      </bx-dropdown>
    `;
  });
