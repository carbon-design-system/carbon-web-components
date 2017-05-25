'use strict';

module.exports = function supercall(babel) {
  const t = babel.types;

  function testMemberExpressionWithIdentifiers(node, name) {
    const pair = name.split('.');
    if (pair.length !== 2) {
      throw new Error('The name should be in object.property format.');
    }
    return t.isMemberExpression(node)
      && t.isIdentifier(node.object) && node.object.name === pair[0]
      && t.isIdentifier(node.property) && node.property.name === pair[1];
  }

  return {
    visitor: {
      CallExpression(path) {
        const possibleConstructorReturn = path.parentPath.node.callee;
        const node = path.node;
        if (testMemberExpressionWithIdentifiers(possibleConstructorReturn, 'babelHelpers.possibleConstructorReturn')
          && t.isMemberExpression(node.callee)
          && t.isIdentifier(node.callee.property) && /^(call|apply)$/.test(node.callee.property.name)
          && t.isLogicalExpression(node.callee.object)
          && t.isCallExpression(node.callee.object.right)) {
          const requestForPrototype = node.callee.object.right.callee;
          if (testMemberExpressionWithIdentifiers(requestForPrototype, 'Object.getPrototypeOf')) {
            const nativeSuperCall = t.callExpression(t.memberExpression(t.identifier('Reflect'), t.identifier('construct')), [
              node.callee.object.right,
              node.callee.property.name === 'call' ? t.arrayExpression(node.arguments.slice(1)) : node.arguments[1],
              node.callee.object.right.arguments[0],
            ]);
            const checkForNativeSuperCallAvailability
              = t.binaryExpression('!==', t.unaryExpression('typeof', t.identifier('Reflect')), t.stringLiteral('undefined'));
            const conditionalNativeSuperCall
              = t.expressionStatement(t.conditionalExpression(checkForNativeSuperCallAvailability, nativeSuperCall, node));
            path.replaceWith(conditionalNativeSuperCall);
            path.skip();
          }
        }
      },
    },
  };
};
