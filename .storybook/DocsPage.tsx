/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { DocsPage } from '@storybook/addon-docs/blocks';

export default ({ context }) => (
  <DocsPage
    context={context}
    titleSlot={({ selectedKind, parameters }) => (parameters.notes ? undefined : selectedKind)}
    propsSlot={() => undefined}
    descriptionSlot={({ parameters }) => parameters.notes}
    primarySlot={() => undefined}
    storiesSlot={stories => stories}
  />
);
