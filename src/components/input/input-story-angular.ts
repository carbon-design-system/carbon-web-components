import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { storiesOf, moduleMetadata } from '@storybook/angular';
import * as knobs from '@storybook/addon-knobs/angular';
import './input';
import '../form/form-item';
import { createProps } from './stories/helpers';

storiesOf('Input', module)
  .addDecorator(knobs.withKnobs)
  .addDecorator(
    moduleMetadata({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
  )
  .add('Default', () => ({
    template: `<bx-input
        [disabled]="disabled"
        [value]="value"
        [type]="type"
        [placeholder]="placeholder"
        [invalid]="invalid"
        (input)="onInput()"
      ></bx-input>`,
    props: createProps(knobs),
  }))
  .add('Form item', () => ({
    template: `<bx-form-item [invalid]="invalid" [disabled]="disabled">
        <span slot="label">Label text</span>
        <span slot="help-text">Optional helper text</span>
        <bx-input [value]="value" [placeholder]="placeholder" (input)="onInput()"></bx-input>
        <span slot="validation">Something isn't right</span>
      </bx-form-item>`,
    props: createProps(knobs),
  }));
