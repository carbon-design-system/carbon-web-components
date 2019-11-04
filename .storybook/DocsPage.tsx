import React from 'react';
import { DocsPage } from '@storybook/addon-docs/blocks';

export default ({ context }) => (
  <DocsPage
    context={context}
    titleSlot={({ selectedKind, parameters }) => parameters.notes ? undefined : selectedKind}
    propsSlot={() => undefined}
    descriptionSlot={({ parameters }) => parameters.notes}
    primarySlot={() => undefined}
    storiesSlot={stories => stories}
  />
);
