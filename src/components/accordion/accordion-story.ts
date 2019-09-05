import { html } from 'lit-element';
import { storiesOf } from '@storybook/polymer';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';
import './accordion';
import './accordion-item';

const createProps = () => ({
  open: boolean('Open the section (open)', false),
  titleText: text('The title (title-text)', 'Section title'),
  disableToggle: boolean(
    'Disable user-initiated toggle action (Call event.preventDefault() in bx-accordion-beingtoggled event)',
    false
  ),
});

storiesOf('Accordion', module)
  .addDecorator(withKnobs)
  .add('Default', () => {
    const { open, titleText, disableToggle } = createProps();
    const beforeToggleAction = action('bx-accordion-item-beingtoggled');
    const handleBeforeToggle = (event: CustomEvent) => {
      beforeToggleAction(event);
      if (disableToggle) {
        event.preventDefault();
      }
    };
    return html`
      <bx-accordion
        @bx-accordion-item-beingtoggled="${handleBeforeToggle}"
        @bx-accordion-item-toggled="${action('bx-accordion-item-toggled')}"
      >
        <bx-accordion-item ?open="${open}" title-text=${titleText}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
            aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </bx-accordion-item>
        <bx-accordion-item ?open="${open}" title-text=${titleText}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
            aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </bx-accordion-item>
        <bx-accordion-item ?open="${open}">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
            aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <span slot="title">${titleText}</span>
        </bx-accordion-item>
      </bx-accordion>
    `;
  });
