/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import { action } from '@storybook/addon-actions';
import { boolean, select } from '@storybook/addon-knobs';
// Below path will be there when an application installs `carbon-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
// @ts-ignore
import Add16 from 'carbon-web-components/es/icons/add/16';
import ifNonNull from '../../globals/directives/if-non-null';
import { BUTTON_KIND, BUTTON_SIZE } from './button';
import './button-skeleton';
import textNullable from '../../../.storybook/knob-text-nullable';
import storyDocs from './button-story.mdx';

const kinds = {
  [`Primary button (${BUTTON_KIND.PRIMARY})`]: BUTTON_KIND.PRIMARY,
  [`Secondary button (${BUTTON_KIND.SECONDARY})`]: BUTTON_KIND.SECONDARY,
  [`Danger button (${BUTTON_KIND.DANGER})`]: BUTTON_KIND.DANGER,
  [`Ghost button (${BUTTON_KIND.GHOST})`]: BUTTON_KIND.GHOST,
};

const sizes = {
  'Regular size': null,
  [`Small size (${BUTTON_SIZE.SMALL})`]: BUTTON_SIZE.SMALL,
  [`Size for form field (${BUTTON_SIZE.FIELD})`]: BUTTON_SIZE.FIELD,
};

export const defaultStory = ({ parameters }) => {
  const { autofocus, disabled, download, href, hreflang, kind, ping, rel, size, target, type, onClick } =
    parameters?.props?.['bx-btn'] ?? {};
  return html`
    <bx-btn
      ?autofocus="${autofocus}"
      ?disabled="${disabled}"
      download="${ifNonNull(download)}"
      href="${ifNonNull(href)}"
      hreflang="${ifNonNull(hreflang)}"
      kind="${ifNonNull(kind)}"
      ping="${ifNonNull(ping)}"
      rel="${ifNonNull(rel)}"
      size="${ifNonNull(size)}"
      target="${ifNonNull(target)}"
      type="${ifNonNull(type)}"
      @click=${onClick}
    >
      Button
    </bx-btn>
  `;
};

defaultStory.story = {
  name: 'Default',
};

export const icon = ({ parameters }) => {
  const { kind, disabled, size, href, onClick } = parameters?.props?.['bx-btn'] ?? {};
  return html`
    <bx-btn
      kind=${ifNonNull(kind)}
      ?disabled=${disabled}
      size=${ifNonNull(size)}
      href=${ifNonNull(href || undefined)}
      @click=${onClick}
    >
      ${Add16({ slot: 'icon' })}
    </bx-btn>
  `;
};

export const textAndIcon = ({ parameters }) => {
  const { kind, disabled, size, href, onClick } = parameters?.props?.['bx-btn'] ?? {};
  return html`
    <bx-btn
      kind=${ifNonNull(kind)}
      ?disabled=${disabled}
      size=${ifNonNull(size)}
      href=${ifNonNull(href || undefined)}
      @click=${onClick}
    >
      Button ${Add16({ slot: 'icon' })}
    </bx-btn>
  `;
};

textAndIcon.story = {
  name: 'Text and icon',
};

export const skeleton = ({ parameters }) => {
  const { disabled, size, href, onClick } = parameters?.props?.['bx-btn-skeleton'];
  return html`
    <bx-btn-skeleton ?disabled=${disabled} size=${ifNonNull(size)} href=${ifNonNull(href || undefined)} @click=${onClick}>
    </bx-btn-skeleton>
  `;
};

skeleton.story = {
  parameters: {
    knobs: {
      'bx-btn-skeleton': () => ({
        kind: select('Button kind (kind)', kinds, BUTTON_KIND.PRIMARY),
        disabled: boolean('Disabled (disabled)', false),
        size: select('Button size (size)', sizes, null),
        href: textNullable('Link href (href)', ''),
        onClick: action('click'),
      }),
    },
  },
};

export default {
  title: 'Components/Button',
  parameters: {
    docs: {
      page: storyDocs,
    },
    knobs: {
      'bx-btn': () => ({
        kind: select('Button kind (kind)', kinds, BUTTON_KIND.PRIMARY),
        disabled: boolean('Disabled (disabled)', false),
        size: select('Button size (size)', sizes, null),
        href: textNullable('Link href (href)', ''),
        onClick: action('click'),
      }),
    },
  },
};
