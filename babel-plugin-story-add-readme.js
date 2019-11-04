/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { default: template } = require('@babel/template');

module.exports = function storyAddReadme() {
  const getParentClassImportSource = path => {
    const { parentPath } = path;
    if (path.isImportSpecifier() && parentPath.isImportDeclaration && parentPath.get('source').isStringLiteral()) {
      return parentPath.get('source').node.value;
    }
    return undefined;
  };

  return {
    visitor: {
      CallExpression(path) {
        const callee = path.get('callee');
        if (callee.isIdentifier({ name: 'storiesOf' })) {
          const parentClassImportSource = getParentClassImportSource(callee.scope.getBinding(callee.node.name).path);
          if (parentClassImportSource.startsWith('@storybook/')) {
            path.replaceWith(template.ast`
              ${path.node}.addParameters({
                notes: (function () {
                  try {
                    const readme = require('./README.md');
                    return readme && readme.default;
                  } catch {}
                })()
              })
            `);
            path.skip();
          }
        }
      },
    },
  };
};
