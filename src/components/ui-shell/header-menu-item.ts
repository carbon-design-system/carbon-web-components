import settings from 'carbon-components/es/globals/js/settings';
import { customElement } from 'lit-element';
import BXHeaderNavItem from './header-nav-item';

const { prefix } = settings;

/**
 * Header submenu item.
 */
@customElement(`${prefix}-header-menu-item`)
class BXHeaderSubmenuItem extends BXHeaderNavItem {}

export default BXHeaderSubmenuItem;
