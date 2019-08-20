import PropTypes from 'prop-types';
import React, { useCallback, useMemo, useState } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, select } from '@storybook/addon-knobs';
// Below path will be there when an application installs `carbon-custom-elements` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the genrated file.
// @ts-ignore
import BXDataTable from 'carbon-custom-elements/es/components-react/data-table/data-table';
// @ts-ignore
import BXTable, { TABLE_SIZE } from 'carbon-custom-elements/es/components-react/data-table/table';
// @ts-ignore
import BXTableHead from 'carbon-custom-elements/es/components-react/data-table/table-head';
// @ts-ignore
import BXTableHeaderRow from 'carbon-custom-elements/es/components-react/data-table/table-header-row';
// @ts-ignore
import BXTableHeaderCell, { TABLE_SORT_DIRECTION } from 'carbon-custom-elements/es/components-react/data-table/table-header-cell';
// @ts-ignore
import BXTableBody from 'carbon-custom-elements/es/components-react/data-table/table-body';
// @ts-ignore
import BXTableRow from 'carbon-custom-elements/es/components-react/data-table/table-row';
// @ts-ignore
import BXTableCell from 'carbon-custom-elements/es/components-react/data-table/table-cell';
import { rows as demoRows, columns as demoColumns, sortInfo as demoSortInfo } from './stories/data';
import { TDemoTableColumn, TDemoTableRow, TDemoSortInfo } from './stories/types';

/**
 * The map of how sorting direction affects sorting order.
 */
const collationFactors = {
  [TABLE_SORT_DIRECTION.ASCENDING]: 1,
  [TABLE_SORT_DIRECTION.DESCENDING]: -1,
};

/**
 * A class to manage table states, like selection and sorting.
 * DEMONSTRATION-PURPOSE ONLY.
 * Data/state handling in data table tends to involve lots of application-specific logics
 * and thus abstracting everything in a library won't be a good return on investment
 * vs. letting users copy code here and implement features that fit their needs.
 */
