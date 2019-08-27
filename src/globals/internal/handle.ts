/**
 * An object to keep track of things that can be cleaned up.
 */
export default interface Handle {
  /**
   * Releases the thing that this object is keeping track of.
   * For example, if this `Handle` is keeping track of an event listener, this `release()` method removes the event listener.
   */
  release(): null;
}
