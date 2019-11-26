/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ifDefined } from 'lit-html/directives/if-defined';
import { html } from 'lit-element';
import { action } from '@storybook/addon-actions';
import { boolean, text } from '@storybook/addon-knobs';
import './tile';
import './clickable-tile';
import './radio-tile';
import './selectable-tile';
import './expandable-tile';

export const defaultStory = () => html`
  <bx-tile>Default tile</bx-tile>
`;

defaultStory.story = {
  name: 'Default',
  parameters: {
    docs: {
      storyDescription: `
Read-only tiles are used to display information to the user, such as features or services offered.
Read-only tiles are often seen on marketing pages to promote content.
These tiles can have internal calls-to-action (CTAs), such as a button or a link.
    `,
    },
  },
};

export const clickable = ({ parameters }) => {
  const { href } = parameters?.props?.['bx-clickable-tile'];
  return html`
    <bx-clickable-tile href="${href}">Clickable tile</bx-clickable-tile>
  `;
};

clickable.story = {
  parameters: {
    docs: {
      storyDescription: `
Clickable tiles can be used as navigational items, where the entire tile is a clickable state,
which redirects the user to a new page.
Clickable tiles cannot contain separate internal CTAs.
    `,
    },
    knobs: {
      'bx-clickable-tile': () => ({
        href: text('Href for clickable UI (href)', ''),
      }),
    },
  },
};

export const singleSelectable = ({ parameters }) => {
  const { checkmarkLabel, name, value, onInput } = parameters?.props?.['bx-radio-tile'];
  return html`
    <fieldset>
      <legend>Single-select tiles</legend>
      <bx-radio-tile
        checkmark-label="${ifDefined(!checkmarkLabel ? undefined : checkmarkLabel)}"
        name="${ifDefined(!name ? undefined : name)}"
        value="${ifDefined(!value ? undefined : value)}"
        @input="${onInput}"
      >
        Single-select Tile
      </bx-radio-tile>
      <bx-radio-tile
        checkmark-label="${ifDefined(!checkmarkLabel ? undefined : checkmarkLabel)}"
        name="${ifDefined(!name ? undefined : name)}"
        value="${ifDefined(!value ? undefined : value)}"
        @input="${onInput}"
      >
        Single-select Tile
      </bx-radio-tile>
      <bx-radio-tile
        checkmark-label="${ifDefined(!checkmarkLabel ? undefined : checkmarkLabel)}"
        name="${ifDefined(!name ? undefined : name)}"
        value="${ifDefined(!value ? undefined : value)}"
        @input="${onInput}"
      >
        Single-select Tile
      </bx-radio-tile>
    </fieldset>
  `;
};

singleSelectable.story = {
  name: 'Single-selectable',
  parameters: {
    docs: {
      storyDescription: `
Selectable tiles work like a radio button, where the entire tile is a click target.
Selectable tiles may contain internal CTAs (like links to docs) if the internal CTA is given its own click target.
Selectable tiles work well for presenting options to a user in a structured manner, such as a set of pricing plans.
    `,
    },
    knobs: {
      'bx-radio-tile': () => ({
        checkmarkLabel: text('Label text for the checkmark icon (checkmark-label)', ''),
        name: text('Name (name)', 'selectable-tile'),
        value: text('Value (value)', ''),
        onInput: action('input'),
      }),
    },
  },
};

export const multiSelectable = ({ parameters }) => {
  const { checkmarkLabel, name, selected, value, onInput } = parameters?.props?.['bx-selectable-tile'];
  return html`
    <bx-selectable-tile
      checkmark-label="${ifDefined(!checkmarkLabel ? undefined : checkmarkLabel)}"
      name="${ifDefined(!name ? undefined : name)}"
      ?selected="${selected}"
      value="${ifDefined(!value ? undefined : value)}"
      @input="${onInput}"
    >
      Multi-select Tile
    </bx-selectable-tile>
  `;
};

multiSelectable.story = {
  name: 'Multi-selectable',
  parameters: {
    knobs: {
      'bx-selectable-tile': () => ({
        ...singleSelectable.story.parameters.knobs['bx-radio-tile'](),
        selected: boolean('Selected (selected)', false),
      }),
    },
  },
};

export const expandable = ({ parameters }) => {
  const { expanded, disableChange } = parameters?.props?.['bx-expandable-tile'];
  const beforeChangedAction = action('bx-expandable-tile-beingchanged');
  const handleBeforeChanged = (event: CustomEvent) => {
    beforeChangedAction(event);
    if (disableChange) {
      event.preventDefault();
    }
  };
  return html`
    <bx-expandable-tile
      ?expanded="${expanded}"
      @bx-expandable-tile-beingchanged=${handleBeforeChanged}
      @bx-expandable-tile-changed=${action('bx-expandable-tile-changed')}
    >
      <bx-tile-above-the-fold-content style="height: 200px">
        Above the fold content here
      </bx-tile-above-the-fold-content>
      <bx-tile-below-the-fold-content style="height: 300px">
        Below the fold content here
      </bx-tile-below-the-fold-content>
    </bx-expandable-tile>
  `;
};

expandable.story = {
  parameters: {
    docs: {
      storyDescription: `
Expandable tiles are helpful for hiding/showing larger amounts of content to a user.
They can only be stacked in a single column, and cannot live in a row or horizontal grid.
When expanded, tiles push content down the page.
Expandable tiles may contain internal CTAs (like links to docs) if the internal CTA is given its own click target.
    `,
    },
    knobs: {
      'bx-expandable-tile': () => ({
        expanded: boolean('Expanded (expanded)', false),
        disableChange: boolean(
          'Disable user-initiated change in expanded state ' +
            '(Call event.preventDefault() in bx-expandable-tile-beingchanged event)',
          false
        ),
      }),
    },
  },
};

export default {
  title: 'Tile',
  decorators: [
    story =>
      html`
        <div>${story()}</div>
      `,
  ],
};
