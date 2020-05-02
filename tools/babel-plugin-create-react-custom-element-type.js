/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { basename, dirname, isAbsolute, join, relative, resolve } = require('path');
const { default: template } = require('@babel/template');
const { default: traverse } = require('@babel/traverse');
const { default: transformTemplateLiterals } = require('@babel/plugin-transform-template-literals');

const regexEvent = /^event/;

function createMetadataVisitor(api) {
  const { types: t } = api;

  /**
   * @param {Path} path The Babel path what a `@property()` decorator call refers to.
   * @returns {boolean} `true` if such decorator is imported from `lit-element`.
   */
  const propertyIsFromLit = path => {
    const { parentPath } = path;
    return (
      path.isImportSpecifier() &&
      path.get('imported').isIdentifier({ name: 'property' }) &&
      parentPath.isImportDeclaration &&
      parentPath.get('source').isStringLiteral({ value: 'lit-element' })
    );
  };

  const getParentClassImportSource = path => {
    const { parentPath } = path;
    if (path.isImportDefaultSpecifier() && parentPath.isImportDeclaration && parentPath.get('source').isStringLiteral()) {
      return parentPath.get('source').node.value;
    }
    return undefined;
  };

  /**
   * Metadata harvested from `@property` decorator.
   * @typedef {Object} PropertyMetadata
   * @property {string} [type] The property type.
   * @property {string|boolean} [attribute]
   *   The attribute name the property maps to.
   *   `false` means there is no corresponding attribute.
   */

  /**
   * @param {Path} path The Babel path for `@property()` decorator call.
   * @returns {PropertyMetadata} The metadata harvested from the given `@property()` decorator call.
   */
  const getPropertyMetadata = path => {
    const metadata = {};
    const expression = path.get('expression');
    if (!t.isCallExpression(expression)) {
      return undefined;
    }

    if (
      !expression.get('callee').isIdentifier() ||
      !propertyIsFromLit(path.scope.getBinding(expression.get('callee.name').node).path)
    ) {
      return undefined;
    }

    const firstArg = expression.get('arguments.0');
    if (firstArg && firstArg.isObjectExpression()) {
      // eslint-disable-next-line no-restricted-syntax
      for (const property of firstArg.get('properties')) {
        const key = property.get('key');
        const value = property.get('value');
        if (key.isIdentifier({ name: 'type' })) {
          value.assertIdentifier();
          metadata.type = value.get('name').node;
        } else if (key.isIdentifier({ name: 'attribute' })) {
          if (!value.isBooleanLiteral() && !value.isStringLiteral()) {
            throw value.buildCodeFrameError('`attribute` in `@property` must point to a boolean literal or a string literal.');
          }
          metadata.attribute = value.get('value').node;
        }
      }
    }

    const leadingComments = path.parentPath.get('leadingComments');
    if (Array.isArray(leadingComments)) {
      metadata.comments = leadingComments.map(item => item.node);
    }

    return metadata;
  };

  /**
   * A visitor to gather metadata of custom element properties and events,
   * from `type` in `@property()` for the former, from `eventSomething` for the latter.
   * The gathered metadata is stored in the context `declaredProps` for the former, `customEvents` for the latter.
   */
  const metadataVisitor = {
    ClassDeclaration(path, context) {
      const { file } = context;
      const superClass = path.get('superClass');
      if (superClass.isIdentifier()) {
        const parentClassImportSource = getParentClassImportSource(superClass.scope.getBinding(superClass.node.name).path);
        if (parentClassImportSource) {
          const relativeTarget = relative(
            resolve(__dirname, '../src/components'),
            resolve(dirname(file.opts.filename), parentClassImportSource)
          );
          if (!isAbsolute(relativeTarget) && !relativeTarget.startsWith('..')) {
            context.parentDescriptorSource = parentClassImportSource;
          }
        }
      }
      const leadingComments = path.get('leadingComments');
      if (leadingComments) {
        context.classComments = leadingComments.map(item => item.node);
      }
      context.className = path.get('id.name').node;
    },

    ClassMethod(path, { customEvents }) {
      const { static: staticMethod, kind, key } = path.node;
      const { name } = key;
      if (staticMethod && kind === 'get' && regexEvent.test(name)) {
        const body = path.get('body');
        const firstBody = body.get('body.0');
        firstBody.assertReturnStatement();
        const argument = firstBody.get('argument');
        if (!argument.isStringLiteral() && !argument.isTemplateLiteral()) {
          throw firstBody.buildCodeFrameError(
            '`static get eventFoo` must have and be only with a return statement with a string literal or a template literal.'
          );
        }
        customEvents[name] = t.cloneDeep(argument.node);
      }
    },

    ClassProperty(path, { customEvents }) {
      const { static: staticField, key } = path.node;
      const value = path.get('value');
      const { name } = key;
      if (staticField && regexEvent.test(name)) {
        if (!value.isStringLiteral() && !value.isTemplateLiteral()) {
          throw value.buildCodeFrameError('`static eventFoo` must refer to a string literal or a template literal.');
        }
        customEvents[name] = t.cloneDeep(value.node);
      }
    },

    Decorator(path, context) {
      const { parent, parentPath } = path;
      const { declaredProps } = context;
      const expression = path.get('expression');
      const customElementName = expression.get('arguments.0');
      if (expression.isCallExpression() && expression.get('callee').isIdentifier({ name: 'customElement' })) {
        if (!customElementName.isStringLiteral() && !customElementName.isTemplateLiteral()) {
          throw customElementName.buildCodeFrameError('`@customElement()` must be called with the custom element name.');
        }
        context.customElementName = customElementName.node;
      }

      const metadata = getPropertyMetadata(path);
      if (metadata) {
        if (
          !parentPath.isClassProperty() &&
          (!parentPath.isClassMethod() || (parentPath.node.kind !== 'get' && parentPath.node.kind !== 'set'))
        ) {
          throw parentPath.buildCodeFrameError('`@property()` must target class properties.');
        }
        declaredProps[parent.key.name] = metadata;
      }
    },

    ExportNamedDeclaration(path, context) {
      context.hasNamedExport = true;
    },
  };

  return metadataVisitor;
}

