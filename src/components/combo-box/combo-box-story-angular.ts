import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { storiesOf } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';
import './combo-box';
import './combo-box-item';

const createProps = () => ({
  open: boolean('Open (open)', false),
  disabled: boolean('Disabled (disabled)', false),
  helperText: text('Helper text (helper-text)', ''),
  labelText: text('Label text (label-text)', ''),
  light: boolean('Light variant (light)', false),
  value: text('The value of the selected item (value)', ''),
  triggerContent: text('The default content of the trigger button (trigger-content)', 'Select an item'),
  disableSelection: boolean(
    'Disable user-initiated selection change (Call event.preventDefault() in bx-combo-box-beingselected event)',
    false
  ),
});

storiesOf('Combo box', module)
  .addDecorator(withKnobs)
  .add('Default', () => ({
    template: `
      <bx-combo-box
        [open]="open"
        [disabled]="disabled"
        [light]="light"
        [helperText]="helperText"
        [labelText]="labelText"
        [value]="value"
        [triggerContent]="triggerContent"
        (bx-combo-box-beingselected)="onBeforeSelect($event)"
        (bx-combo-box-selected)="onSelect($event)"
      >
        <bx-combo-box-item value="all">Option 1</bx-combo-box-item>
        <bx-combo-box-item value="cloudFoundry">Option 2</bx-combo-box-item>
        <bx-combo-box-item value="staging">Option 3</bx-combo-box-item>
        <bx-combo-box-item value="dea">Option 4</bx-combo-box-item>
        <bx-combo-box-item value="router">Option 5</bx-combo-box-item>
      </bx-combo-box>
    `,
    props: (({ disableSelection, ...rest }) => {
      const beforeSelectedAction = action('bx-dropdown-beingselected');
      const onBeforeSelect = (event: CustomEvent) => {
        beforeSelectedAction(event);
        if (disableSelection) {
          event.preventDefault();
        }
      };
      return {
        ...rest,
        onBeforeSelect,
        onSelect: action('bx-dropdown-selected'),
      };
    })(createProps()),
    moduleMetadata: {
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    },
  }));
