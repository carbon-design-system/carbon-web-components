/**
 * A selector selecting tabbable nodes.
 * Borrowed from `carbon-angular`. tabbable === focusable.
 */
const tabbableSelector = `
  a[href], area[href], input:not([disabled]):not([tabindex='-1']),
  button:not([disabled]):not([tabindex='-1']),select:not([disabled]):not([tabindex='-1']),
  textarea:not([disabled]):not([tabindex='-1']),
  iframe, object, embed, *[tabindex]:not([tabindex='-1']), *[contenteditable=true]
`;

// Because we're going to have a bunch of exports
// eslint-disable-next-line import/prefer-default-export
export { tabbableSelector };
