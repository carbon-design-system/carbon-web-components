/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { storiesOf } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, text } from '@storybook/addon-knobs/angular';
import './accordion';
import './accordion-item';

const createProps = () => ({
  open: boolean('Open the section (open)', false),
  title: text('The title (title)', 'Section title'),
  disableToggle: boolean(
    'Disable user-initiated toggle action (Call event.preventDefault() in bx-accordion-beingtoggled event)',
    false
  ),
});

storiesOf('Accordion', module)
  .addDecorator(withKnobs)
  .add('Default', () => ({
    template: `
      <bx-accordion
        (bx-accordion-item-beingtoggled)="handleBeforeToggle($event)"
        (bx-accordion-item-toggled)="handleToggle($event)"
      >
        <bx-accordion-item [open]="open">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
            aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <span slot="title">{{ title }}</span>
        </bx-accordion-item>
        <bx-accordion-item [open]="open">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
            aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <span slot="title">{{ title }}</span>
        </bx-accordion-item>
        <bx-accordion-item [open]="open">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
            aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <span slot="title">{{ title }}</span>
        </bx-accordion-item>
      </bx-accordion>
    `,
    props: (({ disableToggle, ...rest }) => {
      const beforeSelectedAction = action('bx-accordion-item-beingtoggled');
      return {
        ...rest,
        handleBeforeToggle: (event: CustomEvent) => {
          beforeSelectedAction(event);
          if (disableToggle) {
            event.preventDefault();
          }
        },
        handleToggle: action('bx-accordion-item-toggled'),
      };
    })(createProps()),
    moduleMetadata: {
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    },
  }));
