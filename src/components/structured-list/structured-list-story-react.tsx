import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import createReactCustomElementType, { booleanSerializer } from '../../globals/wrappers/createReactCustomElementType';
import './structured-list';
import './structured-list-head';
import './structured-list-header-row';
import './structured-list-body';
import './structured-list-row';

const BXStructuredList = createReactCustomElementType('bx-structured-list', {
  hasSelection: {
    attribute: 'has-selection',
    serialize: booleanSerializer,
  },
});

const BXStructuredListHeaderRow = createReactCustomElementType('bx-structured-list-header-row', {
  hasSelection: {
    attribute: 'has-selection',
    serialize: booleanSerializer,
  },
});

const BXStructuredListRow = createReactCustomElementType('bx-structured-list-row', {
  selectionName: {
    attribute: 'selection-name',
  },
  selectionValue: {
    attribute: 'selection-value',
  },
});

const createProps = () => ({
  hasSelection: boolean('Supports selection feature (has-selection)', false),
});

storiesOf('Structured list', module)
  .addDecorator(withKnobs)
  .add('Default', () => {
    const { hasSelection } = createProps();
    const selectionName = !hasSelection ? undefined : 'structured-list-selection';
    const selectionValues = !hasSelection
      ? []
      : ['structured-list-selection-0', 'structured-list-selection-1', 'structured-list-selection-2'];
    return (
      <BXStructuredList hasSelection={hasSelection}>
        <bx-structured-list-head>
          <BXStructuredListHeaderRow hasSelection={hasSelection}>
            <bx-structured-list-header>ColumnA</bx-structured-list-header>
            <bx-structured-list-header>ColumnB</bx-structured-list-header>
            <bx-structured-list-header>ColumnC</bx-structured-list-header>
          </BXStructuredListHeaderRow>
        </bx-structured-list-head>
        <bx-structured-list-body>
          <BXStructuredListRow selectionName={selectionName} selectionValue={selectionValues[0]}>
            <bx-structured-list-cell>Row 1</bx-structured-list-cell>
            <bx-structured-list-cell>Row 1</bx-structured-list-cell>
            <bx-structured-list-cell>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet bibendum
              augue. Aenean posuere sem vel euismod dignissim.
            </bx-structured-list-cell>
          </BXStructuredListRow>
          <BXStructuredListRow selectionName={selectionName} selectionValue={selectionValues[1]}>
            <bx-structured-list-cell>Row 2</bx-structured-list-cell>
            <bx-structured-list-cell>Row 2</bx-structured-list-cell>
            <bx-structured-list-cell>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet bibendum
              augue. Aenean posuere sem vel euismod dignissim.
            </bx-structured-list-cell>
          </BXStructuredListRow>
          <BXStructuredListRow selectionName={selectionName} selectionValue={selectionValues[2]}>
            <bx-structured-list-cell>Row 3</bx-structured-list-cell>
            <bx-structured-list-cell>Row 3</bx-structured-list-cell>
            <bx-structured-list-cell>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed, aliquet bibendum
              augue. Aenean posuere sem vel euismod dignissim.
            </bx-structured-list-cell>
          </BXStructuredListRow>
        </bx-structured-list-body>
      </BXStructuredList>
    );
  });
