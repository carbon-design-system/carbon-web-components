import classnames from 'classnames';
import { html, property, customElement, LitElement } from 'lit-element';
import CaretLeft24 from '@carbon/icons/lib/caret--left/24';
import CaretRight24 from '@carbon/icons/lib/caret--right/24';
import settings from 'carbon-components/es/globals/js/settings';
import on from 'carbon-components/es/globals/js/misc/on';
import { forEach } from '../../globals/internal/collection-helpers';
import Handle from '../../globals/internal/handle';
import BXPagesSelect from './pages-select';
import BXPageSizesSelect from './page-sizes-select';
import styles from './pagination.scss';

const { prefix } = settings;

/**
 * Pagination UI.
 */
@customElement(`${prefix}-pagination`)
class BXPagination extends LitElement {
  /**
   * The handle for the listener of `${prefix}-pages-select-changed` event.
   */
  private _hChangePage: Handle | null = null;

  /**
   * The handle for the listener of `${prefix}-page-sizes-select-changed` event.
   */
  private _hChangePageSize: Handle | null = null;

  /**
   * @returns Page status text.
   */
  private _renderStatusText() {
    const { start, pageSize, total, formatStatusWithDeterminateTotal, formatStatusWithIndeterminateTotal } = this;
    const end = start + pageSize - 1;
    const format = typeof total === 'undefined' ? formatStatusWithIndeterminateTotal : formatStatusWithDeterminateTotal;
    // `start`/`end` properties starts with zero, whereas we want to show number starting with 1
    return format({ start: start + 1, end: end + 1, total });
  }

  /**
   * Handles user-initiated change in the row number the current page starts with.
   * @param start The new current row number, index that starts with zero.
   */
  private _handleUserInitiatedChangeStart(start: number) {
    this.start = start;
    this.dispatchEvent(
      new CustomEvent((this.constructor as typeof BXPagination).eventAfterChangeCurrent, {
        bubbles: true,
        composed: true,
        detail: {
          start,
        },
      })
    );
  }

  /**
   * Handles `click` event on the previous button.
   */
  private _handleClickPrevButton() {
    const { start: oldStart, pageSize } = this;
    this._handleUserInitiatedChangeStart(Math.max(oldStart - pageSize, 0));
  }

  /**
   * Handles `click` event on the next button.
   */
  private _handleClickNextButton() {
    const { start: oldStart, pageSize, total } = this;
    this._handleUserInitiatedChangeStart(Math.min(oldStart + pageSize, typeof total === 'undefined' ? Infinity : total - 1));
  }

  /**
   * Handles user-initiated change in current page.
   * @param event The event.
   */
  private _handleChangePage({ detail }: CustomEvent) {
    const { value } = detail;
    const { pageSize } = this;
    this._handleUserInitiatedChangeStart(value * pageSize);
  }

  /**
   * Handles user-initiated change in number of rows per page.
   * @param event The event.
   */
  private _handleChangePageSize({ detail }: CustomEvent) {
    this.pageSize = detail.value;
  }

  /**
   * The formatter, used with determinate the total pages. Should be changed upon the locale the UI is rendered with.
   */
  @property({ attribute: false })
  formatStatusWithDeterminateTotal = ({ start, end, total }) => `${start}–${end} of ${total} items`;

  /**
   * The formatter, used with indeterminate the total pages. Should be changed upon the locale the UI is rendered with.
   */
  @property({ attribute: false })
  formatStatusWithIndeterminateTotal = ({ start, end }) => `${start}–${end} items`;

  /**
   * `true` to explicitly state that user is at the last page. Corresponds to `at-last-page` attribute.
   */
  @property({ type: Boolean, attribute: 'at-last-page' })
  atLastPage!: boolean;

  /**
   * `true` if the pagination UI should be disabled. Corresponds to the attribute with the same name.
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * The assistive text for the button to go to next page. Corresponds to `next-button-text` attribute.
   */
  @property({ attribute: 'next-button-text' })
  nextButtonText = 'Next page';

  /**
   * Number of items per page. Corresponds to `page-size` attribute.
   */
  @property({ type: Number, attribute: 'page-size' })
  pageSize = 10;

  /**
   * The label text for the UI to select page size. Corresponds to `page-size-label-text` attribute.
   */
  @property({ attribute: 'page-size-label-text' })
  pageSizeLabelText!: string;

  /**
   * The assistive text for the button to go to previous page. Corresponds to `prev-button-text` attribute.
   */
  @property({ attribute: 'prev-button-text' })
  prevButtonText = 'Previous page';

