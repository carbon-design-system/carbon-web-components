/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, select, text } from '@storybook/addon-knobs';
import Add16 from '@carbon/icons-vue/es/add/16';
import createVueBindingsFromProps from '../../../.storybook/vue/create-vue-bindings-from-props';
import { BUTTON_KIND } from './button';

const kinds = {
  [`Primary button (${BUTTON_KIND.PRIMARY})`]: BUTTON_KIND.PRIMARY,
  [`Secondary button (${BUTTON_KIND.SECONDARY})`]: BUTTON_KIND.SECONDARY,
  [`Danger button (${BUTTON_KIND.DANGER})`]: BUTTON_KIND.DANGER,
  [`Ghost button (${BUTTON_KIND.GHOST})`]: BUTTON_KIND.GHOST,
};

const createProps = () => ({
  kind: select('Button kind (kind)', kinds, BUTTON_KIND.PRIMARY),
  disabled: boolean('Disabled (disabled)', false),
  small: boolean('Small (small)', false),
  href: text('Link href (href)', ''),
  onClick: action('click'),
});

storiesOf('Button', module)
  .addDecorator(withKnobs)
  .add('Default', () => ({
    template: `
      <bx-btn :kind="kind" :disabled="disabled" :small="small" :href="href" @click="onClick">Button</bx-btn>
    `,
    ...createVueBindingsFromProps(createProps()),
  }))
  .add('Icon', () => ({
    template: `
      <bx-btn :kind="kind" :disabled="disabled" :small="small" :href="href" @click="onClick">
        <add-16 slot="icon"></add-16>
      </bx-btn>
    `,
    components: {
      'add-16': Add16,
    },
    ...createVueBindingsFromProps(createProps()),
  }))
  .add('Text and icon', () => ({
    template: `
      <bx-btn :kind="kind" :disabled="disabled" :small="small" :href="href" @click="onClick">
        Button <add-16 slot="icon"></add-16>
      </bx-btn>
    `,
    components: {
      'add-16': Add16,
    },
    ...createVueBindingsFromProps(createProps()),
  }));
