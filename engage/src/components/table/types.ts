import React from 'react';

export interface Column {
  field: string;
  label: React.ReactNode;
  renderLogic?: (row: any) => React.ReactNode;
  color?: string;
  sort?: string;
}

export interface SelectProps {
  isSelectAll?: boolean;
  onSelectAll?: (rows: any[]) => void;
  isSelectable?: boolean;
  onSelectRowsCb?: (rows: any[]) => void;
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

export interface TableProps {
  selectProps?: SelectProps;
  coloumns: Column[];
  rows?: any[];
  sorting?: SortingProps;
  paginationProps?: PaginationProps;
  variant?: 'sm' | 'md' | 'lg';
  tableHeaderCustomclasses?: string;
  isPagination?: boolean;
} 