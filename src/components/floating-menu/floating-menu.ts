import { LitElement } from 'lit-element';
import BXFloatingMenuTrigger from './floating-menu-trigger';

/**
 * Position of floating menu, or trigger button of floating menu.
 */
export interface FloatingMenuPosition {
  /**
   * The left position.
   */
  left: number;

  /**
   * The top position.
   */
  top: number;
}

/**
 * The alignment choices of floating menu.
 */
export enum FLOATING_MENU_ALIGNMENT {
  /**
   * Align the top/left position menu body to the one of its trigger button.
   */
  START = 'start',

  /**
   * Align the center position menu body to the one of its trigger button.
   */
  CENTER = 'center',

  /**
   * Align the bottom/right position menu body to the one of its trigger button.
   */
  END = 'end',
}

/**
 * The direction/positioning/orientation choices of floating menu.
 */
export enum FLOATING_MENU_DIRECTION {
  /**
   * Put menu body at the left of its trigger button.
   */
  LEFT = 'left',

  /**
   * Put menu body at the top of its trigger button.
   */
  TOP = 'top',

  /**
   * Put menu body at the right of its trigger button.
   */
  RIGHT = 'right',

  /**
   * Put menu body at the bottom of its trigger button.
   */
  BOTTOM = 'bottom',
}

/**
 * The group of the direction/positioning/orientation choices of floating menu.
 */
export enum FLOATING_MENU_DIRECTION_GROUP {
  /**
   * Put menu body at the left/right of its trigger button.
   */
  HORIZONTAL = 'horizontal',

  /**
   * Put menu body at the top/bottom of its trigger button.
   */
  VERTICAL = 'vertical',
}

/**
 * Floating menu.
 */
abstract class BXFloatingMenu extends LitElement {
  /**
   * The DOM element, typically a custom element in this library, launching this floating menu.
   */
  protected parent: BXFloatingMenuTrigger | null = null;

  /**
   * How the menu is aligned to the trigger button. Corresponds to the attribute with the same name.
   */
  abstract alignment: FLOATING_MENU_ALIGNMENT;

  /**
   * The menu direction. Corresponds to the attribute with the same name.
   */
  abstract direction: FLOATING_MENU_DIRECTION;

  /**
   * `true` if the menu should be open. Corresponds to the attribute with the same name.
   */
  abstract open: boolean;

  /**
   * The horizontal/vertical direction with regard to how the menu is aligned to the trigger button.
   */
  get alignmentDirection() {
    return {
      [FLOATING_MENU_DIRECTION.LEFT]: FLOATING_MENU_DIRECTION_GROUP.VERTICAL,
      [FLOATING_MENU_DIRECTION.TOP]: FLOATING_MENU_DIRECTION_GROUP.HORIZONTAL,
      [FLOATING_MENU_DIRECTION.RIGHT]: FLOATING_MENU_DIRECTION_GROUP.VERTICAL,
      [FLOATING_MENU_DIRECTION.BOTTOM]: FLOATING_MENU_DIRECTION_GROUP.HORIZONTAL,
    }[this.direction];
  }

  /**
   * The DOM element to put this menu into.
   */
  get container() {
    return this.closest((this.constructor as typeof BXFloatingMenu).selectorContainer) || this.ownerDocument!.body;
  }

  /**
   * The position of this floating menu.
   */
  get position(): FloatingMenuPosition {
    const { triggerPosition } = this.parent!;
    if (!triggerPosition) {
      throw new TypeError('Missing information of trigger button position.');
    }

    const { left: refLeft = 0, top: refTop = 0, right: refRight = 0, bottom: refBottom = 0 } = triggerPosition;
    const { width, height } = this.getBoundingClientRect();
    const { scrollLeft, scrollTop } = this.container;
    const refCenterHorizontal = (refLeft + refRight) / 2;
    const refCenterVertical = (refTop + refBottom) / 2;

    const { alignment, alignmentDirection, direction } = this;
    if (Object.values(FLOATING_MENU_ALIGNMENT).indexOf(alignment) < 0) {
      throw new Error(`Wrong menu alignment: ${alignment}`);
    }
    if (Object.values(FLOATING_MENU_DIRECTION).indexOf(direction) < 0) {
      throw new Error(`Wrong menu position direction: ${direction}`);
    }

    const alignmentStart = {
      [FLOATING_MENU_DIRECTION_GROUP.HORIZONTAL]: {
        [FLOATING_MENU_ALIGNMENT.START]: () => refLeft,
        [FLOATING_MENU_ALIGNMENT.CENTER]: () => refCenterHorizontal - width / 2,
        [FLOATING_MENU_ALIGNMENT.END]: () => refRight - width,
      },
      [FLOATING_MENU_DIRECTION_GROUP.VERTICAL]: {
        [FLOATING_MENU_ALIGNMENT.START]: () => refTop,
        [FLOATING_MENU_ALIGNMENT.CENTER]: () => refCenterVertical - height / 2,
        [FLOATING_MENU_ALIGNMENT.END]: () => refBottom - height,
      },
    }[alignmentDirection][alignment]();

    return {
      [FLOATING_MENU_DIRECTION.LEFT]: () => ({
        left: refLeft - width + scrollLeft,
        top: alignmentStart + scrollTop,
      }),
      [FLOATING_MENU_DIRECTION.TOP]: () => ({
        left: alignmentStart + scrollLeft,
        top: refTop - height + scrollTop,
      }),
      [FLOATING_MENU_DIRECTION.RIGHT]: () => ({
        left: refRight + scrollLeft,
        top: alignmentStart + scrollTop,
      }),
      [FLOATING_MENU_DIRECTION.BOTTOM]: () => ({
        left: alignmentStart + scrollLeft,
        top: refBottom + scrollTop,
      }),
    }[direction]();
  }

  attributeChangedCallback(name, old, current) {
    if (old !== current) {
      if ((name === 'open' || name === 'direction' || name === 'alignment') && this.open) {
        if (!this.parent) {
          this.parent = this.parentElement as BXFloatingMenuTrigger;
          this.container.appendChild(this);
        }
        const { left, top } = this.position;
        this.style.left = `${left}px`;
        this.style.top = `${top}px`;
      }
    }
    super.attributeChangedCallback(name, old, current);
  }

  /**
   * A constant indicating that this class is a floating menu.
   */
  static FLOATING_MENU = true;

  /**
   * The CSS selector to find the element to put this floating menu in.
   */
  static selectorContainer = '[data-floating-menu-container]';
}

export default BXFloatingMenu;
