/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { NgModule } from '@angular/core';
import { BXCheckboxDirective } from './checkbox';
import { BXInputDirective } from './input';
import { BXSliderDirective } from './slider';
import { BXToggleDirective } from './toggle';

@NgModule({
  declarations: [BXCheckboxDirective, BXInputDirective, BXSliderDirective, BXToggleDirective],
  exports: [BXCheckboxDirective, BXInputDirective, BXSliderDirective, BXToggleDirective],
})
export class BXFormAccessorsModule {} // eslint-disable-line import/prefer-default-export
