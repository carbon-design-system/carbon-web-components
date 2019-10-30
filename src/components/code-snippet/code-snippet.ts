/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import classnames from 'classnames';
import { TemplateResult } from 'lit-html';
import { html, property, query, customElement, LitElement } from 'lit-element';
import ChevronDown16 from '@carbon/icons/lib/chevron--down/16';
import settings from 'carbon-components/es/globals/js/settings';
import {
  _createHandleFeedbackTooltip as createHandleCopyButtonFeedbackTooltip,
  _renderButton as renderCopyButton,
} from '../copy-button/copy-button';
import styles from './code-snippet.scss';

const { prefix } = settings;

/**
 * Code snippet types.
 */
export enum CODE_SNIPPET_TYPE {
  /**
   * Single variant.
   */
  SINGLE = 'single',

  /**
   * Inline variant.
   */
  INLINE = 'inline',

  /**
   * Multi-line variant.
   */
  MULTI = 'multi',
}

/**
 * @param values The values to render.
 * @param values.children The child nodes.
 * @param values.handleClick The handler for the `click` event on the button.
 * @returns The template result for the expando.
 */
const renderExpando = ({ children, handleClick }: { children: string | TemplateResult; handleClick: EventListener }) => html`
  <button
    type="button"
    class="${prefix}--btn ${prefix}--btn--ghost ${prefix}--btn--sm ${prefix}--snippet-btn--expand"
    @click="${handleClick}"
  >
    <span id="button-text" class="${prefix}--snippet-btn--text">
      ${children}
    </span>
    ${ChevronDown16({
      'aria-labeledby': 'button-text',
      class: `${prefix}--icon-chevron--down ${prefix}--snippet__icon`,
      role: 'img',
    })}
  </button>
`;

/**
 * @param values The values to render.
 * @param values.assistiveText The assistive text to announce that the node is for code snippet.
 * @param [values.expanded] `true` to show the expanded state (for multi-line variant).
 * @param values.children The child nodes.
 * @returns The template result for the code snippet.
 */
const renderCode = ({
  assistiveText,
  expanded,
  children,
}: {
  assistiveText: string;
  expanded?: boolean;
  children: string | TemplateResult;
}) => {
  const classes = classnames(`${prefix}--snippet-container`, {
    [`${prefix}-ce--snippet-container--expanded`]: expanded,
  });
  // Ensures no extra whitespace text node
  // prettier-ignore
  return html`
    <div role="textbox" tabindex="0" class="${classes}" aria-label="${assistiveText}"><code><pre>${children}</pre></code></div>
  `;
};

/**
 * Basic code snippet.
 */
@customElement(`${prefix}-code-snippet`)
class BXCodeSnippet extends LitElement {
  /**
   * `true` to expand multi-line variant of code snippet.
   */
  private _expanded = false;

  /**
   * `true` to show the feedback tooltip.
   */
  private _showCopyButtonFeedback = false;

  /**
   * `true` to show the expando.
   */
  private _showExpando = false;

  /**
   * Handles `click` event on the copy button.
   */
  private _handleClickCopyButton() {
    const { ownerDocument: doc } = this;
    const selection = doc!.defaultView!.getSelection();
    selection!.removeAllRanges();
    const code = doc!.createElement('code');
    code.className = `${prefix}--visually-hidden`;
    const pre = doc!.createElement('pre');
    pre.textContent = this.textContent;
    code.appendChild(pre);
    // Using `<code>` in shadow DOM seems to lose the LFs in some browsers
    doc!.body.appendChild(code);
    const range = doc!.createRange();
    range.selectNodeContents(code);
    selection!.addRange(range);
    doc!.execCommand('copy');
    this._handleCopyButtonFeedbackTooltip(this.copyButtonFeedbackTimeout);
    doc!.body.removeChild(code);
    selection!.removeAllRanges();
  }

  /**
   * Handles showing/hiding the feedback tooltip.
   */
  private _handleCopyButtonFeedbackTooltip = createHandleCopyButtonFeedbackTooltip(
    ({ showFeedback = false }: { showFeedback?: boolean }) => {
      this._showCopyButtonFeedback = showFeedback;
      this.requestUpdate();
    }
  );

