/**
 * A decorator to add event listener to the host element, or its `document`/`window`, of a custom element.
 * The `target` must extend `HostListenerMixin`.
 * @param type
 *   The event type. Can be prefixed with `document:` or `window:`.
 *   The event listener is attached to host element's owner document or its default view in such case.
 * @param options The event listener options.
 */
const HostListener = (type: string, options?: boolean | AddEventListenerOptions) => (target, listenerName: string) => {
  const hostListeners = target.constructor._hostListeners;
  if (!hostListeners) {
    throw new Error('The method `@HostListener` is defined on has to be of a class that has `HostListerMixin`.');
  }
  if (!hostListeners[listenerName]) {
    hostListeners[listenerName] = {};
  }
  hostListeners[listenerName][type] = { options };
};

export default HostListener;
