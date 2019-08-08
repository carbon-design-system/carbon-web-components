import { Pipe, PipeTransform, Component, Input, HostBinding, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { storiesOf } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, select } from '@storybook/addon-knobs/angular';
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
 * Table sorting options.
 */
interface IBXCETableSortOptions {
  /**
   * @param lhs A table row.
   * @param rhs Another table row.
   * @returns {number} `-1` to put `lhs` to lower index than `lhs`, `1` to put it opposite, `0` if they are equal.
   */
  compare(lhs: any, rhs: any): number;

  /**
   * Table sorting info.
   */
  sortInfo: TDemoSortInfo;
}

/**
 * Angular filter for sorting table rows.
 */
@Pipe({
  name: 'BXCETableRowsSortWith',
})
class BXCETableRowsSortPipe implements PipeTransform {
  /**
   * @param rows The table rows. to sort.
   * @param options The table sorting options.
   * @returns The sorted table rows.
   */
  transform(rows: TDemoTableRow[], options: IBXCETableSortOptions): TDemoTableRow[] {
    const { compare, sortInfo } = options;
    const { columnId: sortColumnId, direction: sortDirection } = sortInfo;
    return sortDirection === TABLE_SORT_DIRECTION.NONE
      ? rows
      : rows!.sort(
          (lhs, rhs) =>
            (this.constructor as typeof BXCETableRowsSortPipe).collationFactors[sortDirection] *
            compare(lhs[sortColumnId!], rhs[sortColumnId!])
        );
  }

  /**
   * The map of how sorting direction affects sorting order.
   */
  static collationFactors = {
    [TABLE_SORT_DIRECTION.ASCENDING]: 1,
    [TABLE_SORT_DIRECTION.DESCENDING]: -1,
  };
}

/* eslint-disable class-methods-use-this */
/**
 * Angular filter for sort direction of table column.
 */
@Pipe({
  name: 'BXCETableColumnSortDirection',
})
class BXCETableColumnSortDirectionPipe implements PipeTransform {
  /**
   * @param column A table column.
   * @param sortInfo The table sorting options.
   * @returns The table sort direction of the given table column.
   */
  transform(column: TDemoTableColumn, { columnId, direction }: TDemoSortInfo): TABLE_SORT_DIRECTION | void {
    const { id, sortCycle } = column;
    if (!sortCycle) {
      return undefined;
    }
    return id === columnId ? direction : TABLE_SORT_DIRECTION.NONE;
  }
}

/**
 * Angular filter for checkbox ID for row selection.
 */
@Pipe({
  name: 'BXCETableRowSelectionId',
})
class BXCETableRowSelectionIdPipe implements PipeTransform {
  /**
   * @param rowId A row ID.
   * @param selectionId The unique ID of the table for selection.
   * @returns The checkbox ID for row selection.
   */
  transform(rowId?: string, selectionId?: string): string | void {
    return rowId && `${selectionId}_${rowId}`;
  }
}
/* eslint-enable class-methods-use-this */

/**
 * A class to manage table states, like selection and sorting.
 * DEMONSTRATION-PURPOSE ONLY.
 * Data/state handling in data table tends to involve lots of application-specific logics
 * and thus abstracting everything in a library won't be a good return on investment
 * vs. letting users copy code here and implement features that fit their needs.
 */
@Component({
  selector: 'bx-ce-demo-data-table',
  template: `
    <bx-data-table
      [hasSelection]="hasSelection"
      (bx-table-row-change-selection)="_handleChangeSelection($event)"
      (bx-table-change-selection-all)="_handleChangeSelectionAll($event)"
      (bx-table-header-cell-sort)="_handleChangeSort($event)"
    >
      <bx-table [size]="size">
        <bx-table-head>
          <bx-table-header-row
            [selected]="_selectedAll"
            [selectionName]="!hasSelection ? undefined : _selectionId"
            [selectionValue]="!hasSelection ? undefined : _selectionId"
          >
            <bx-table-header-cell
              *ngFor="let column of columns"
              [sortCycle]="column.sortCycle"
              [sortDirection]="column | BXCETableColumnSortDirection: _sortInfo"
              [attr.data-column-id]="column.id"
            >
              {{ column.title }}
            </bx-table-header-cell>
          </bx-table-header-row>
        </bx-table-head>
        <bx-table-body>
          <bx-table-row
            *ngFor="let row of _rows | BXCETableRowsSortWith: { compare: _compare, sortInfo: _sortInfo }"
            [selected]="hasSelection && row.selected"
            [selectionName]="!hasSelection ? undefined : (row.id | BXCETableRowSelectionId: _selectionId)"
            [selectionValue]="!hasSelection ? undefined : 'selected'"
            [attr.data-row-id]="row.id"
          >
            <bx-table-cell *ngFor="let column of columns">{{ row[column.id] }}</bx-table-cell>
          </bx-table-row>
        </bx-table-body>
      </bx-table>
    </bx-data-table>
  `,
})
class BXCEDemoDataTable {
  /**
   * The table sorting info reflecting user-initiated changes.
   */
  _sortInfo?: TDemoSortInfo;

  /**
   * The table rows reflecting user-initiated changes in sorting.
   */
  _rows?: TDemoTableRow[];

