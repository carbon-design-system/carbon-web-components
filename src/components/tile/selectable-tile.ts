import settings from 'carbon-components/es/globals/js/settings';
import classnames from 'classnames';
import { ifDefined } from 'lit-html/directives/if-defined';
import { html, svg, property, query, customElement, LitElement } from 'lit-element';
import CheckmarkFilled16 from '@carbon/icons/lib/checkmark--filled/16';
import styles from './tile.scss';

const { prefix } = settings;

/**
 * Selectable tile.
 */
@customElement(`${prefix}-selectable-tile`)
class BXSelectableTile extends LitElement {
  @query('input')
  _checkboxNode!: HTMLInputElement;

  /**
   * Unique ID used for form elements.
   */
  protected _uniqueId = Math.random()
    .toString(36)
    .slice(2);

  /**
   * The element ID for the check box.
   */
  protected get _checkboxId() {
    const { id: elementId, _uniqueId: uniqueId } = this;
    return `__bx-ce-selectable-tile_${elementId || uniqueId}`;
  }

  /**
   * Handles `change` event on the `<input>` in the shadow DOM.
   */
  protected _handleChange() {
    this.selected = this._checkboxNode.checked;
  }

  /**
   * The a11y text for the checkmark icon of the selected state. Corresponds to `checkmark-label` attribute.
   */
  @property({ attribute: 'checkmark-label' })
  checkmarkLabel!: string;

  /**
   * The form name. Corresponds to the attribute with the same name.
   */
  @property()
  name!: string;

  /**
   * `true` to show the selected state. Corresponds to the attribute with the same name.
   */
  @property({ type: Boolean, reflect: true })
  selected = false;

  /**
   * The form value. Corresponds to the attribute with the same name.
   */
  @property()
  value!: string;

  createRenderRoot() {
    return this.attachShadow({ mode: 'open', delegatesFocus: true });
  }

  render() {
    const { checkmarkLabel, name, selected, value, _checkboxId: checkboxId, _handleChange: handleChange } = this;
    const classes = classnames(`${prefix}--tile`, `${prefix}--tile--selectable`, {
      [`${prefix}--tile--is-selected`]: selected,
    });
    return html`
      <input
        type="checkbox"
        id="${checkboxId}"
        class="${prefix}--tile-input"
        tabindex="-1"
        name="${ifDefined(name == null ? undefined : name)}"
        value="${ifDefined(value == null ? undefined : value)}"
        .checked=${selected}
        @change=${handleChange}
      />
      <label for="${checkboxId}" class="${classes}" tabindex="0">
        <div class="${prefix}--tile__checkmark">
          ${CheckmarkFilled16({
            children: !checkmarkLabel ? undefined : svg`<title>${checkmarkLabel}</title>`,
          })}
        </div>
        <div class="${prefix}--tile-content"><slot></slot></div>
      </label>
    `;
  }

  static styles = styles;
}

export default BXSelectableTile;
