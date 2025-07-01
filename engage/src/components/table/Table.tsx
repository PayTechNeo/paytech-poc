import React, { useEffect, useState } from 'react'
import { TableBody, TableHeader } from '.';
import Pagination from '../Pagination/index';
import { Column, SelectProps, PaginationProps, TableProps, SortingProps } from './types';

const VARIANTS = {
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
} as const;

const Table: React.FC<TableProps> = ({ 
  selectProps = { 
    isSelectAll: false, 
    onSelectAll: () => { }, 
    isSelectable: false, 
    onSelectRowsCb: () => { }, 
    selectIdentifier: "" 
  }, 
  coloumns, 
  rows = [], 
  sorting, 
  paginationProps = {
    isPagination: false,
    onPageChange: () => { }
  }, 
  variant = 'md', 
  tableHeaderCustomclasses 
}) => {

  const [selectedRows, setSelectedRows] = useState<any[]>([])

  useEffect(() => {
    if (selectProps.onSelectRowsCb) {
      selectProps.onSelectRowsCb(selectedRows);
    }
  }, [selectedRows, selectProps])

  const getVarient = (): string => {
    switch (variant) {
      case VARIANTS.SM:
        return 'px-4 py-[8px]';
      case VARIANTS.MD:
        return 'px-6 py-4';
      default:
        return 'px-6 py-4';
    }
  };

  const selectAllCb = () => {
    if (selectProps?.onSelectAll) {
      selectProps.onSelectAll([]);
    }

    if (selectedRows.length === rows.length) {
      return setSelectedRows([])
    }
    setSelectedRows(rows)
  }

  useEffect(() => {
    if (!selectProps?.isSelectAll) {
      setSelectedRows([])
    }
  }, [selectProps?.isSelectAll])

  return (
    <div className='flex flex-1 flex-col justify-between w-full'>
      <table className='w-full border border-gray-200 rounded-lg overflow-hidden'>
        <TableHeader 
          selectProps={selectProps} 
          selectAllCb={selectAllCb} 
          coloumns={coloumns} 
          sorting={sorting} 
          allChecked={selectedRows.length === rows.length} 
          getVarient={getVarient} 
          tableHeaderCustomclasses={tableHeaderCustomclasses} 
        />
        {rows?.length > 0 ?
          <TableBody 
            selectedRows={selectedRows} 
            setSelectedRows={setSelectedRows} 
            selectProps={selectProps} 
            coloumns={coloumns} 
            rows={rows} 
            getVarient={getVarient} 
          />
          : <tbody>
            <tr>
              <td colSpan={coloumns.length} className="text-center py-4 text-gray-500 font-bold">
                No data found!
              </td>
            </tr>
          </tbody>}
      </table>
      {paginationProps?.isPagination && rows?.length ? 
        <Pagination 
          totalCount={paginationProps.totalCount} 
          limit={paginationProps.limit} 
          onPageChangeCb={paginationProps.onPageChange || (() => {})} 
        /> 
        : null}
    </div>
  )
};

export default Table; 