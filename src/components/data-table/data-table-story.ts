import { html, property, customElement, LitElement } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined';
import { repeat } from 'lit-html/directives/repeat';
import { storiesOf } from '@storybook/polymer';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, select } from '@storybook/addon-knobs';
import './data-table';
import { TABLE_SIZE } from './table';
import './table-head';
import './table-header-row';
import { TABLE_SORT_DIRECTION } from './table-header-cell';
import './table-body';
import './table-row';
import './table-cell';
import { rows as demoRows, columns as demoColumns, sortInfo as demoSortInfo } from './stories/data';
import { TDemoTableColumn, TDemoTableRow, TDemoSortInfo } from './stories/types';

/**
 * A class to manage table states, like selection and sorting.
 * DEMONSTRATION-PURPOSE ONLY.
 * Data/state handling in data table tends to involve lots of application-specific logics
 * and thus abstracting everything in a library won't be a good return on investment
 * vs. letting users copy code here and implement features that fit their needs.
 */
@customElement('bx-ce-demo-data-table')
// @ts-ignore `BXCEDemoDataTable` is used (only) for type reference
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class BXCEDemoDataTable extends LitElement {
  /**
   * The table sorting info reflecting user-initiated changes.
   */
  private _sortInfo?: TDemoSortInfo;

  /**
   * The table rows reflecting user-initiated changes in sorting.
   */
  private _rows?: TDemoTableRow[];

  /**
   * Unique ID used for form elements.
   */
  protected _uniqueId = Math.random()
    .toString(36)
    .slice(2);

  /**
   * @param lhs A value.
   * @param rhs Another value.
   * @returns
   *   * `0` if the given two values are equal
   *   * A negative value to sort `lhs` to an index lower than `rhs`
   *   * A positive value to sort `rhs` to an index lower than `lhs`
   */
  private _compare(lhs, rhs) {
    if (typeof lhs === 'number' && typeof rhs === 'number') {
      return lhs - rhs;
    }
    return this.collator.compare(lhs, rhs);
  }

  /**
   * Handles an event to change in selection of rows, fired from `<bx-table-row>`.
   * @param event The event.
   */
  private _handleChangeSelection({ defaultPrevented, detail, target }: CustomEvent) {
    if (!defaultPrevented) {
      const { rowId: changedRowId } = (target as HTMLElement).dataset;
      const { selected } = detail;
      const { _rows: oldRows } = this;
      this._rows = this.rows!.map(row => (Number(changedRowId) !== row.id ? row : { ...row, selected }));
      this.requestUpdate('_rows', oldRows);
    }
  }

  /**
   * Handles an event to change in selection of all rows, fired from `<bx-table-header-row>`.
   * @param event The event.
   */
  private _handleChangeSelectionAll({ defaultPrevented, detail }: CustomEvent) {
    if (!defaultPrevented) {
      const { selected } = detail;
      const { _rows: oldRows } = this;
      this._rows = this._rows!.map(row => ({ ...row, selected }));
      this.requestUpdate('_rows', oldRows);
    }
  }

  /**
   * Handles an event to sort rows, fired from `<bx-table-header-cell>`.
   * @param event The event.
   */
  private _handleChangeSort({ defaultPrevented, detail, target }: CustomEvent) {
    if (!defaultPrevented) {
      const { columnId } = (target as HTMLElement).dataset;
      const { sortDirection: direction } = detail;
      const { _sortInfo: oldSortInfo } = this;
      if (direction === TABLE_SORT_DIRECTION.NONE && columnId !== 'name') {
        // Resets the sorting, given non-primary sorting column has got in non-sorting state
        this._sortInfo = this.sortInfo;
      } else {
        // Sets the sorting as user desires
        this._sortInfo = {
          columnId: columnId!,
          direction,
        };
      }
      this.requestUpdate('_sortInfo', oldSortInfo);
    }
  }

  /**
   * The g11n collator to use.
   */
  @property({ attribute: false })
  collator = new Intl.Collator();

  /**
   * Data table columns.
   */
  @property({ attribute: false })
  columns?: TDemoTableColumn[];

  /**
   * Data table rows.
   */
  @property({ attribute: false })
  rows?: TDemoTableRow[];

  /**
   * Table sorting info.
   */
  @property({ attribute: false })
  sortInfo?: TDemoSortInfo;

  /**
   * `true` if the the table should support selection UI. Corresponds to the attribute with the same name.
   */
  @property({ type: Boolean, reflect: true, attribute: 'has-selection' })
  hasSelection = false;

  /**
   * `true` if the the table should use the compact version of the UI. Corresponds to the attribute with the same name.
   */
  @property({ reflect: true })
  size = TABLE_SIZE.REGULAR;

  shouldUpdate(changedProperties) {
    if (changedProperties.has('sortInfo')) {
      this._sortInfo = this.sortInfo;
    }
    if (changedProperties.has('rows')) {
      this._rows = this.rows;
    }
    return true;
  }

  render() {
    const { id: elementId, hasSelection, size, columns, _rows: rows } = this;
    const selectionAllName = !hasSelection ? undefined : `__bx-ce-demo-data-table_select-all_${elementId || this._uniqueId}`;
    const selectedAll = rows!.every(({ selected }) => selected!);
    const { columnId: sortColumnId, direction: sortDirection } = this._sortInfo!;
    const sortedRows =
      sortDirection === TABLE_SORT_DIRECTION.NONE
        ? rows!.slice()
        : rows!
            .slice()
            .sort(
              (lhs, rhs) =>
                (this.constructor as typeof BXCEDemoDataTable).collationFactors[sortDirection] *
                this._compare(lhs[sortColumnId!], rhs[sortColumnId!])
            );
    return html`
      <bx-data-table
        @bx-table-row-change-selection=${this._handleChangeSelection}
        @bx-table-change-selection-all=${this._handleChangeSelectionAll}
        @bx-table-header-cell-sort=${this._handleChangeSort}
      >
        <bx-table size="${size}">
          <bx-table-head>
            <bx-table-header-row
              ?selected=${selectedAll}
              selection-name=${ifDefined(selectionAllName)}
              selection-value=${ifDefined(selectionAllName)}
            >
              ${repeat(
                columns!,
                ({ id: columnId }) => columnId,
                ({ id: columnId, sortCycle, title }) => {
                  const sortDirectionForThisCell =
                    sortCycle && (columnId === sortColumnId ? sortDirection : TABLE_SORT_DIRECTION.NONE);
                  return html`
                    <bx-table-header-cell
                      sort-cycle="${ifDefined(sortCycle)}"
                      sort-direction="${ifDefined(sortDirectionForThisCell)}"
                      data-column-id="${columnId}"
                    >
                      ${title}
                    </bx-table-header-cell>
                  `;
                }
              )}
            </bx-table-header-row>
          </bx-table-head>
          <bx-table-body>
            ${repeat(
              sortedRows,
              ({ id: rowId }) => rowId,
              row => {
                const { id: rowId, selected } = row;
                const selectionName = !hasSelection
                  ? undefined
                  : `__bx-ce-demo-data-table_${elementId || this._uniqueId}_${rowId}`;
                const selectionValue = !hasSelection ? undefined : 'selected';
                return html`
                  <bx-table-row
                    ?selected=${hasSelection && selected}
                    selection-name="${ifDefined(selectionName)}"
                    selection-value="${ifDefined(selectionValue)}"
                    data-row-id="${rowId}"
                  >
                    ${repeat(
                      columns!,
                      ({ id: columnId }) => columnId,
                      ({ id: columnId }) => html`
                        <bx-table-cell>${row[columnId]}</bx-table-cell>
                      `
                    )}
                  </bx-table-row>
                `;
              }
            )}
          </bx-table-body>
        </bx-table>
      </bx-data-table>
    `;
  }

  /**
   * The map of how sorting direction affects sorting order.
   */
  static collationFactors = {
    [TABLE_SORT_DIRECTION.ASCENDING]: 1,
    [TABLE_SORT_DIRECTION.DESCENDING]: -1,
  };
}

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
      boolean(
        'Disable user-initiated change in selection ' +
          '(Call event.preventDefault() in bx-table-row-change-selection/bx-table-change-selection-all events)',
        false
      ),
    disableChangeSort:
      sortable &&
      boolean('Disable user-initiated change in sorting (Call event.preventDefault() in bx-table-header-cell-sort event)', false),
  };
};

