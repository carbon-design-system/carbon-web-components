/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Vue, { PropType } from 'vue';
import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, select } from '@storybook/addon-knobs';
import createVueBindingsFromProps from '../../../.storybook/vue/create-vue-bindings-from-props';
import '../pagination/pagination';
import '../pagination/page-sizes-select';
import '../pagination/pages-select';
import { TABLE_SIZE } from './table';
import './table-head';
import './table-header-row';
import { TABLE_SORT_DIRECTION } from './table-header-cell';
import './table-body';
import './table-row';
import './table-cell';
import { rows as demoRows, rowsMany as demoRowsMany, columns as demoColumns, sortInfo as demoSortInfo } from './stories/data';
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
Vue.component('bx-ce-demo-data-table', {
  props: {
    /**
     * The element ID.
     */
    id: String,

    /**
     * The g11n collator to use.
     */
    collator: {
      default: () => new Intl.Collator(),
    },

    /**
     * Data table columns.
     */
    columns: Array as PropType<TDemoTableColumn[]>,

    /**
     * Data table rows.
     */
    rows: Array as PropType<TDemoTableRow[]>,

    /**
     * Table sorting info.
     */
    sortInfo: Object as PropType<TDemoSortInfo>,

    /**
     * `true` if the the table should support selection UI.
     */
    hasSelection: Boolean,

    /**
     * Number of items per page.
     */
    pageSize: Number,

    /**
     * `true` if the the table should use the compact version of the UI.
     */
    size: String,

    /**
     * The row number where current page start with, index that starts with zero.
     */
    start: {
      type: Number,
      default: 0,
    },

    /**
     * `true` if the zebra stripe should be shown.
     */
    zebra: Boolean,
  },

  data: (): {
    currentSortInfo?: TDemoSortInfo;
    currentStart?: number;
    currentPageSize?: number;
    selectedAll: boolean;
    uniqueId: string;
  } => ({
    /**
     * Number of items per page reflecting user-initiated changes.
     */
    currentPageSize: undefined,

    /**
     * The table sorting info reflecting user-initiated changes.
     */
    currentSortInfo: undefined,

    /**
     * The row number where current page start with reflecting user-initiated changes, index that starts with zero.
     */
    currentStart: undefined,

    /**
     * `true` if all rows are selected.
     */
    selectedAll: false,

    /**
     * Unique ID used for ID refs.
     */
    uniqueId: Math.random()
      .toString(36)
      .slice(2),
  }),

  computed: {
    /**
     * @returns A ID prefix for table selection checkbox names.
     */
    selectionId() {
      const { id: elementId, uniqueId } = this;
      return `__bx-ce-demo-data-table_${elementId || uniqueId}`;
    },

    /**
     * @returns The sorted/windowed rows.
     */
    rowsInUse() {
      const { rows, currentSortInfo, currentStart, currentPageSize = Infinity } = this;
      const { columnId: sortColumnId, direction: sortDirection } = currentSortInfo!;
      return sortDirection === TABLE_SORT_DIRECTION.NONE
        ? rows.slice(currentStart, currentStart! + currentPageSize!)
        : rows!
            .slice()
            .sort((lhs, rhs) => collationFactors[sortDirection] * (this as any).compare(lhs[sortColumnId!], rhs[sortColumnId!]))
            .slice(currentStart, currentStart! + currentPageSize!);
    },
  },

  watch: {
    pageSize(current: number) {
      this.currentPageSize = current;
    },

    sortInfo(current: TDemoSortInfo) {
      this.currentSortInfo = current;
    },

    start(current: number) {
      this.currentStart = current;
    },

    rows(current: TDemoTableRow[]) {
      this.selectedAll = current.every(row => row.selected!);
    },
  },

  filters: {
    /**
     * @param rowId A row ID.
     * @param hasSelection `true` if the table has selection support.
     * @param selectionId The unique ID of the table for selection.
     * @returns The checkbox ID for row selection.
     */
    filterRowSelectionId(rowId: string, hasSelection: boolean, selectionId: string) {
      return !hasSelection ? undefined : rowId && `${selectionId}_${rowId}`;
    },

    /**
     * @param column A table column.
     * @param sortInfo The table sorting options.
     * @returns The table sort direction of the given table column.
     */
    filterSortDirection(column: TDemoTableColumn, { columnId, direction }: TDemoSortInfo) {
      const { id, sortCycle } = column;
      if (!sortCycle) {
        return undefined;
      }
      return id === columnId ? direction : TABLE_SORT_DIRECTION.NONE;
    },
  },

  methods: {
    /**
     * @param lhs A value.
     * @param rhs Another value.
     * @returns
     *   * `0` if the given two values are equal
     *   * A negative value to sort `lhs` to an index lower than `rhs`
     *   * A positive value to sort `rhs` to an index lower than `lhs`
     */
    compare(lhs, rhs) {
      if (typeof lhs === 'number' && typeof rhs === 'number') {
        return lhs - rhs;
      }
      return (this as any).collator.compare(lhs, rhs);
    },

    /**
     * Handles an event to change in selection of rows, fired from `<bx-table-row>`.
     * @param event The event.
     */
    // @ts-ignore: Template-only ref
    handleChangeSelection({ defaultPrevented, detail, target }: CustomEvent) {
      if (!defaultPrevented) {
        const { rowId: changedRowId } = (target as HTMLElement).dataset;
        const { selected } = detail;
        this.rows!.forEach(row => {
          if (Number(changedRowId) === row.id) {
            row.selected = selected;
          }
        });
        this.selectedAll = this.rows!.every(row => row.selected!);
      }
    },

    /**
     * Handles an event to change in selection of all rows, fired from `<bx-table-header-row>`.
     * @param event The event.
     */
    handleChangeSelectionAll({ defaultPrevented, detail }: CustomEvent) {
      if (!defaultPrevented) {
        const { selected } = detail;
        this.rows!.forEach(row => {
          row.selected = selected;
        });
        this.selectedAll = selected;
      }
    },

    /**
     * Handles an event to sort rows, fired from `<bx-table-header-cell>`.
     * @param event The event.
     */
    handleChangeSort({ defaultPrevented, detail, target }: CustomEvent) {
      if (!defaultPrevented) {
        const { columnId } = (target as HTMLElement).dataset;
        const { sortDirection: direction } = detail;
        if (direction === TABLE_SORT_DIRECTION.NONE && columnId !== 'name') {
          // Resets the sorting, given non-primary sorting column has got in non-sorting state
          this.currentSortInfo = this.sortInfo;
        } else {
          // Sets the sorting as user desires
          this.currentSortInfo = {
            columnId: columnId!,
            direction,
          };
        }
      }
    },

    /**
     * Handles `bx-pagination-changed-current` event on the pagination UI.
     * @param event The event.
     */
    handleChangeStart({ detail }: CustomEvent) {
      this.currentStart = detail.start;
    },

    /**
     * Handles `bx-pages-select-changed` event on the pagination UI.
     * @param event The event.
     */
    handleChangePageSize({ detail }: CustomEvent) {
      this.currentPageSize = detail.value;
    },
  },

  created() {
    this.selectedAll = this.rows.every(row => row.selected!);
    this.currentSortInfo = this.sortInfo;
    this.currentStart = this.start;
    this.currentPageSize = this.pageSize;
  },

  template: `
    <div>
      <bx-table
        :size="size"
        @bx-table-row-change-selection="handleChangeSelection"
        @bx-table-change-selection-all="handleChangeSelectionAll"
        @bx-table-header-cell-sort="handleChangeSort"
      >
        <bx-table-head>
          <bx-table-header-row
            :selected="selectedAll"
            :selection-name="!hasSelection ? undefined : selectionId"
            :selection-value="!hasSelection ? undefined : selectionId"
          >
            <bx-table-header-cell
              v-for="column in columns"
              :key="column.id"
              :data-column-id="column.id"
              :sort-cycle="column.sortCycle"
              :sort-direction="column | filterSortDirection(sortInfo)"
            >
              {{ column.title }}
            </bx-table-header-cell>
          </bx-table-header-row>
        </bx-table-head>
        <bx-table-body :zebra="zebra">
          <bx-table-row
            v-for="row in rowsInUse"
            :key="row.id"
            :data-row-id="row.id"
            :selected="hasSelection && row.selected"
            :selection-name="row.id | filterRowSelectionId(hasSelection, selectionId)"
            :selection-value="!hasSelection ? undefined : 'selected'"
          >
            <bx-table-cell v-for="column in columns" :key="column.id">{{ row[column.id] }}</bx-table-cell>
          </bx-table-row>
        </bx-table-body>
      </bx-table>
      <bx-pagination
        v-if="pageSize !== undefined"
        :pageSize="pageSize"
        :start="start"
        :total="rows.length"
        @bx-pagination-changed-current="handleChangeStart"
        @bx-page-sizes-select-changed="handleChangePageSize"
      >
        <bx-page-sizes-select slot="page-sizes-select">
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
        </bx-page-sizes-select>
        <bx-pages-select></bx-pages-select>
      </bx-pagination>
    </div>
  `,
});

