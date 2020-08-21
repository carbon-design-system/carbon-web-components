/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { StrictMode, ReactNode } from 'react';
import containerStyles from '../_container.scss'; // eslint-disable-line import/first

/**
 * The content that wraps the story.
 */
const Container = ({ hasMainTag, children }: { hasMainTag?: boolean; children: ReactNode }) => (
  <StrictMode>
    <style>{containerStyles.cssText}</style>
    <div
      id="main-content"
      data-floating-menu-container
      role={hasMainTag ? 'none' : 'main'}
      className="bx--body bx-ce-demo-devenv--container">
      {children}
    </div>
  </StrictMode>
);

Container.propTypes = {
  /**
   * `true` if the story itself has `<main>` tag.
   */
  hasMainTag: PropTypes.bool,
};

export default Container;
