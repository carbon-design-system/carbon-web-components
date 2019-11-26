/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Pipe, PipeTransform, Component, Input, HostBinding, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { action } from '@storybook/addon-actions';
import { moduleMetadata } from '@storybook/angular';
import { TABLE_SIZE } from './table';
import { TABLE_SORT_DIRECTION } from './table-header-cell';
import baseStory, {
  defaultStory as baseDefaultStory,
  sortable as baseSortable,
  sortableWithPagination as baseSortableWithPagination,
} from './data-table-story';
import { rows as demoRows, rowsMany as demoRowsMany, columns as demoColumns, sortInfo as demoSortInfo } from './stories/data';
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
   * @param rows The table rows to sort.
   * @param options The table sorting options.
   * @returns The sorted table rows.
   */
  transform(rows: TDemoTableRow[], options: IBXCETableSortOptions): TDemoTableRow[] {
    const { compare, sortInfo } = options;
    const { columnId: sortColumnId, direction: sortDirection } = sortInfo;
    return sortDirection === TABLE_SORT_DIRECTION.NONE
      ? rows
      : rows!
          .slice()
          .sort(
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

/**
 * Table windowing options.
 */
interface IBXCETableSliceOptions {
  /**
   * Number of items per page.
   */
  pageSize: number;

  /**
   * The row number where current page start with, index that starts with zero.
   */
  start: number;
}

/**
 * Angular filter for windowing table rows.
 */
@Pipe({
  name: 'BXCETableRowsSliceWith',
})
class BXCETableRowsSlicePipe implements PipeTransform {
  /* eslint-disable class-methods-use-this */
  /**
   * @param rows The table rows to window.
   * @param options The table windowing options.
   * @returns The windowed table rows.
   */
  transform(rows: TDemoTableRow[], options: IBXCETableSliceOptions): TDemoTableRow[] {
    const { pageSize = Infinity, start } = options;
    return rows!.slice(start, start + pageSize);
  }
  /* eslint-enable class-methods-use-this */
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
    <bx-table
      [size]="size"
      (bx-table-row-change-selection)="_handleChangeSelection($event)"
      (bx-table-change-selection-all)="_handleChangeSelectionAll($event)"
      (bx-table-header-cell-sort)="_handleChangeSort($event)"
    >
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
      <bx-table-body [zebra]="zebra">
        <bx-table-row
          *ngFor="
            let row of _rows
              | BXCETableRowsSortWith: { compare: _compare, sortInfo: _sortInfo }
              | BXCETableRowsSliceWith: { start: start, pageSize: pageSize }
          "
          [selected]="hasSelection && row.selected"
          [selectionName]="!hasSelection ? undefined : (row.id | BXCETableRowSelectionId: _selectionId)"
          [selectionValue]="!hasSelection ? undefined : 'selected'"
          [attr.data-row-id]="row.id"
        >
          <bx-table-cell *ngFor="let column of columns">{{ row[column.id] }}</bx-table-cell>
        </bx-table-row>
      </bx-table-body>
    </bx-table>
    <bx-pagination
      *ngIf="pageSize !== undefined"
      [pageSize]="pageSize"
      [start]="start"
      [total]="rows.length"
      (bx-pagination-changed-current)="_handleChangeStart($event)"
      (bx-page-sizes-select-changed)="_handleChangePageSize($event)"
    >
      <bx-page-sizes-select slot="page-sizes-select">
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>
      </bx-page-sizes-select>
      <bx-pages-select></bx-pages-select>
    </bx-pagination>
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
   * `true` if all rows are selected.
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
   * Handles `bx-pagination-changed-current` event on the pagination UI.
   * @param event The event.
   */
  _handleChangeStart({ detail }: CustomEvent) {
    this.start = detail.start;
  }

  /**
   * Handles `bx-pages-select-changed` event on the pagination UI.
   * @param event The event.
   */
  _handleChangePageSize({ detail }: CustomEvent) {
    this.pageSize = detail.value;
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
   * `true` if the the table should support selection UI.
   */
  @Input()
  hasSelection = false;

  /**
   * Number of items per page.
   */
  @Input()
  pageSize!: number;

  /**
   * `true` if the the table should use the compact version of the UI.
   */
  @Input()
  size = TABLE_SIZE.REGULAR;

  /**
   * `true` if the zebra stripe should be shown.
   */
  @Input()
  zebra = false;

  /**
   * The row number where current page start with, index that starts with zero.
   */
  @Input()
  start = 0;

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

export const defaultStory = ({ parameters }) => ({
  template: `
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
      <bx-table-body [zebra]="zebra">
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
  `,
  props: { ...parameters?.props?.['bx-table'], ...parameters?.props?.['bx-table-body'] },
});

defaultStory.story = baseDefaultStory.story;

export const sortable = ({ parameters }) => ({
  template: `
    <!-- Refer to <bx-ce-demo-data-table> implementation at the top for details -->
    <bx-ce-demo-data-table
      [columns]="demoColumns"
      [rows]="demoRows"
      [sortInfo]="demoSortInfo"
      [hasSelection]="hasSelection"
      [size]="size"
      [zebra]="zebra"
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
  })({
    ...parameters?.props?.['bx-table'],
    ...parameters?.props?.['bx-table-body'],
    ...parameters?.props?.['bx-table-row'],
    ...parameters?.props?.['bx-header-cell'],
  }),
});

sortable.story = Object.assign(baseSortable.story, {
  decorators: [
    moduleMetadata({
      declarations: [
        BXCEDemoDataTable,
        BXCETableRowsSortPipe,
        BXCETableRowsSlicePipe,
        BXCETableColumnSortDirectionPipe,
        BXCETableRowSelectionIdPipe,
      ],
    }),
  ],
});

export const sortableWithPagination = ({ parameters }) => ({
  template: `
    <!-- Refer to <bx-ce-demo-data-table> implementation at the top for details -->
    <bx-ce-demo-data-table
      [columns]="demoColumns"
      [rows]="demoRows"
      [sortInfo]="demoSortInfo"
      [hasSelection]="hasSelection"
      [pageSize]="5"
      [size]="size"
      [start]="0"
      [zebra]="zebra"
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
      demoRows: demoRowsMany,
      demoSortInfo,
      onBeforeChangeSelection,
      onBeforeChangeSort,
    };
  })({
    ...parameters?.props?.['bx-table'],
    ...parameters?.props?.['bx-table-body'],
    ...parameters?.props?.['bx-table-row'],
    ...parameters?.props?.['bx-header-cell'],
  }),
});

sortableWithPagination.story = Object.assign(baseSortableWithPagination.story, {
  decorators: [
    moduleMetadata({
      declarations: [
        BXCEDemoDataTable,
        BXCETableRowsSortPipe,
        BXCETableRowsSlicePipe,
        BXCETableColumnSortDirectionPipe,
        BXCETableRowSelectionIdPipe,
      ],
    }),
  ],
});

export default Object.assign(baseStory, {
  decorators: [
    moduleMetadata({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }),
  ],
});
