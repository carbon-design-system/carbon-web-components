/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ifDefined } from 'lit/directives/if-defined.js';

/**
 * A variant of `lit/directives/if-defined` which stops rendering if the given value is `null` in addition to `undefined`.
 * @param The value.
 */
export default value => ifDefined(value ?? undefined);
