import { action } from '@storybook/addon-actions';
import { INPUT_TYPE } from '../input';

const inputTypes = {};

for (const [key, value] of Object.entries(INPUT_TYPE)) {
  inputTypes[key.toLowerCase()] = value;
}

export const createProps = ({ boolean, text, select }) => ({
  disabled: boolean('Disabled (disabled)', false),
  value: text('Input value (value)', ''),
  placeholder: text('Placeholder text (placeholder)', 'Optional placeholder text'),
  invalid: boolean('Invalid (invalid)', false),
  onInput: action('input'),
  type: select('Input type (type)', inputTypes, INPUT_TYPE.TEXT),
});