  /**
   * The sorted version of the table rows.
   */
  _sortedRows?: TDemoTableRow[];

  /**
   * `true` if all rows are selected;
   */
  _selectedAll?: boolean;

  /**
   * Unique ID used for ID refs.
   */
  _uniqueId = Math.random()
    .toString(36)
    .slice(2);

  /**
   * A ID prefix for table selection checkbox names.
   */
  get _selectionId() {
    const { id: elementId, _uniqueId: uniqueId } = this;
    return `__bx-ce-demo-data-table_${elementId || uniqueId}`;
  }

  /**
   * @param lhs A value.
   * @param rhs Another value.
   * @returns
   *   * `0` if the given two values are equal
   *   * A negative value to sort `lhs` to an index lower than `rhs`
   *   * A positive value to sort `rhs` to an index lower than `lhs`
   */
  _compare = (lhs, rhs) => {
    if (typeof lhs === 'number' && typeof rhs === 'number') {
      return lhs - rhs;
    }
    return this.collator.compare(lhs, rhs);
  };

  /**
   * Handles an event to change in selection of rows, fired from `<bx-table-row>`.
   * @param event The event.
   */
  // @ts-ignore: Template-only ref
  _handleChangeSelection({ defaultPrevented, detail, target }: CustomEvent) {
    if (!defaultPrevented) {
      const { rowId: changedRowId } = (target as HTMLElement).dataset;
      const { selected } = detail;
      this._rows!.forEach(row => {
        if (Number(changedRowId) === row.id) {
          row.selected = selected;
        }
      });
      this._selectedAll = this._rows!.every(row => row.selected!);
    }
  }

  /**
   * Handles an event to change in selection of all rows, fired from `<bx-table-header-row>`.
   * @param event The event.
   */
  _handleChangeSelectionAll({ defaultPrevented, detail }: CustomEvent) {
    if (!defaultPrevented) {
      const { selected } = detail;
      this._rows!.forEach(row => {
        row.selected = selected;
      });
      this._selectedAll = selected;
    }
  }

  /**
   * Handles an event to sort rows, fired from `<bx-table-header-cell>`.
   * @param event The event.
   */
  _handleChangeSort({ defaultPrevented, detail, target }: CustomEvent) {
    if (!defaultPrevented) {
      const { columnId } = (target as HTMLElement).dataset;
      const { sortDirection: direction } = detail;
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
    }
  }

  /**
   * The element ID.
   */
  @Input() @HostBinding('id') id!: string;

  /**
   * The g11n collator to use.
   */
  @Input()
  collator = new Intl.Collator();

  /**
   * Data table columns.
   */
  @Input()
  columns?: TDemoTableColumn[];

  /**
   * Data table rows.
   */
  @Input()
  rows?: TDemoTableRow[];

  /**
   * Table sorting info.
   */
  @Input()
  sortInfo?: TDemoSortInfo;

  /**
   * `true` if the the table should support selection UI. Corresponds to the attribute with the same name.
   */
  @Input()
  hasSelection = false;

  /**
   * `true` if the the table should use the compact version of the UI. Corresponds to the attribute with the same name.
   */
  @Input()
  size = TABLE_SIZE.REGULAR;

  ngOnChanges(changes) {
    if ('sortInfo' in changes) {
      this._sortInfo = this.sortInfo;
    }
    if ('rows' in changes) {
      this._rows = this.rows;
      this._selectedAll = this.rows!.every(row => row.selected!);
    }
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
  };
};

storiesOf('Data table', module)
  .addDecorator(withKnobs)
  .add('Default', () => ({
    template: `
      <bx-data-table>
        <bx-table [size]="size">
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
    `,
    props: createProps(),
    moduleMetadata: {
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    },
  }))
  .add('Sortable', () => ({
    template: `
      <!-- Refer to <bx-ce-demo-data-table> implementation at the top for details -->
      <bx-ce-demo-data-table
        [columns]="demoColumns"
        [rows]="demoRows"
        [sortInfo]="demoSortInfo"
        [hasSelection]="hasSelection"
        [size]="size"
        (bx-table-row-change-selection)="onBeforeChangeSelection($event)"
        (bx-table-change-selection-all)="onBeforeChangeSelection($event)"
        (bx-table-header-cell-sort)="onBeforeChangeSort($event)"
      >
      </bx-ce-demo-data-table>
    `,
    props: (props => {
      const beforeChangeSelectionAction = action('bx-table-row-change-selection');
      const beforeChangeSelectionAllAction = action('bx-table-change-selection-all');
      const onBeforeChangeSelection = (event: CustomEvent) => {
        if (event.type === 'bx-table-change-selection-all') {
          beforeChangeSelectionAllAction(event);
        } else {
          beforeChangeSelectionAction(event);
        }
      };
      const onBeforeChangeSort = action('bx-table-header-cell-sort');
      return {
        ...props,
        demoColumns,
        demoRows,
        demoSortInfo,
        onBeforeChangeSelection,
        onBeforeChangeSort,
      };
    })(createProps({ sortable: true })),
    moduleMetadata: {
      declarations: [BXCEDemoDataTable, BXCETableRowsSortPipe, BXCETableColumnSortDirectionPipe, BXCETableRowSelectionIdPipe],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    },
  }));
