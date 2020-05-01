/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import createVueBindingsFromProps from '../../../.storybook/vue/create-vue-bindings-from-props';
import {
  defaultStory as baseDefaultStory,
  clickable as baseClickable,
  singleSelectable as baseSingleSelectable,
  multiSelectable as baseMultiSelectable,
  expandable as basEexpandable,
} from './tile-story';

export const defaultStory = ({ parameters }) => ({
  template: `
    <bx-tile :color-scheme="colorScheme">Default tile</bx-tile>
  `,
  ...createVueBindingsFromProps(parameters?.props?.['bx-tile']),
});

defaultStory.story = baseDefaultStory.story;

export const clickable = ({ parameters }) => ({
  template: `
    <bx-clickable-tile :color-scheme="colorScheme" :href="href">Clickable tile</bx-clickable-tile>
  `,
  ...createVueBindingsFromProps(parameters?.props?.['bx-clickable-tile']),
});

clickable.story = baseClickable.story;

export const singleSelectable = ({ parameters }) => ({
  template: `
    <fieldset>
      <legend>Single-select tiles</legend>
      <bx-radio-tile
        :checkmark-label="checkmarkLabel"
        :color-scheme="colorScheme"
        :name="name"
        :value="value"
        @input="onInput"
      >
        Single-select Tile
      </bx-radio-tile>
      <bx-radio-tile
        :checkmark-label="checkmarkLabel"
        :color-scheme="colorScheme"
        :name="name"
        :value="value"
        @input="onInput"
      >
        Single-select Tile
      </bx-radio-tile>
      <bx-radio-tile
        :checkmark-label="checkmarkLabel"
        :color-scheme="colorScheme"
        :name="name"
        :value="value"
        @input="onInput"
      >
        Single-select Tile
      </bx-radio-tile>
    </fieldset>
  `,
  ...createVueBindingsFromProps(parameters?.props?.['bx-radio-tile']),
});

singleSelectable.story = baseSingleSelectable.story;

export const multiSelectable = ({ parameters }) => ({
  template: `
    <bx-selectable-tile
      :checkmark-label="checkmarkLabel"
      :color-scheme="colorScheme"
      :name="name"
      :selected="selected"
      :value="value"
      @input="onInput"
    >
      Multi-select Tile
    </bx-selectable-tile>
  `,
  ...createVueBindingsFromProps(parameters?.props?.['bx-selectable-tile']),
});

multiSelectable.story = baseMultiSelectable.story;

export const expandable = ({ parameters }) => {
  const props = (({ disableChange, onBeforeChange, onChange, ...rest }) => {
    const handleBeforeChange = (event: CustomEvent) => {
      onBeforeChange(event);
      if (disableChange) {
        event.preventDefault();
      }
    };
    return {
      ...rest,
      handleBeforeChange,
      handleAfterChange: onChange,
    };
  })(parameters?.props?.['bx-expandable-tile']);
  return {
    template: `
      <bx-expandable-tile
        :color-scheme="colorScheme"
        :expanded="expanded"
        @bx-expandable-tile-beingchanged="handleBeforeChange"
        @bx-expandable-tile-changed="handleAfterChange"
      >
        <bx-tile-above-the-fold-content slot="above-the-fold-content" style="height: 200px">
          Above the fold content here
        </bx-tile-above-the-fold-content>
        <bx-tile-below-the-fold-content style="height: 300px">
          Below the fold content here
        </bx-tile-below-the-fold-content>
      </bx-expandable-tile>
    `,
    ...createVueBindingsFromProps(props),
  };
};

expandable.story = basEexpandable.story;

export default {
  title: 'Components/Tile',
  decorators: [
    () => ({
      template: `<div><story /></div>`,
    }),
  ],
};
