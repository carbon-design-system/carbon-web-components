import { TABLE_SORT_DIRECTION } from '../table-header-cell';

/**
 * Example data structure of data table column.
 */
export type TDemoTableColumn = {
  id: string;
  title: string;
  sortCycle?: string;
};

/**
 * Example data structure of data table row.
 */
export type TDemoTableRow = {
  id: number;
  selected?: boolean;
  [key: string]: any;
};

/**
 * Example structure of table sorting info.
 */
export type TDemoSortInfo = {
  columnId: string;
  direction: TABLE_SORT_DIRECTION;
};
