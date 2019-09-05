import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';
// Below path will be there when an application installs `carbon-custom-elements` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the genrated file.
// @ts-ignore
import BXAccordion from 'carbon-custom-elements/es/components-react/accordion/accordion';
// @ts-ignore
import BXAccordionItem from 'carbon-custom-elements/es/components-react/accordion/accordion-item';

const createProps = () => ({
  open: boolean('Open the section (open)', false),
  title: text('The title (title)', 'Section title'),
  disableToggle: boolean(
    'Disable user-initiated toggle action (Call event.preventDefault() in bx-accordion-beingtoggled event)',
    false
  ),
});

storiesOf('Accordion', module)
  .addDecorator(withKnobs)
  .add('Default', () => {
    const { open, title, disableToggle } = createProps();
    const beforeToggleAction = action('bx-accordion-item-beingtoggled');
    const handleBeforeToggle = (event: CustomEvent) => {
      beforeToggleAction(event);
      if (disableToggle) {
        event.preventDefault();
      }
    };
    return (
      <BXAccordion>
        <BXAccordionItem open={open} onBeforeToggle={handleBeforeToggle} onAfterToggle={action('onAfterToggle')}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
            aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <span slot="title">{title}</span>
        </BXAccordionItem>
        <BXAccordionItem open={open} onBeforeToggle={handleBeforeToggle} onAfterToggle={action('onAfterToggle')}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
            aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <span slot="title">{title}</span>
        </BXAccordionItem>
        <BXAccordionItem open={open} onBeforeToggle={handleBeforeToggle} onAfterToggle={action('onAfterToggle')}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
            aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <span slot="title">{title}</span>
        </BXAccordionItem>
      </BXAccordion>
    );
  });
