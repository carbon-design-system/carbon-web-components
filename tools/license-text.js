/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const licenseText = `Copyright IBM Corp\\..* \\d+.*This source code is licensed under the Apache-2\\.0 license found in the
.*LICENSE file in the root directory of this source tree.`;
const licenseTextCurrentYear = `Copyright IBM Corp\\..* (\\d+, +)?2020
.*This source code is licensed under the Apache-2\\.0 license found in the
.*LICENSE file in the root directory of this source tree.`;
const reLicenseText = new RegExp(licenseText, 's');
reLicenseText.reLicenseTextCurrentYear = new RegExp(licenseTextCurrentYear, 's');

module.exports = reLicenseText;
