/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * @param Base The base class.
 * @returns A mix-in implementing `.setCustomValidity()` method.
 */
const ValidityMixin = <T extends Constructor<HTMLElement>>(Base: T) => {
  abstract class ValidityMixinImpl extends Base {
    // Not using TypeScript `protected` due to: microsoft/TypeScript#17744
    /**
     * Checks if the value meets the constrants.
     * @returns `true` if the value meets the constrants. `false` otherwise.
     * @protected
     */
    _testValidity() {
      const { required, value } = this;
      return !required || value;
    }

    /**
     * `true` to show the UI of the invalid state.
     */
    abstract invalid: boolean;

    /**
     * `true` if the value is required.
     */
    abstract required: boolean;

    /**
     * The special validity message for `required`.
     */
    abstract requiredValidityMessage: string;

    /**
     * The validity message.
     */
    abstract validityMessage: string;

    /**
     * The value.
     */
    abstract value: string;

    /**
     * Checks if the value meets the constrants.
     * Fires cancelable `invalid` event if it doesn't.
     * @returns `true` if the value meets the constrants. `false` otherwise.
     */
    checkValidity() {
      if (!this._testValidity()) {
        if (
          this.dispatchEvent(
            new CustomEvent('invalid', {
              bubbles: false,
              cancelable: true,
              composed: false,
            })
          )
        ) {
          this.invalid = true;
          this.validityMessage = this.requiredValidityMessage;
        }
        return false;
      }
      this.invalid = false;
      this.validityMessage = '';
      return true;
    }

    /**
     * Sets the given custom validity message.
     * @param validityMessage The custom validity message
     */
    setCustomValidity(validityMessage: string) {
      this.invalid = Boolean(validityMessage);
      this.validityMessage = validityMessage;
    }
  }
  return ValidityMixinImpl;
};

export default ValidityMixin;
