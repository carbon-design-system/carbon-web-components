/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { decorators as decoratorsOrig } from '../preview';
import containerStyles from '../_container.scss';
import theme from './theme';

export const parameters = {
  options: {
    showRoots: true,
    theme: theme,
  },
};

export const decorators = [
  () => {
    // Vue doesn't allow `<style>` tag in its template
    const { cssText } = containerStyles;
    let containerStyleNode = document.getElementById('container-style');
    if (!containerStyleNode) {
      containerStyleNode = document.createElement('style');
      containerStyleNode.setAttribute('type', 'text/css');
      containerStyleNode.appendChild(document.createTextNode(cssText));
      document.head.appendChild(containerStyleNode);
    } else {
      containerStyleNode.textContent = cssText;
    }
    return {
      template: `
        <div id="main-content" data-floating-menu-container role="main" class="bx--body bx-ce-demo-devenv--container">
          <a href="#main-content" class="bx--assistive-text" aria-label="Skip to main content">Skip to main content</a>
          <story/>
          <a href="#main-content" class="bx--assistive-text" aria-label="End of content">End of content</a>
        </div>
      `,
    };
  },
  decoratorsOrig.find(({ name }) => name === 'decoratorParameters'),
];