module.exports = function generateCreateReactCustomElementType(api) {
  const { types: t } = api;

  const booleanSerializerIdentifier = t.identifier('booleanSerializer');
  const numberSerializerIdentifier = t.identifier('numberSerializer');
  const objectSerializerIdentifier = t.identifier('objectSerializer');

  /**
   * The named import specifiers associated with `type` in `@property`.
   * @type {Object<string, ImportSpecifier>}
   */
  const importSpecifiers = {
    Boolean: t.importSpecifier(booleanSerializerIdentifier, booleanSerializerIdentifier),
    Number: t.importSpecifier(numberSerializerIdentifier, numberSerializerIdentifier),
    Object: t.importSpecifier(objectSerializerIdentifier, objectSerializerIdentifier),
  };

  /**
   * The serializers associated with `type` in `@property`.
   * @type {Object<string, Identifier>}
   */
  const serializers = {
    Boolean: booleanSerializerIdentifier,
    Number: numberSerializerIdentifier,
    Object: objectSerializerIdentifier,
  };

  /**
   * @param {Object<string, PropertyMetadata>} The list of metadata harvested from `@property()` decorator calls.
   * @returns {ImportDeclaration} The `import` statement for `src/globals/wrappers/createReactCustomElementType`.
   */
  const buildCreateReactCustomElementTypeImport = declaredProps => {
    const typesInUse = Object.keys(declaredProps)
      .map(name => declaredProps[name].type)
      .filter(type => importSpecifiers[type]);

    return t.importDeclaration(
      [
        t.importDefaultSpecifier(t.identifier('createReactCustomElementType')),
        ...Array.from(new Set(typesInUse)).map(type => importSpecifiers[type]),
      ],
      t.stringLiteral('../../globals/wrappers/createReactCustomElementType')
    );
  };

  /**
   * @param {Object<string, PropertyMetadata>} The list of metadata harvested from `@property()` decorator calls.
   * @returns {ObjectProperty[]}
   *   The list of `{ attribute: 'attribute-name', serialize: typeSerializer }` generated from `@property()` decorators.
   */
  const buildPropsDescriptor = declaredProps =>
    Object.keys(declaredProps).map(name => {
      const { type, attribute } = declaredProps[name];
      const propDesciptor = [];
      if (attribute === false) {
        propDesciptor.push(t.objectProperty(t.identifier('attribute'), t.booleanLiteral(false)));
      } else {
        if (type && type !== 'String') {
          const serializer = serializers[type];
          if (!serializer) {
            throw new Error(`No serializer found for type: ${type}`);
          }
          propDesciptor.push(t.objectProperty(t.identifier('serialize'), serializer));
        }
        if (attribute) {
          propDesciptor.push(t.objectProperty(t.identifier('attribute'), t.stringLiteral(attribute)));
        }
      }
      return t.objectProperty(t.identifier(name), t.objectExpression(propDesciptor));
    });

  /**
   * @param {Object<string, StringLiteral|TemplateLiteral>}
   *   The list of metadata harvested from `eventSomething` static properties.
   * @returns {ObjectProperty[]} The list of `{ event: 'event-name' }` generated from `eventSomething` static properties.
   */
  const buildEventsDescriptor = customEvents =>
    Object.keys(customEvents).map(name =>
      t.objectProperty(
        t.identifier(name.replace(regexEvent, 'on')),
        t.objectExpression([t.objectProperty(t.identifier('event'), customEvents[name])])
      )
    );

  const metadataVisitor = createMetadataVisitor(api);

  /**
   * A Babel plugin that first gathers metadata of custom element properties/events from AST,
   * then creates another AST of `createReactCustomElementType()` and replaces the original AST with the created one.
   */
  return {
    name: 'create-react-custom-element-type',
    visitor: {
      Program(path, { file }) {
        const declaredProps = {};
        const customEvents = {};
        const context = { file, declaredProps, customEvents };
        // Gathers metadata of custom element properties and events, into `context`
        path.traverse(metadataVisitor, context);

        const relativePath = relative(resolve(__dirname, '../src/components'), file.opts.filename);
        const retargedPath = t.stringLiteral(`../../components/${join(dirname(relativePath), basename(relativePath, '.ts'))}`);

        // Creates a module with `createReactCustomElementType()`
        // with the gathered metadata of custom element properties and events
        const descriptors = t.objectExpression([...buildPropsDescriptor(declaredProps), ...buildEventsDescriptor(customEvents)]);
        const descriptorsWithParent = !context.parentDescriptorSource
          ? descriptors
          : t.callExpression(t.memberExpression(t.identifier('Object'), t.identifier('assign')), [
              t.objectExpression([]),
              t.identifier('parentDescriptor'),
              descriptors,
            ]);

        let body;
        if (!context.customElementName) {
          // Custom element name not found means that it's likely a module not for custom element
          // (e.g. an abstract class like floating menu)
          // If so, we just export empty `descriptor` and re-export from the original class
          body = [template.ast`export var descriptor = {};`];
        } else {
          body = [
            t.exportNamedDeclaration(
              null,
              [t.exportSpecifier(t.identifier('default'), t.identifier('CustomElement'))],
              retargedPath
            ),
            buildCreateReactCustomElementTypeImport(declaredProps),
            ...template.ast`
              import settings from "carbon-components/es/globals/js/settings";
              var prefix = settings.prefix;
              export var descriptor = ${descriptorsWithParent};
              export default createReactCustomElementType(${context.customElementName}, descriptor);
            `,
          ];
        }
        if (context.parentDescriptorSource) {
          body.unshift(
            t.importDeclaration(
              [t.importSpecifier(t.identifier('parentDescriptor'), t.identifier('descriptor'))],
              t.stringLiteral(context.parentDescriptorSource)
            )
          );
        }
        if (context.hasNamedExport) {
          body.unshift(t.exportAllDeclaration(retargedPath));
        }
        const program = t.program(body);
        traverse(program, transformTemplateLiterals(api).visitor, path.scope, path);
        path.replaceWith(program);
        path.stop();
      },
    },
  };
};

module.exports.createMetadataVisitor = createMetadataVisitor;
