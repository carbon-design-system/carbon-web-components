class EventManager {
  /**
   * The handles of registered event listeners.
   * @type {Handle[]}
   */
  _handles = [];

  /**
   * Attaches and registers an event listener.
   * @param {Element} elem The DOM element.
   * @param {string} name The event name.
   * @param {Function} handler The event handler.
   * @returns {Handle} The handle to release the event handler.
   */
  on(elem, name, handler) {
    elem.addEventListener(name, handler);
    const handle = {
      release() {
        elem.removeEventListener(name, handler);
        return null;
      },
    };
    this._handles.push(handle);
    return handle;
  }

  /**
   * Releases all registered event listeners.
   * @returns {null}
   */
  reset() {
    for (let handle = this._handles.shift(); handle; handle = this._handles.shift()) {
      handle.release();
    }
    return null;
  }
}

export default EventManager;
