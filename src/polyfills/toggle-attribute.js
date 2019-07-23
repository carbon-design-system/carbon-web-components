if (!Element.prototype.toggleAttribute) {
  Element.prototype.toggleAttribute = function toggleAttribute(name, force) {
    const oldState = Boolean(this.hasAttribute(name));
    const newState = typeof force !== 'undefined' ? Boolean(force) : !oldState;
    if (oldState !== newState) {
      if (newState) {
        this.setAttribute(name, '');
      } else {
        this.removeAttribute(name);
      }
    }
    return newState;
  };
}
