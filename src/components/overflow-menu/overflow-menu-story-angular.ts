import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { storiesOf } from '@storybook/angular';
import { withKnobs, boolean, select } from '@storybook/addon-knobs/angular';
import { FLOATING_MENU_DIRECTION } from '../floating-menu/floating-menu';
import './overflow-menu';
import './overflow-menu-body';
import './overflow-menu-item';

const directions = {
  [`Bottom (${FLOATING_MENU_DIRECTION.BOTTOM})`]: FLOATING_MENU_DIRECTION.BOTTOM,
  [`Top (${FLOATING_MENU_DIRECTION.TOP})`]: FLOATING_MENU_DIRECTION.TOP,
};

const createProps = () => ({
  open: boolean('Open (open)', false),
  disabled: boolean('Disabled (disabled)', false),
  direction: select('Direction (direction in <bx-overflow-menu-body>)', directions, FLOATING_MENU_DIRECTION.BOTTOM),
});

storiesOf('Overflow menu', module)
  .addDecorator(withKnobs)
  .add('Default', () => ({
    template: `
      <bx-overflow-menu [open]="open" [disabled]="disabled">
        <bx-overflow-menu-body [direction]="direction">
          <bx-overflow-menu-item>Option 1</bx-overflow-menu-item>
          <bx-overflow-menu-item>Option 2</bx-overflow-menu-item>
          <bx-overflow-menu-item>Option 3</bx-overflow-menu-item>
          <bx-overflow-menu-item>Option 4</bx-overflow-menu-item>
          <bx-overflow-menu-item>Option 5</bx-overflow-menu-item>
        </bx-overflow-menu-body>
      </bx-overflow-menu>
    `,
    props: createProps(),
    moduleMetadata: {
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    },
  }));
