import on from 'carbon-components/es/globals/js/misc/on';

/**
 * The format for the event name used by `@HostListener` decorator.
 */
const EVENT_NAME_FORMAT = /^((document|window|shadowRoot):)?(\w+)$/;

/**
 * @param Base The base class.
 * @returns A mix-in that sets up and cleans up event listeners defined by `@HostListener` decorator.
 */
const HostListenerMixin = <T extends Constructor<HTMLElement>>(Base: T) => {
  /**
   * A mix-in class that sets up and cleans up event listeners defined by `@HostListener` decorator.
   */
  class HostListenerMixinImpl extends Base {
    /**
     * The list of handles managed by this mix-in.
     * @private
     */
    _handles: Set<Handle> = new Set(); // Not using TypeScript `private` due to: microsoft/TypeScript#17744

    connectedCallback() {
      // @ts-ignore: Until `connectedCallback` is added to `HTMLElement` definition
      super.connectedCallback();
      const hostListeners = (this.constructor as typeof HostListenerMixinImpl)._hostListeners;
      Object.keys(hostListeners).forEach(listenerName => {
        Object.keys(hostListeners[listenerName]).forEach(type => {
          // Parses `document:click`/`window:click` format
          const tokens = EVENT_NAME_FORMAT.exec(type);
          if (!tokens) {
            throw new Error(`Could not parse the event name: ${listenerName}`);
          }
          const [, , targetName, unprefixedType] = tokens;
          const target: EventTarget =
            {
              document: this.ownerDocument,
              window: this.ownerDocument!.defaultView,
              shadowRoot: this.shadowRoot,
            }[targetName] || this;

          // Determines the event type for delegated `focus`/`blur` event
          const hasFocusin = 'onfocusin' in this.ownerDocument!.defaultView!;
          const delegatedType: string = {
            focusin: hasFocusin ? 'focusin' : 'focus',
            focus: hasFocusin ? 'focusin' : 'focus',
            focusout: hasFocusin ? 'focusout' : 'blur',
            blur: hasFocusin ? 'focusout' : 'blur',
          }[unprefixedType];

          // Sees if `capture` option of event listener conflicts with `capture` option to use for delegated `focus`/`blur` event
          const { options } = hostListeners[listenerName][type];
          // Despite https://dom.spec.whatwg.org/#concept-flatten-options, primitive type to boolean type coercion seems to happen
          const isCaptureGiven =
            Object(options) === options
              ? typeof (options as AddEventListenerOptions).capture !== 'undefined'
              : typeof options !== 'undefined';
          if (delegatedType && isCaptureGiven) {
            throw new Error(
              '`capture` event listener option with `@HostListener()` cannot be used ' +
                'for `focusin`, `focus`, `focusout` and `blur` events.'
            );
          }

          // Modifies event listener options with `capture` option to use for delegated `focus`/`blur` event
          let massagedOptions: boolean | AddEventListenerOptions = typeof options === 'undefined' ? false : options;
          if (delegatedType) {
            if (Object(options) === options) {
              massagedOptions = {
                ...Object(options),
                capture: !hasFocusin,
              };
            } else {
              massagedOptions = !hasFocusin;
            }
          }

          this._handles.add(
            on(target, (delegatedType || unprefixedType) as keyof HTMLElementEventMap, this[listenerName], massagedOptions)
          );
        });
      });
    }

    disconnectedCallback() {
      this._handles.forEach(handle => {
        handle.release();
        this._handles.delete(handle);
      });
      // @ts-ignore: Until `disconnectedCallback` is added to `HTMLElement` definition
      super.disconnectedCallback();
    }

    /**
     * The map, keyed by method name, of event listeners that should be attached to host element or host document.
     * @private
     */
    static _hostListeners: {
      [listenerName: string]: {
        [type: string]: {
          options?: boolean | AddEventListenerOptions;
        };
      };
    } = {}; // Not using TypeScript `private` due to: microsoft/TypeScript#17744
  }

  return HostListenerMixinImpl;
};

export default HostListenerMixin;