storiesOf('Data table', module)
  .addDecorator(withKnobs)
  .add('Default', () => {
    const { size } = createProps();
    return html`
      <bx-data-table>
        <bx-table size="${size}">
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
    `;
  })
  .add('Sortable', () => {
    const { hasSelection, size, disableChangeSelection, disableChangeSort } = createProps({ sortable: true });
    const beforeChangeSelectionAction = action('bx-table-row-change-selection');
    const beforeChangeSelectionAllAction = action('bx-table-change-selection-all');
    const beforeChangeSelectionHandler = {
      handleEvent(event: CustomEvent) {
        if (event.type === 'bx-table-change-selection-all') {
          beforeChangeSelectionAllAction(event);
        } else {
          beforeChangeSelectionAction(event);
        }
        if (disableChangeSelection) {
          event.preventDefault();
        }
      },
      capture: true, // To prevent the default behavior before `<bx-ce-demo-data-table>` handles the event
    };
    const beforeChangeSortAction = action('bx-table-header-cell-sort');
    const beforeChangeSortHandler = {
      handleEvent(event: CustomEvent) {
        beforeChangeSortAction(event);
        if (disableChangeSort) {
          event.preventDefault();
        }
      },
      capture: true, // To prevent the default behavior before `<bx-ce-demo-data-table>` handles the event
    };
    return html`
      <!-- Refer to <bx-ce-demo-data-table> implementation at the top for details -->
      <bx-ce-demo-data-table
        .columns=${demoColumns}
        .rows=${demoRows}
        .sortInfo=${demoSortInfo}
        ?has-selection=${hasSelection}
        size="${size}"
        @bx-table-row-change-selection=${beforeChangeSelectionHandler}
        @bx-table-change-selection-all=${beforeChangeSelectionHandler}
        @bx-table-header-cell-sort=${beforeChangeSortHandler}
      >
      </bx-ce-demo-data-table>
    `;
  });
