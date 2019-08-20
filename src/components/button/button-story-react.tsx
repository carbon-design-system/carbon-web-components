import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, select, text } from '@storybook/addon-knobs';
// Below path will be there when an application installs `carbon-custom-elements` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the genrated file.
// @ts-ignore
import BXBtn, { BUTTON_KIND } from 'carbon-custom-elements/es/components-react/button/button';

const kinds = {
  [`Primary button (${BUTTON_KIND.PRIMARY})`]: BUTTON_KIND.PRIMARY,
  [`Secondary button (${BUTTON_KIND.SECONDARY})`]: BUTTON_KIND.SECONDARY,
  [`Danger button (${BUTTON_KIND.DANGER})`]: BUTTON_KIND.DANGER,
  [`Ghost button (${BUTTON_KIND.GHOST})`]: BUTTON_KIND.GHOST,
};

const createProps = () => ({
  kind: select('Button kind (kind)', kinds, BUTTON_KIND.PRIMARY),
  disabled: boolean('Disabled (disabled)', false),
  small: boolean('Small (small)', false),
  href: text('Link href (href)', ''),
  onClick: action('onClick'),
});

storiesOf('Button', module)
  .addDecorator(withKnobs)
  .add('Default', () => {
    const { kind, disabled, small, href } = createProps();
    return (
      <BXBtn kind={kind} disabled={disabled} small={small} href={href}>
        Button
      </BXBtn>
    );
  });
