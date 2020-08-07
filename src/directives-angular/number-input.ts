/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Directive, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, NumberValueAccessor } from '@angular/forms';
import settings from 'carbon-components/es/globals/js/settings';

const prefix = settings.prefix; // eslint-disable-line prefer-destructuring

@Directive({
  selector: `${prefix}-number-input[formControlName],${prefix}-number-input[formControl],${prefix}-number-input[ngModel]`,
  host: {
    '(change)': 'onChange($event.target.value)',
    '(input)': 'onChange($event.target.value)',
    '(blur)': 'onTouched()',
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BXNumberInputDirective), // eslint-disable-line no-use-before-define
      multi: true,
    },
  ],
})
export class BXNumberInputDirective extends NumberValueAccessor {} // eslint-disable-line import/prefer-default-export
