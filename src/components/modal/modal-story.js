import { html } from 'lit-html';
import { storiesOf } from '@storybook/polymer';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import './modal';
import './modal-header';
import './modal-close-button';
import './modal-heading';
import './modal-label';
import './modal-body';
import './modal-footer';

const createProps = () => ({
  open: boolean('Open (open)', true),
  danger: boolean('Danger mode (danger)', false),
  disableClose: boolean('Disable user-initiated close action (Call event.preventDefault() in bx-modal-beingclosed event)', false),
});

storiesOf('Modal', module)
  .addDecorator(withKnobs)
  .add('Default', () => {
    const { danger, open, disableClose } = createProps();
    const beforeSelectedAction = action('bx-modal-beingclosed');
    const handleBeforeClose = evt => {
      beforeSelectedAction(evt);
      if (disableClose) {
        evt.preventDefault();
      }
    };
    return html`
      <bx-modal
        ?danger="${danger}"
        ?open="${open}"
        @bx-modal-beingclosed=${handleBeforeClose}
        @bx-modal-closed=${action('bx-modal-closed')}
      >
        <bx-modal-header>
          <bx-modal-close-button></bx-modal-close-button>
          <bx-modal-label>Label (Optional)</bx-modal-label>
          <bx-modal-heading>Modal Title</bx-modal-heading>
        </bx-modal-header>
        <bx-modal-body><p>Modal text description</p></bx-modal-body>
        <bx-modal-footer>
          <button class="bx--btn bx--btn--secondary" type="button" data-modal-close>Cancel</button>
          <button class="bx--btn bx--btn--primary" type="button">Save</button>
        </bx-modal-footer>
      </bx-modal>
    `;
  });
