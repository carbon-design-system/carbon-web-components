/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { storiesOf, moduleMetadata } from '@storybook/angular';
import * as knobs from '@storybook/addon-knobs/angular';
import './textarea';
import '../form/form-item';
import createProps from './stories/helpers';

storiesOf('Textarea', module)
  .addDecorator(knobs.withKnobs)
  .addDecorator(
    moduleMetadata({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
  )
  .add('Default', () => ({
    template: `<bx-textarea
        [disabled]="disabled"
        [value]="value"
        [placeholder]="placeholder"
        [invalid]="invalid"
        (input)="onInput()"
      ></bx-textarea>`,
    props: createProps(knobs),
  }))
  .add('Form item', () => ({
    template: `
      <bx-form-item>
        <bx-textarea [value]="value" [placeholder]="placeholder" (input)="onInput()" [invalid]="invalid" [disabled]="disabled">
          <span slot="label-text">Label text</span>
          <span slot="helper-text">Optional helper text</span>
          <span slot="validity-message">Something isn't right</span>
        </bx-textarea>
      </bx-form-item>`,
    props: createProps(knobs),
  }))
  .add('Without form item wrapper', () => ({
    template: `
        <bx-textarea [value]="value" [placeholder]="placeholder" (input)="onInput()" [invalid]="invalid" [disabled]="disabled">
          <span slot="label-text">Label text</span>
          <span slot="helper-text">Optional helper text</span>
          <span slot="validity-message">Something isn't right</span>
        </bx-textarea>`,
    props: createProps(knobs),
  }));