const sizes = {
  [`Compact size (${TABLE_SIZE.COMPACT})`]: TABLE_SIZE.COMPACT,
  [`Short size (${TABLE_SIZE.SHORT})`]: TABLE_SIZE.SHORT,
  [`Regular size (${TABLE_SIZE.REGULAR})`]: TABLE_SIZE.REGULAR,
  [`Tall size (${TABLE_SIZE.TALL})`]: TABLE_SIZE.TALL,
};

const createProps = ({ sortable }: { sortable?: boolean } = {}) => {
  const hasSelection = sortable && boolean('Supports selection feature (hasSelection)', false);
  return {
    hasSelection,
    size: select('Table size (size)', sizes, TABLE_SIZE.REGULAR),
    zebra: boolean('Supports zebra stripe (zebra in `<bx-table-body>`)', false),
  };
};

storiesOf('Data table', module)
  .addDecorator(withKnobs)
  .add('Default', () => ({
    template: `
      <bx-table :size="size">
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
        <bx-table-body :zebra="zebra">
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
    ...createVueBindingsFromProps(createProps()),
  }))
  .add('Sortable', () => {
    const { props = {}, methods = {} } = createVueBindingsFromProps(createProps({ sortable: true }));
    return {
      template: `
        <!-- Refer to <bx-ce-demo-data-table> implementation at the top for details -->
        <bx-ce-demo-data-table
          :rows="demoRows"
          :columns="demoColumns"
          :sortInfo="demoSortInfo"
          :hasSelection="hasSelection"
          :size="size"
          :zebra="zebra"
          @bx-table-row-change-selection="onBeforeChangeSelection"
          @bx-table-change-selection-all="onBeforeChangeSelection"
          @bx-table-header-cell-sort="onBeforeChangeSort"
        ></bx-ce-demo-data-table>
      `,
      data: () => ({
        demoRows,
        demoColumns,
        demoSortInfo,
      }),
      props,
      methods: (originalMethods => {
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
          ...originalMethods,
          onBeforeChangeSelection,
          onBeforeChangeSort,
        };
      })(methods),
    };
  })
  .add('Sortable with pagination', () => {
    const { props = {}, methods = {} } = createVueBindingsFromProps(createProps({ sortable: true }));
    return {
      template: `
        <!-- Refer to <bx-ce-demo-data-table> implementation at the top for details -->
        <bx-ce-demo-data-table
          :rows="demoRows"
          :columns="demoColumns"
          :sortInfo="demoSortInfo"
          :hasSelection="hasSelection"
          :pageSize="5"
          :size="size"
          :start="0"
          :zebra="zebra"
          @bx-table-row-change-selection="onBeforeChangeSelection"
          @bx-table-change-selection-all="onBeforeChangeSelection"
          @bx-table-header-cell-sort="onBeforeChangeSort"
        ></bx-ce-demo-data-table>
      `,
      data: () => ({
        demoRows: demoRowsMany,
        demoColumns,
        demoSortInfo,
      }),
      props,
      methods: (originalMethods => {
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
          ...originalMethods,
          onBeforeChangeSelection,
          onBeforeChangeSort,
        };
      })(methods),
    };
  });
