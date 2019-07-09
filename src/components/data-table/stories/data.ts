import { TABLE_SORT_DIRECTION } from '../table-header-cell';
import { TDemoTableColumn, TDemoTableRow, TDemoSortInfo } from './types';

export const columns: TDemoTableColumn[] = [
  {
    id: 'name',
    title: 'Name',
    sortCycle: 'bi-states-from-ascending',
  },
  {
    id: 'protocol',
    title: 'Protocol',
  },
  {
    id: 'port',
    title: 'Port',
    sortCycle: 'tri-states-from-ascending',
  },
  {
    id: 'rule',
    title: 'Rule',
  },
  {
    id: 'attachedGroups',
    title: 'Attached Groups',
  },
  {
    id: 'status',
    title: 'Status',
  },
];

export const rows: TDemoTableRow[] = [
  {
    id: 1,
    name: 'Load Balancer 1',
    protocol: 'HTTP',
    port: 80,
    rule: 'Round Robin',
    attachedGroups: "Maureen's VM Groups",
    status: 'Active',
  },
  {
    id: 2,
    name: 'Load Balancer 2',
    protocol: 'HTTPS',
    port: 443,
    rule: 'Round Robin',
    attachedGroups: "Maureen's VM Groups",
    status: 'Active',
  },
  {
    id: 3,
    selected: true,
    name: 'Load Balancer 3',
    protocol: 'HTTP',
    port: 80,
    rule: 'Round Robin',
    attachedGroups: "Maureen's VM Groups",
    status: 'Active',
  },
];

export const sortInfo: TDemoSortInfo = {
  columnId: 'name',
  direction: TABLE_SORT_DIRECTION.ASCENDING,
};
