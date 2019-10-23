/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Directive, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, DefaultValueAccessor } from '@angular/forms';
import settings from 'carbon-components/es/globals/js/settings';

const { prefix } = settings;

@Directive({
  selector: `${prefix}-input[formControlName],${prefix}-input[formControl],${prefix}-input[ngModel]`,
  host: {
    '(input)': '_handleInput($event.target.value)',
    '(blur)': 'onTouched()',
    '(compositionstart)': '_compositionStart()',
    '(compositionend)': '_compositionEnd($event.target.value)',
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BXInputDirective), // eslint-disable-line no-use-before-define
      multi: true,
    },
  ],
})
export default class BXInputDirective extends DefaultValueAccessor {}
