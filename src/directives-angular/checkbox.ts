/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Directive, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, CheckboxControlValueAccessor } from '@angular/forms';
import settings from 'carbon-components/es/globals/js/settings';

const prefix = settings.prefix; // eslint-disable-line prefer-destructuring

@Directive({
  selector: `
    ${prefix}-checkbox[formControlName],${prefix}-checkbox[formControl],${prefix}-checkbox[ngModel],
    ${prefix}-toggle[formControlName],${prefix}-toggle[formControl],${prefix}-toggle[ngModel],
  `,
  host: {
    '(input)': 'onChange($event.target.checked)',
    '(blur)': 'onTouched()',
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BXCheckboxDirective), // eslint-disable-line no-use-before-define
      multi: true,
    },
  ],
})
export class BXCheckboxDirective extends CheckboxControlValueAccessor {} // eslint-disable-line import/prefer-default-export
