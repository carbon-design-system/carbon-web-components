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

module.exports = function storyAddReadme({ types: t }) {
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

      ExportDefaultDeclaration(path) {
        const declaration = path.get('declaration');
        if (!declaration.isObjectExpression()) {
          throw declaration.buildCodeFrameError('The default export must be an object literal.');
        }
        const propertiesDefaultExport = declaration.get('properties');
        const parameters = propertiesDefaultExport.find(item => item.get('key').isIdentifier({ name: 'parameters' }));
        const readmeIIFEExpression = template.ast`
          (function () {
            try {
              const readme = require('./README.md');
              return readme && readme.default;
            } catch {}
          })()
        `.expression;
        if (parameters) {
          const value = parameters.get('value');
          if (!value.isObjectExpression()) {
            throw value.buildCodeFrameError('`parameters` in `.story` must be an object literal.');
          }
          const propertiesParameters = value.get('properties');
          if (!propertiesParameters.some(item => item.get('key').isIdentifier({ name: 'notes' }))) {
            const clonedParametersValue = t.cloneDeep(value.node);
            clonedParametersValue.properties.push(t.objectProperty(t.identifier('notes'), readmeIIFEExpression));
            value.replaceWith(clonedParametersValue);
          }
        } else {
          const clonedStoryRight = t.cloneDeep(declaration.node);
          clonedStoryRight.properties.push(
            t.objectProperty(
              t.identifier('parameters'),
              t.objectExpression([t.objectProperty(t.identifier('notes'), readmeIIFEExpression)])
            )
          );
          declaration.replaceWith(clonedStoryRight);
        }
      },
    },
  };
};