const BXCEDemoDataTable = ({
  id,
  collator,
  columns,
  hasSelection,
  rows: propRows,
  size,
  sortInfo: propSortInfo,
  onChangeSelection,
  onChangeSelectionAll,
  onSort,
}: {
  id?: string;
  collator?: Intl.Collator;
  columns: TDemoTableColumn[];
  hasSelection?: boolean;
  rows: TDemoTableRow[];
  size?: TABLE_SIZE;
  sortInfo: TDemoSortInfo;
  onChangeSelection?: (event: CustomEvent) => void;
  onChangeSelectionAll?: (event: CustomEvent) => void;
  onSort?: (event: CustomEvent) => void;
}) => {
  const uniqueId = useMemo(
    () =>
      Math.random()
        .toString(36)
        .slice(2),
    []
  );
  const elementId = id || uniqueId;

  const [rows, setRows] = useState(propRows);
  const [sortInfo, setSortInfo] = useState(propSortInfo);

  const { columnId: sortColumnId, direction: sortDirection } = sortInfo;
  const selectionAllName = !hasSelection ? undefined : `__bx-ce-demo-data-table_select-all_${elementId}`;
  const selectedAll = rows.every(({ selected }) => !!selected);

  const compare = useCallback(
    (lhs, rhs) => {
      if (typeof lhs === 'number' && typeof rhs === 'number') {
        return lhs - rhs;
      }
      return collator!.compare(lhs, rhs);
    },
    [collator]
  );

  const sortedRows =
    sortDirection === TABLE_SORT_DIRECTION.NONE
      ? rows!.slice()
      : rows!.slice().sort((lhs, rhs) => collationFactors[sortDirection] * compare(lhs[sortColumnId!], rhs[sortColumnId!]));

  const handleChangeSelection = useCallback(
    (event: CustomEvent) => {
      if (onChangeSelection) {
        onChangeSelection(event);
      }
      const { defaultPrevented, detail, target } = event;
      if (!defaultPrevented) {
        const { rowId: changedRowId } = (target as HTMLElement).dataset;
        const { selected } = detail;
        setRows(rows!.map(row => (Number(changedRowId) !== row.id ? row : { ...row, selected })));
      }
    },
    [rows, onChangeSelection]
  );

  const handleChangeSelectionAll = useCallback(
    (event: CustomEvent) => {
      if (onChangeSelectionAll) {
        onChangeSelectionAll(event);
      }
      const { defaultPrevented, detail } = event;
      if (!defaultPrevented) {
        const { selected } = detail;
        setRows(rows!.map(row => ({ ...row, selected })));
      }
    },
    [rows, onChangeSelectionAll]
  );

  const handleChangeSort = useCallback(
    (event: CustomEvent) => {
      if (onSort) {
        onSort(event);
      }
      const { defaultPrevented, detail, target } = event;
      if (!defaultPrevented) {
        const { columnId } = (target as HTMLElement).dataset;
        const { sortDirection: direction } = detail;
        if (direction === TABLE_SORT_DIRECTION.NONE && columnId !== 'name') {
          // Resets the sorting, given non-primary sorting column has got in non-sorting state
          setSortInfo(propSortInfo);
        } else {
          // Sets the sorting as user desires
          setSortInfo({
            columnId: columnId!,
            direction,
          });
        }
      }
    },
    [propSortInfo, onSort]
  );

  return (
    <BXDataTable>
      <BXTable size={size}>
        <BXTableHead>
          <BXTableHeaderRow
            selected={selectedAll}
            selectionName={selectionAllName}
            selectionValue={selectionAllName}
            onBeforeChangeSelection={handleChangeSelectionAll}>
            {columns.map(({ id: columnId, sortCycle, title }) => {
              const sortDirectionForThisCell =
                sortCycle && (columnId === sortColumnId ? sortDirection : TABLE_SORT_DIRECTION.NONE);
              return (
                <BXTableHeaderCell
                  key={columnId}
                  sortCycle={sortCycle}
                  sortDirection={sortDirectionForThisCell}
                  data-column-id={columnId}
                  onBeforeSort={handleChangeSort}>
                  {title}
                </BXTableHeaderCell>
              );
            })}
          </BXTableHeaderRow>
        </BXTableHead>
        <BXTableBody>
          {sortedRows.map(row => {
            const { id: rowId, selected } = row;
            const selectionName = !hasSelection ? undefined : `__bx-ce-demo-data-table_${elementId}_${rowId}`;
            const selectionValue = !hasSelection ? undefined : 'selected';
            return (
              <BXTableRow
                key={rowId}
                selected={hasSelection && selected}
                selectionName={selectionName}
                selectionValue={selectionValue}
                data-row-id={rowId}
                onBeforeChangeSelection={handleChangeSelection}>
                {columns.map(({ id: columnId }) => (
                  <BXTableCell key={columnId}>{row[columnId]}</BXTableCell>
                ))}
              </BXTableRow>
            );
          })}
        </BXTableBody>
      </BXTable>
    </BXDataTable>
  );
};

BXCEDemoDataTable.propTypes = {
  /**
   * The g11n collator to use.
   */
  collator: PropTypes.shape({}),

  /**
   * Data table columns.
   */
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      sortCycle: PropTypes.string,
    })
  ),

  /**
   * Data table rows.
   */
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      selected: PropTypes.bool,
    })
  ),

  /**
   * Table sorting info.
   */
  sortInfo: PropTypes.shape({
    columnId: PropTypes.string,
    direction: PropTypes.string,
  }),

  /**
   * `true` if the the table should support selection UI. Corresponds to the attribute with the same name.
   */
  hasSelection: PropTypes.bool,

  /**
   * `true` if the the table should use the compact version of the UI. Corresponds to the attribute with the same name.
   */
  size: PropTypes.string,

  /**
   * An event that fires when user changes selection of a row.
   */
  onChangeSelection: PropTypes.func,

  /**
   * An event that fires when user changes selection of all rows.
   */
  onChangeSelectionAll: PropTypes.func,

  /**
   * An event that fires when sorting changes.
   */
  onSort: PropTypes.func,
};

BXCEDemoDataTable.defaultProps = {
  collator: new Intl.Collator(),
  hasSelection: false,
  size: TABLE_SIZE.REGULAR,
};

const sizes = {
  [`Compact size (${TABLE_SIZE.COMPACT})`]: TABLE_SIZE.COMPACT,
  [`Short size (${TABLE_SIZE.SHORT})`]: TABLE_SIZE.SHORT,
  [`Regular size (${TABLE_SIZE.REGULAR})`]: TABLE_SIZE.REGULAR,
  [`Tall size (${TABLE_SIZE.TALL})`]: TABLE_SIZE.TALL,
};