  /**
   * Handles `click` event on the expando.
   */
  private _handleClickExpando() {
    this._expanded = !this._expanded;
    this.requestUpdate();
  }

  /**
   * Handles change in slot content to determine if the content
   */
  private _handleSlotChange() {
    const { type, _preNode: preNode } = this;
    if (type === CODE_SNIPPET_TYPE.MULTI) {
      if (preNode.getBoundingClientRect().height > 255) {
        this._showExpando = true;
        this.requestUpdate();
      }
    }
  }

  /**
   * The `<pre>` element in the shadow DOM.
   */
  @query('pre')
  private _preNode!: HTMLPreElement;

  /**
   * An assistive text for screen reader to advice a DOM node is for code snippet. Corresponds to `code-assistive-text` attribute.
   */
  @property({ attribute: 'code-assistive-text' })
  codeAssistiveText = 'code-snippet';

  /**
   * The context content for the collapse button. Corresponds to `collapse-button-text` attribute.
   */
  @property({ attribute: 'collapse-button-text' })
  collapseButtonText = 'Show less';

  /**
   * An assistive text for screen reader to announce, telling that the button copies the content to the clipboard.
   * Corresponds to `copy-button-assistive-text` attribute.
   */
  @property({ attribute: 'copy-button-assistive-text' })
  copyButtonAssistiveText = 'Copy to clipboard';

  /**
   * The feedback text for the copy button. Corresponds to `copy-button-feedback-text` attribute.
   */
  @property({ attribute: 'copy-button-feedback-text' })
  copyButtonFeedbackText = 'Copied!';

  /**
   * The number in milliseconds to determine how long the tooltip for the copy button should remain.
   * Corresponds to `copy-button-feedback-timeout` attribute.
   */
  @property({ type: Number, attribute: 'copy-button-feedback-timeout' })
  copyButtonFeedbackTimeout = 2000;

  /**
   * The context content for the expand button. Corresponds to `expand-button-text` attribute.
   */
  @property({ attribute: 'expand-button-text' })
  expandButtonText = 'Show more';

  /**
   * The type of code snippet. Corresponds to the attribute with the same name.
   */
  @property({ reflect: true })
  type = CODE_SNIPPET_TYPE.SINGLE;

  render() {
    const {
      codeAssistiveText,
      collapseButtonText,
      copyButtonAssistiveText,
      copyButtonFeedbackText,
      expandButtonText,
      type,
      _expanded: expanded,
      _showCopyButtonFeedback: showCopyButtonFeedback,
      _showExpando: showExpando,
      _handleClickCopyButton: handleClickCopyButton,
      _handleClickExpando: handleClickExpando,
      _handleSlotChange: handleSlotChange,
    } = this;
    // Ensures no extra whitespace text node
    // prettier-ignore
    return html`
      ${type === CODE_SNIPPET_TYPE.INLINE
        ? undefined
        : renderCode({
          assistiveText: codeAssistiveText,
          expanded,
          children: html`<slot @slotchange="${handleSlotChange}"></slot>`,
        })}
      ${renderCopyButton({
        assistiveText: copyButtonAssistiveText,
        feedbackText: copyButtonFeedbackText,
        showFeedback: showCopyButtonFeedback,
        handleClickButton: handleClickCopyButton,
        className: type !== CODE_SNIPPET_TYPE.INLINE
          ? `${prefix}--snippet-button`
          : `${prefix}--snippet ${prefix}--snippet--inline`,
        children: type !== CODE_SNIPPET_TYPE.INLINE
          ? undefined
          : html`<code aria-label="${codeAssistiveText}"><slot></slot></code>`
      })}
      ${type !== CODE_SNIPPET_TYPE.MULTI || !showExpando
        ? undefined
        : renderExpando({
            children: expanded ? collapseButtonText : expandButtonText,
            handleClick: handleClickExpando,
          })}
      ${type !== CODE_SNIPPET_TYPE.SINGLE
        ? undefined
        : html`
            <div class="${prefix}-ce--snippet__overflow-gradient"></div>
          `}
    `;
  }

  static styles = styles;
}

export default BXCodeSnippet;
