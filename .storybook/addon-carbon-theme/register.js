import React from 'react';
import addons from '@storybook/addons';
import Panel from './components/Panel';
import { ADDON_ID, PANEL_ID } from './shared';

if (process.env.CARBON_CUSTOM_ELEMENTS_STORYBOOK_USE_CUSTOM_PROPERTIES === 'true') {
  addons.register(ADDON_ID, api => {
    addons.addPanel(PANEL_ID, {
      title: 'Carbon theme',
      // eslint-disable-next-line react/prop-types
      render: ({ active, key }) => <Panel api={api} key={key} active={active} />,
    });
  });
}
