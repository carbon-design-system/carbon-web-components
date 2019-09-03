import { html } from 'lit-html';
import settings from 'carbon-components/es/globals/js/settings';
import LOADING_TYPE from './types';

const { prefix } = settings;

/**
 * @param Object options The options.
 * @param [options.assistiveText] The assistive text for the spinner icon.
 * @param [options.type] The spinner type.
 * @returns The spinner icon.
 */
export default ({ assistiveText, type }: { assistiveText?: string; type?: string }) => html`
  <svg class="${prefix}--loading__svg" viewBox="-75 -75 150 150">
    ${!assistiveText
      ? undefined
      : html`
          <title>${assistiveText}</title>
        `}
    <circle ?hidden="${type !== LOADING_TYPE.SMALL}" class="${prefix}--loading__background" cx="0" cy="0" r="37.5" />
    <circle class="${prefix}--loading__stroke" cx="0" cy="0" r="37.5" />
  </svg>
`;
