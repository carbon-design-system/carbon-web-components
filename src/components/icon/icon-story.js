import { html } from 'lit-html';
import { storiesOf } from '@storybook/polymer';

import Add16 from '@carbon/icons/lib/add/16';
import Add20 from '@carbon/icons/lib/add/20';
import Add24 from '@carbon/icons/lib/add/24';
import Add32 from '@carbon/icons/lib/add/32';

import { icon } from './icon';

storiesOf('Icon', module).add(
  'Default',
  () => html`
    ${icon(Add16, { class: 'test-class' })} ${icon(Add20, { class: 'test-class' })} ${icon(Add24, { class: 'test-class' })}
    ${icon(Add32, { class: 'test-class' })}
  `
);
