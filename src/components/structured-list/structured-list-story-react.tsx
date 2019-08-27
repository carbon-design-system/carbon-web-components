import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean } from '@storybook/addon-knobs';
// Below path will be there when an application installs `carbon-custom-elements` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the genrated file.
// @ts-ignore
import BXStructuredList from 'carbon-custom-elements/es/components-react/structured-list/structured-list';
// @ts-ignore
import BXStructuredListHead from 'carbon-custom-elements/es/components-react/structured-list/structured-list-head';
// @ts-ignore
import BXStructuredListHeaderRow from 'carbon-custom-elements/es/components-react/structured-list/structured-list-header-row';
// @ts-ignore
import BXStructuredListBody from 'carbon-custom-elements/es/components-react/structured-list/structured-list-body';
// @ts-ignore
import BXStructuredListRow from 'carbon-custom-elements/es/components-react/structured-list/structured-list-row';

const createProps = () => ({
  hasSelection: boolean('Supports selection feature (hasSelection)', false),
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
        <BXStructuredListHead>
          <BXStructuredListHeaderRow hasSelection={hasSelection}>
            <bx-structured-list-header>ColumnA</bx-structured-list-header>
            <bx-structured-list-header>ColumnB</bx-structured-list-header>
            <bx-structured-list-header>ColumnC</bx-structured-list-header>
          </BXStructuredListHeaderRow>
        </BXStructuredListHead>
        <BXStructuredListBody>
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
        </BXStructuredListBody>
      </BXStructuredList>
    );
  });
