import { html, svg } from 'lit-html';
import { storiesOf } from '@storybook/polymer';
import { withKnobs } from '@storybook/addon-knobs';

import Add16 from '@carbon/icons/es/add/16';
import Add20 from '@carbon/icons/es/add/20';
import Add24 from '@carbon/icons/es/add/24';
import Add32 from '@carbon/icons/es/add/32';

storiesOf('Icon', module)
  .addDecorator(withKnobs)
  .add(
    'Default',
    () => html`
      ${Add16()} ${Add20()} ${Add24()} ${Add32()}
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
      ${Add16({ class: 'test-class' })} ${Add20({ class: 'test-class' })} ${Add24({ class: 'test-class' })}
      ${Add32({ class: 'test-class' })}
    `
  )
  .add(
    'With aria-label',
    () => html`
      ${Add16({ 'aria-label': 'add' })} ${Add20({ 'aria-label': 'add' })} ${Add24({ 'aria-label': 'add' })}
      ${Add32({ 'aria-label': 'add' })}
    `
  )
  .add(
    'With title',
    () => html`
      ${Add16({
        'aria-describedby': 'id-title-1',
        children: svg`<title id="id-title-1">add</title>`,
      })}
      ${Add20({
        'aria-describedby': 'id-title-2',
        children: svg`<title id="id-title-2">add</title>`,
      })}
      ${Add24({
        'aria-describedby': 'id-title-3',
        children: svg`<title id="id-title-3">add</title>`,
      })}
      ${Add32({
        'aria-describedby': 'id-title-4',
        children: svg`<title id="id-title-4">add</title>`,
      })}
    `
  );
