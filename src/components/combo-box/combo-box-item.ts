import settings from 'carbon-components/es/globals/js/settings';
import { customElement } from 'lit-element';
import BXDropdownItem from '../dropdown/dropdown-item';
import styles from './combo-box.scss';

const { prefix } = settings;

/**
 * Combo box item.
 */
@customElement(`${prefix}-combo-box-item`)
class BXComboBoxItem extends BXDropdownItem {
  static styles = styles;
}

export default BXComboBoxItem;
