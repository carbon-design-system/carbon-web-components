import { ifDefined } from 'lit-html/directives/if-defined';

/**
 * A variant of `lit-html/directives/if-defined` which stops rendering if the given value is `null` in addition to `undefined`.
 * @param The value.
 */
export default value => ifDefined(value == null ? undefined : value);