const createProps = ({ sortable }: { sortable?: boolean } = {}) => {
  const hasSelection = sortable && boolean('Supports selection feature (has-selection)', false);
  return {
    hasSelection,
    size: select('Table size (size)', sizes, TABLE_SIZE.REGULAR),
    disableChangeSelection:
      hasSelection &&
      boolean('Disable user-initiated change in selection (Call event.preventDefault() in onBeforeChangeSelection event)', false),
    disableChangeSort:
      sortable && boolean('Disable user-initiated change in sorting (Call event.preventDefault() in onBeforeSort event)', false),
  };
};

storiesOf('Data table', module)
  .addDecorator(withKnobs)
  .add('Default', () => {
    const { size } = createProps();
    return (
      <bx-data-table>
        <bx-table size={size}>
          <bx-table-head>
            <bx-table-header-row>
              <bx-table-header-cell>Name</bx-table-header-cell>
              <bx-table-header-cell>Protocol</bx-table-header-cell>
              <bx-table-header-cell>Port</bx-table-header-cell>
              <bx-table-header-cell>Rule</bx-table-header-cell>
              <bx-table-header-cell>Attached Groups</bx-table-header-cell>
              <bx-table-header-cell>Status</bx-table-header-cell>
            </bx-table-header-row>
          </bx-table-head>
          <bx-table-body>
            <bx-table-row>
              <bx-table-cell>Load Balancer 1</bx-table-cell>
              <bx-table-cell>HTTP</bx-table-cell>
              <bx-table-cell>80</bx-table-cell>
              <bx-table-cell>Round Robin</bx-table-cell>
              <bx-table-cell>Maureen's VM Groups</bx-table-cell>
              <bx-table-cell>Active</bx-table-cell>
            </bx-table-row>
            <bx-table-row>
              <bx-table-cell>Load Balancer 2</bx-table-cell>
              <bx-table-cell>HTTP</bx-table-cell>
              <bx-table-cell>80</bx-table-cell>
              <bx-table-cell>Round Robin</bx-table-cell>
              <bx-table-cell>Maureen's VM Groups</bx-table-cell>
              <bx-table-cell>Active</bx-table-cell>
            </bx-table-row>
            <bx-table-row>
              <bx-table-cell>Load Balancer 3</bx-table-cell>
              <bx-table-cell>HTTP</bx-table-cell>
              <bx-table-cell>80</bx-table-cell>
              <bx-table-cell>Round Robin</bx-table-cell>
              <bx-table-cell>Maureen's VM Groups</bx-table-cell>
              <bx-table-cell>Active</bx-table-cell>
            </bx-table-row>
          </bx-table-body>
        </bx-table>
      </bx-data-table>
    );
  })
  .add('Sortable', () => {
    const { hasSelection, size, disableChangeSelection, disableChangeSort } = createProps({ sortable: true });
    const beforeChangeSelectionAction = action('onBeforeChangeSelection');
    const beforeChangeSelectionAllAction = action('onBeforeChangeSelection (for selecting all rows)');
    const beforeChangeSelectionHandler = (event: CustomEvent) => {
      if (event.type === 'bx-table-change-selection-all') {
        beforeChangeSelectionAllAction(event);
      } else {
        beforeChangeSelectionAction(event);
      }
      if (disableChangeSelection) {
        event.preventDefault();
      }
    };
    const beforeChangeSortAction = action('onBeforeSort');
    const beforeChangeSortHandler = (event: CustomEvent) => {
      beforeChangeSortAction(event);
      if (disableChangeSort) {
        event.preventDefault();
      }
    };
    return (
      <>
        {/* Refer to <bx-ce-demo-data-table> implementation at the top for details */}
        <BXCEDemoDataTable
          columns={demoColumns}
          rows={demoRows}
          sortInfo={demoSortInfo}
          hasSelection={hasSelection}
          size={size}
          onChangeSelection={beforeChangeSelectionHandler}
          onChangeSelectionAll={beforeChangeSelectionHandler}
          onSort={beforeChangeSortHandler}
        />
      </>
    );
  });
