import { selectorTabbable } from '../settings';

/**
 * @param Base The base class.
 * @returns A mix-in implementing `.focus()` method that focuses on the first focusable element in the shadow DOM.
 */
const FocusMixin = <T extends Constructor<HTMLElement>>(Base: T) =>
  class extends Base {
    /**
     * Focuses on the first focusable element in the shadow DOM.
     */
    focus() {
      // @ts-ignore: Until `delegatesFocus` is added to `ShadowRoot` definition
      if (this.shadowRoot!.delegatesFocus) {
        super.focus();
      } else {
        (this.shadowRoot!.querySelector(selectorTabbable) as HTMLElement).focus();
      }
    }
  };

export default FocusMixin;
