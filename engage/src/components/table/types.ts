import React from 'react';

export interface Column<T = unknown> {
  field: string;
  label: React.ReactNode;
  renderLogic?: (row: T) => React.ReactNode;
  color?: string;
  sort?: string;
}

export interface SelectProps<T = unknown> {
  isSelectAll?: boolean;
  onSelectAll?: (rows: T[]) => void;
  isSelectable?: boolean;
  onSelectRowsCb?: (rows: T[]) => void;
  selectIdentifier: string;
}

export interface SortingProps {
  isSortable?: boolean;
  onSortChangeCb?: (sort: string) => void;
}

export interface PaginationProps {
  isPagination?: boolean;
  totalCount?: number;
  limit?: number;
  onPageChange?: (page: number) => void;
}

export interface TableProps<T = unknown> {
  selectProps?: SelectProps<T>;
  coloumns: Column<T>[];
  rows?: T[];
  sorting?: SortingProps;
  paginationProps?: PaginationProps;
  variant?: 'sm' | 'md' | 'lg';
  tableHeaderCustomclasses?: string;
  isPagination?: boolean;
} 