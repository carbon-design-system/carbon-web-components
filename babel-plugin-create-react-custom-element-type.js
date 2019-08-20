'use strict';

const { basename, dirname, join, relative, resolve } = require('path');
const { default: template } = require('@babel/template');
const { default: traverse } = require('@babel/traverse');
const { default: transformTemplateLiterals } = require('@babel/plugin-transform-template-literals');

const regexEvent = /^event/;

module.exports = function generateCreateReactCustomElementType(api) {
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

    return metadata;
  };

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
    Object.keys(declaredProps)
      .filter(name => declaredProps[name].attribute !== false)
      .map(name => {
        const { type, attribute } = declaredProps[name];
        const propDesciptor = [];
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

  const metadataVisitor = {
    ClassMethod(path) {
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
        this.customEvents[name] = t.cloneDeep(argument.node);
      }
    },

    ClassProperty(path) {
      const { static: staticField, key } = path.node;
      const value = path.get('value');
      const { name } = key;
      if (staticField && regexEvent.test(name)) {
        if (!value.isStringLiteral() && !value.isTemplateLiteral()) {
          throw value.buildCodeFrameError('`static eventFoo` must refer to a string literal or a template literal.');
        }
        this.customEvents[name] = t.cloneDeep(value.node);
      }
    },

    Decorator(path) {
      const { parent, parentPath } = path;
      const expression = path.get('expression');
      const customElementName = expression.get('arguments.0');
      if (expression.isCallExpression() && expression.get('callee').isIdentifier({ name: 'customElement' })) {
        if (!customElementName.isStringLiteral() && !customElementName.isTemplateLiteral()) {
          throw customElementName.buildCodeFrameError('`@customElement()` must be called with the custom element name.');
        }
        this.customElementName = customElementName.node;
      }

      const metadata = getPropertyMetadata(path);
      if (metadata) {
        parentPath.assertClassProperty();
        this.declaredProps[parent.key.name] = metadata;
      }
    },

    ExportNamedDeclaration() {
      this.hasNamedExport = true;
    },
  };

  const toplevelVisitor = {
    Program(path, { file }) {
      const declaredProps = {};
      const customEvents = {};
      const context = { declaredProps, customEvents };
      path.traverse(metadataVisitor, context);

      if (!context.customElementName) {
        // Custom element name is not found.
        // Likely a module not for custom element (e.g. an abstract class like floating menu) is used with this plugin.
        path.replaceWith(t.program([]));
        path.stop();
        return;
      }

      const relativePath = relative(resolve(__dirname, 'src/components'), file.opts.filename);
      const retargedPath = t.stringLiteral(`../../components/${join(dirname(relativePath), basename(relativePath, '.ts'))}`);

      const descriptors = [...buildPropsDescriptor(declaredProps), ...buildEventsDescriptor(customEvents)];
      const body = [
        t.exportNamedDeclaration(null, [t.exportSpecifier(t.identifier('default'), t.identifier('CustomElement'))], retargedPath),
        buildCreateReactCustomElementTypeImport(declaredProps),
        ...template.ast`
          import settings from "carbon-components/es/globals/js/settings";
          var prefix = settings.prefix; 
          export default createReactCustomElementType(${context.customElementName}, ${t.objectExpression(descriptors)});
        `,
      ];
      if (context.hasNamedExport) {
        body.unshift(t.exportAllDeclaration(retargedPath));
      }
      const program = t.program(body);
      traverse(program, transformTemplateLiterals(api).visitor, path.scope, path);
      path.replaceWith(program);
      path.stop();
    },
  };

  return {
    name: 'create-react-custom-element-type',
    visitor: toplevelVisitor,
  };
};
