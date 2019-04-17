import { html } from 'lit-html';
import { storiesOf } from '@storybook/polymer';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, select, text } from '@storybook/addon-knobs';
import './button';

const kinds = {
  'Primary button (primary)': 'primary',
  'Secondary button (secondary)': 'secondary',
  'Danger button (danger)': 'danger',
  'Ghost button (ghost)': 'ghost',
};

const createProps = () => ({
  kind: select('Button kind (kind)', kinds, 'primary'),
  disabled: boolean('Disabled (disabled)', false),
  small: boolean('Small (small)', false),
  href: text('Link href (href)', ''),
  onClick: action('onClick'),
});

storiesOf('Button', module)
  .addDecorator(withKnobs)
  .add('Default', () => {
    const { kind, disabled, small, href } = createProps();
    return !href
      ? html`
          <bx-btn kind=${kind} ?disabled=${disabled} ?small=${small}>Button</bx-btn>
        `
      : html`
          <bx-btn kind=${kind} ?disabled=${disabled} ?small=${small} href=${href}>Button</bx-btn>
        `;
  });
