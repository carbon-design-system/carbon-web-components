/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { storiesOf } from '@storybook/vue';
import * as knobs from '@storybook/addon-knobs/angular';
import './textarea';
import '../form/form-item';
import createProps from './stories/helpers';
import createVueBindingsFromProps from '../../../.storybook/vue/create-vue-bindings-from-props';

storiesOf('Textarea', module)
  .addDecorator(knobs.withKnobs)
  .add('Default', () => ({
    template: `<bx-textarea
        :disabled="disabled"
        :value="value"
        :placeholder="placeholder"
        :invalid="invalid"
        @input="onInput"
      ></bx-textarea>`,
    ...createVueBindingsFromProps(createProps(knobs)),
  }))
  .add('Form item', () => ({
    template: `
      <bx-form-item>
        <bx-textarea :value="value" :placeholder="placeholder" @input="onInput" :invalid="invalid" :disabled="disabled">
          <span slot="label-text">Label text</span>
          <span slot="helper-text">Optional helper text</span>
          <span slot="validity-message">Something isn't right</span>
        </bx-textarea>
      </bx-form-item>`,
    ...createVueBindingsFromProps(createProps(knobs)),
  }))
  .add('Without form item wrapper', () => ({
    template: `
        <bx-textarea :value="value" :placeholder="placeholder" @input="onInput" :invalid="invalid" :disabled="disabled">
          <span slot="label-text">Label text</span>
          <span slot="helper-text">Optional helper text</span>
          <span slot="validity-message">Something isn't right</span>
        </bx-textarea>`,
    ...createVueBindingsFromProps(createProps(knobs)),
  }));
