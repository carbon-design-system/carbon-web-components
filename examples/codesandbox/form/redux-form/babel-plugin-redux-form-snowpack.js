/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { default: template } = require('@babel/template');

module.exports = function reduxFormSnowpack() {
  return {
    name: 'redux-form-snowpack',
    visitor: {
      VariableDeclarator(path) {
        // Workaround for: https://github.com/redux-form/redux-form/issues/4412
        if (
          path.get('id').isIdentifier({ name: 'castModule' }) &&
          path.get('init').isIdentifier({ name: 'module' }) &&
          path.parentPath.isVariableDeclaration() &&
          path.parentPath.parentPath.parentPath.isFunctionExpression() &&
          path.parentPath.parentPath.parentPath.get('id').isIdentifier({ name: 'isHotReloading' })
        ) {
          const { expression } = template.ast`castModule = typeof module === 'undefined' ? undefined : module`;
          path.replaceWith(expression);
        }
      },
    },
  };
};
