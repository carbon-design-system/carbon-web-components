/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { action } from '@storybook/addon-actions';
import createVueBindingsFromProps from '../../../.storybook/vue/create-vue-bindings-from-props';
import {
  defaultStory as baseDefaultStory,
  clickable as baseClickable,
  singleSelectable as baseSingleSelectable,
  multiSelectable as baseMultiSelectable,
  expandable as basEexpandable,
} from './tile-story';

export const defaultStory = () => ({
  template: `
    <bx-tile>Default tile</bx-tile>
  `,
});

defaultStory.story = baseDefaultStory.story;

export const clickable = ({ parameters }) => ({
  template: `
    <bx-clickable-tile :href="href">Clickable tile</bx-clickable-tile>
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
        :name="name"
        :value="value"
        @input="onInput"
      >
        Single-select Tile
      </bx-radio-tile>
      <bx-radio-tile
        :checkmark-label="checkmarkLabel"
        :name="name"
        :value="value"
        @input="onInput"
      >
        Single-select Tile
      </bx-radio-tile>
      <bx-radio-tile
        :checkmark-label="checkmarkLabel"
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
  const props = (({ disableChange, ...rest }) => {
    const beforeChangedAction = action('bx-expandable-tile-beingchanged');
    const onBeforeChange = (event: CustomEvent) => {
      beforeChangedAction(event);
      if (disableChange) {
        event.preventDefault();
      }
    };
    return {
      ...rest,
      onBeforeChange,
      onChange: action('bx-expandable-tile-changed'),
    };
  })(parameters?.props?.['bx-expandable-tile']);
  return {
    template: `
      <bx-expandable-tile
        :expanded="expanded"
        @bx-expandable-tile-beingchanged="onBeforeChange"
        @bx-expandable-tile-changed="onChange"
      >
        <bx-tile-above-the-fold-content style="height: 200px">
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
  title: 'Tile',
  decorators: [
    () => ({
      template: `<div><story /></div>`,
    }),
  ],
};
