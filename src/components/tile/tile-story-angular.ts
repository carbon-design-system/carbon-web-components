/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { action } from '@storybook/addon-actions';
import { moduleMetadata } from '@storybook/angular';
import baseStory, {
  defaultStory as baseDefaultStory,
  clickable as baseClickable,
  singleSelectable as baseSingleSelectable,
  multiSelectable as baseMultiSelectable,
  expandable as baseExpandable,
} from './tile-story';

export const defaultStory = () => ({
  template: `
    <bx-tile>Default tile</bx-tile>
  `,
});

defaultStory.story = baseDefaultStory.story;

export const clickable = ({ parameters }) => ({
  template: `
    <bx-clickable-tile [href]="href">Clickable tile</bx-clickable-tile>
  `,
  props: parameters?.props?.['bx-clickable-tile'],
});

clickable.story = baseClickable.story;

export const singleSelectable = ({ parameters }) => ({
  template: `
    <fieldset>
      <legend>Single-select tiles</legend>
      <bx-radio-tile
        [checkmarkLabel]="checkmarkLabel"
        [name]="name"
        [value]="value"
        (input)="onInput($event)"
      >
        Single-select Tile
      </bx-radio-tile>
      <bx-radio-tile
        [checkmarkLabel]="checkmarkLabel"
        [name]="name"
        [value]="value"
        (input)="onInput($event)"
      >
        Single-select Tile
      </bx-radio-tile>
      <bx-radio-tile
        [checkmarkLabel]="checkmarkLabel"
        [name]="name"
        [value]="value"
        (input)="onInput($event)"
      >
        Single-select Tile
      </bx-radio-tile>
    </fieldset>
  `,
  props: parameters?.props?.['bx-radio-tile'],
});

singleSelectable.story = baseSingleSelectable.story;

export const multiSelectable = ({ parameters }) => ({
  template: `
    <bx-selectable-tile
      [checkmarkLabel]="checkmarkLabel"
      [name]="name"
      [selected]="selected"
      [value]="value"
      (input)="onInput($event)"
    >
      Multi-select Tile
    </bx-selectable-tile>
  `,
  props: parameters?.props?.['bx-selectable-tile'],
});

multiSelectable.story = baseMultiSelectable.story;

export const expandable = ({ parameters }) => ({
  template: `
    <bx-expandable-tile
      [expanded]="expanded"
      (bx-expandable-tile-beingchanged)="onBeforeChange($event)"
      (bx-expandable-tile-changed)="onChange($event)"
    >
      <bx-tile-above-the-fold-content style="height: 200px">
        Above the fold content here
      </bx-tile-above-the-fold-content>
      <bx-tile-below-the-fold-content style="height: 300px">
        Below the fold content here
      </bx-tile-below-the-fold-content>
    </bx-expandable-tile>
  `,
  props: (({ disableChange, ...rest }) => {
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
  })(parameters?.props?.['bx-expandable-tile']),
});

expandable.story = baseExpandable.story;

export default Object.assign(baseStory, {
  decorators: [
    moduleMetadata({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }),
  ],
});
