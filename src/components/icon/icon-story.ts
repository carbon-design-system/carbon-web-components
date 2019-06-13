import { html } from 'lit-html';
import { storiesOf } from '@storybook/polymer';

import Add16 from '@carbon/icons/lib/add/16';
import Add20 from '@carbon/icons/lib/add/20';
import Add24 from '@carbon/icons/lib/add/24';
import Add32 from '@carbon/icons/lib/add/32';

import icon from './icon';

storiesOf('Icon', module)
  .add(
    'Default',
    () => html`
      ${icon(Add16)} ${icon(Add20)} ${icon(Add24)} ${icon(Add32)}
    `
  )
  .add(
    'With custom class',
    () => html`
      <style>
        .test-class {
          fill: #0062ff;
        }
      </style>
      ${icon(Add16, { class: 'test-class' })} ${icon(Add20, { class: 'test-class' })} ${icon(Add24, { class: 'test-class' })}
      ${icon(Add32, { class: 'test-class' })}
    `
  )
  .add(
    'With aria-label',
    () => html`
      ${icon(Add16, { 'aria-label': 'add' })} ${icon(Add20, { 'aria-label': 'add' })} ${icon(Add24, { 'aria-label': 'add' })}
      ${icon(Add32, { 'aria-label': 'add' })}
    `
  )
  .add(
    'With title',
    () => html`
      ${icon(Add16, { title: 'add' })} ${icon(Add20, { title: 'add' })} ${icon(Add24, { title: 'add' })}
      ${icon(Add32, { title: 'add' })}
    `
  );
