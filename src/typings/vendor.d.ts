/**
 * An object to keep track of things that can be cleaned up.
 */
interface Handle {
  /**
   * Releases the thing that this object is keeping track of.
   * For example, if this `Handle` is keeping track of an event listener, this `release()` method removes the event listener.
   */
  release(): null;
}

declare module 'carbon-components/es/globals/js/settings' {
  const settings: {
    /**
     * The brand prefix.
     */
    prefix: string;
  };
  export default settings;
}

declare module 'carbon-components/es/globals/js/misc/on' {
  /**
   * Adds an event listener function to the list of event listeners for the given event type on the given element.
   * @param element The element to add event listener on.
   * @param type A case-sensitive string representing the event type to listen for.
   * @param listener The event listener callback.
   * @param options An options object that specifies characteristics about the event listener.
   * @returns The handle to release the event listener. Its `release()` method removes the event listener.
   */
  function on(
    element: Element,
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions
  ): Handle;
  export default on;
}
