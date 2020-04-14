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
const { createMetadataVisitor } = require('./babel-plugin-create-react-custom-element-type');

module.exports = function generateCreateReactCustomElementType(api) {
  const { types: t } = api;
  const metadataVisitor = createMetadataVisitor(api);

  const types = {
    Boolean: 'boolean',
    Number: 'number',
  };

  return {
    name: 'create-react-custom-element-type',
    visitor: {
      Program(path, { file }) {
        const declaredProps = {};
        const customEvents = {};
        const context = { file, declaredProps, customEvents };
        // Gathers metadata of custom element properties and events, into `context`
        path.traverse(metadataVisitor, context);

        const { className, classComments = [] } = context;
        const props = Object.keys(declaredProps).reduce((acc, key) => {
          const { comments = [], type } = declaredProps[key];
          return [...acc, comments.map(({ value }) => `/*${value}*/`).join('\n'), `${key}?: ${types[type] || 'string'};`];
        }, []);

        const build = template(
          `
            import { Component } from 'react';

            interface ComponentProps {
              ${props.join('\n')}
            }

            ${classComments.map(({ value }) => `/*${value}*/`).join('\n')}
            declare class ${className} extends Component<ComponentProps> {}
            export default ${className};
          `,
          {
            plugins: ['typescript'],
            preserveComments: true,
            sourceType: 'module',
          }
        );

        const body = build();
        path.replaceWith(t.program(body));
        path.stop();
      },
    },
  };
};
