import settings from 'carbon-components/es/globals/js/settings';
import { ifDefined } from 'lit-html/directives/if-defined';
import { html, property, customElement, LitElement } from 'lit-element';
import styles from './header.scss';

const { prefix } = settings;

/**
 * Header nav item.
 */
@customElement(`${prefix}-header-nav-item`)
class BXHeaderNavItem extends LitElement {
  /**
   * Link `href`. Corresponds to the attribute with the same name.
   */
  @property()
  href!: string;

  createRenderRoot() {
    return this.attachShadow({ mode: 'open', delegatesFocus: true });
  }

  render() {
    const { href } = this;
    return html`
      <a role="menuitem" class="${prefix}--header__menu-item" tabindex="0" href="${ifDefined(href)}">
        <span class="${prefix}--text-truncate--end"><slot></slot></span>
      </a>
    `;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default BXHeaderNavItem;
