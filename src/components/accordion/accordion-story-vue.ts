import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';
import createVueBindingsFromProps from '../../../.storybook/vue/create-vue-bindings-from-props';
import './accordion';
import './accordion-item';

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
  .add('Default', () => ({
    template: `
      <bx-accordion
        @bx-accordion-item-beingtoggled="handleBeforeToggle"
        @bx-accordion-item-toggled="handleToggle"
      >
        <bx-accordion-item :open="open">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
            aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <span slot="title">{{ title }}</span>
        </bx-accordion-item>
        <bx-accordion-item :open="open">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
            aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <span slot="title">{{ title }}</span>
        </bx-accordion-item>
        <bx-accordion-item :open="open">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
            aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <span slot="title">{{ title }}</span>
        </bx-accordion-item>
      </bx-accordion>
    `,
    ...createVueBindingsFromProps(
      (({ disableToggle, ...rest }) => {
        const beforeSelectedAction = action('bx-accordion-item-beingtoggled');
        return {
          ...rest,
          handleBeforeToggle: (event: CustomEvent) => {
            beforeSelectedAction(event);
            if (disableToggle) {
              event.preventDefault();
            }
          },
          handleToggle: action('bx-accordion-item-toggled'),
        };
      })(createProps())
    ),
  }));
