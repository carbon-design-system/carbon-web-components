import { html } from 'lit-html';
import { storiesOf } from '@storybook/polymer';
import { withKnobs, boolean, select } from '@storybook/addon-knobs';
import './tooltip';
import BXTooltipBody from './tooltip-body';
import './tooltip-footer';

const directions = {
  [`Bottom (${BXTooltipBody.DIRECTION_BOTTOM})`]: BXTooltipBody.DIRECTION_BOTTOM,
  [`Left (${BXTooltipBody.DIRECTION_LEFT})`]: BXTooltipBody.DIRECTION_LEFT,
  [`Top (${BXTooltipBody.DIRECTION_TOP})`]: BXTooltipBody.DIRECTION_TOP,
  [`Right (${BXTooltipBody.DIRECTION_RIGHT})`]: BXTooltipBody.DIRECTION_RIGHT,
};

const createProps = () => ({
  open: boolean('Open (open)', false),
  direction: select('Direction (direction in <bx-tooltip-body>)', directions, BXTooltipBody.DIRECTION_BOTTOM),
});

storiesOf('Tooltip', module)
  .addDecorator(withKnobs)
  .add('Default', () => {
    const { open, direction } = createProps();
    return html`
      <bx-tooltip ?open="${open}">
        <bx-tooltip-body direction="${direction}">
          <p>
            This is some tooltip text. This box shows the maximum amount of text that should appear inside. If more room is needed
            please use a modal instead.
          </p>
          <bx-tooltip-footer>
            <a href="#" class="bx--link">Learn More</a><button class="bx--btn bx--btn--primary" type="button">Create</button>
          </bx-tooltip-footer>
        </bx-tooltip-body>
      </bx-tooltip>
    `;
  });