  /**
   * The row number where current page start with, index that starts with zero. Corresponds to the attribute with the same name.
   */
  @property({ type: Number })
  start = 0;

  /**
   * The number of total items. Corresponds to the attribute with the same name.
   */
  @property({ type: Number })
  total!: number;

  connectedCallback() {
    super.connectedCallback();
    // Manually hooks the event listeners on the host element to make the event names configurable
    this._hChangePage = on(this, (this.constructor as typeof BXPagination).eventAfterChangePage, this
      ._handleChangePage as EventListener);
    this._hChangePageSize = on(this, (this.constructor as typeof BXPagination).eventAfterChangePageSize, this
      ._handleChangePageSize as EventListener);
  }

  disconnectedCallback() {
    if (this._hChangePageSize) {
      this._hChangePageSize = this._hChangePageSize.release();
    }
    if (this._hChangePage) {
      this._hChangePage = this._hChangePage.release();
    }
    super.disconnectedCallback();
  }

  updated(changedProperties) {
    const { pageSize } = this;
    if (changedProperties.has('pageSize')) {
      forEach(this.querySelectorAll((this.constructor as typeof BXPagination).selectorPageSizesSelect), elem => {
        (elem as BXPageSizesSelect).value = pageSize;
      });
    }
    if (changedProperties.has('pageSize') || changedProperties.has('start')) {
      const { start } = this;
      forEach(this.querySelectorAll((this.constructor as typeof BXPagination).selectorPagesSelect), elem => {
        (elem as BXPagesSelect).value = Math.floor(start / pageSize);
      });
    }
    if (changedProperties.has('pageSize') || changedProperties.has('total')) {
      const { total } = this;
      forEach(this.querySelectorAll((this.constructor as typeof BXPagination).selectorPagesSelect), elem => {
        (elem as BXPagesSelect).total = Math.ceil(total / pageSize);
      });
    }
  }

  render() {
    const {
      disabled,
      nextButtonText,
      prevButtonText,
      pageSize,
      start,
      total,
      _handleClickPrevButton: handleClickPrevButton,
      _handleClickNextButton: handleClickNextButton,
    } = this;
    const { atLastPage = start + pageSize >= total } = this;
    const currentPage = Math.floor(start / pageSize);
    const prevButtonDisabled = disabled || currentPage === 0;
    const nextButtonDisabled = disabled || atLastPage;
    const prevButtonClasses = classnames(`${prefix}--pagination__button`, `${prefix}--pagination__button--backward`, {
      [`${prefix}--pagination__button--no-index`]: prevButtonDisabled,
    });
    const nextButtonClasses = classnames(`${prefix}--pagination__button`, `${prefix}--pagination__button--forward`, {
      [`${prefix}--pagination__button--no-index`]: nextButtonDisabled,
    });
    return html`
      <div class="${prefix}--pagination__left">
        <slot name="page-sizes-select"></slot>
        <div class="${prefix}-ce--pagination__divider"></div>
        <span class="${prefix}--pagination__text">${this._renderStatusText()}</span>
      </div>
      <div class="${prefix}-ce--pagination__divider"></div>
      <div class="${prefix}--pagination__right">
        <slot></slot>
        <button
          ?disabled="${prevButtonDisabled}"
          class="${prevButtonClasses}"
          title="${prevButtonText}"
          @click="${handleClickPrevButton}"
        >
          ${CaretLeft24()}
        </button>
        <button
          ?disabled="${nextButtonDisabled}"
          class="${nextButtonClasses}"
          title="${nextButtonText}"
          @click="${handleClickNextButton}"
        >
          ${CaretRight24()}
        </button>
      </div>
    `;
  }

  /**
   * A selector that will return the select box for the current page.
   */
  static get selectorPagesSelect() {
    return `${prefix}-pages-select`;
  }

  /**
   * A selector that will return the select box for page sizes.
   */
  static get selectorPageSizesSelect() {
    return `${prefix}-page-sizes-select`;
  }

  /**
   * The name of the custom event fired after the current row number is changed.
   */
  static get eventAfterChangeCurrent() {
    return `${prefix}-pagination-changed-current`;
  }

  /**
   * The name of the custom event fired after the current page is changed from `<bx-pages-select>`.
   */
  static get eventAfterChangePage() {
    return `${prefix}-pages-select-changed`;
  }

  /**
   * The name of the custom event fired after the number of rows per page is changed from `<bx-page-sizes-select>`.
   */
  static get eventAfterChangePageSize() {
    return `${prefix}-page-sizes-select-changed`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default BXPagination;
