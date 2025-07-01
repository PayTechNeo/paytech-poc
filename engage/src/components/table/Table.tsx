import React, { useEffect, useState } from 'react'
import TableHeader from './TableHeader'
import TableBody from './TableBody'
import Pagination from '../Pagination/index';
import type { TableProps } from './types';

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
        return 'px-2 sm:px-4 py-2';
      case VARIANTS.MD:
        return 'px-3 sm:px-6 py-3 sm:py-4';
      default:
        return 'px-3 sm:px-6 py-3 sm:py-4';
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
      <div className="overflow-x-auto">
        <table className='w-full border border-gray-200 rounded-lg overflow-hidden min-w-full'>
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
                <td colSpan={coloumns.length} className="text-center py-4 text-gray-500 font-bold text-sm sm:text-base">
                  No data found!
                </td>
              </tr>
            </tbody>}
        </table>
      </div>
      {paginationProps?.isPagination && rows?.length ? 
        <div className="mt-4">
          <Pagination 
            totalCount={paginationProps.totalCount} 
            limit={paginationProps.limit} 
            onPageChangeCb={paginationProps.onPageChange || (() => {})} 
          /> 
        </div>
        : null}
    </div>
  )
};

export default Table; 