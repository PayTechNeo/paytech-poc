import React from 'react'
import Checkbox from '../checkbox/Checkbox'
import type { Column, SelectProps } from './types'

interface TableBodyProps<T extends Record<string, unknown>> {
  selectedRows: T[];
  setSelectedRows: React.Dispatch<React.SetStateAction<T[]>>;
  selectProps?: SelectProps<T>;
  coloumns: Column<T>[];
  rows: T[];
  getVarient: () => string;
}

const TableBody = <T extends Record<string, unknown>>({
  selectedRows,
  setSelectedRows,
  selectProps = { isSelectAll: false, selectIdentifier: "" },
  coloumns,
  rows,
  getVarient
}: TableBodyProps<T>) => {
  const isRowSelected = (row: T) =>
    selectedRows.some(
      (selectedRow) =>
        selectProps.selectIdentifier &&
        selectedRow[selectProps.selectIdentifier] === row[selectProps.selectIdentifier]
    );

  const handleRowSelect = (row: T) => {
    if (isRowSelected(row)) {
      setSelectedRows(selectedRows.filter(
        (selectedRow) =>
          selectedRow[selectProps.selectIdentifier] !== row[selectProps.selectIdentifier]
      ));
    } else {
      setSelectedRows([...selectedRows, row]);
    }
  };

  return <tbody>
    {rows.map((row, rowIndex) => {
      return <tr className="bg-white border-b border-gray-200 hover:bg-gray-50" key={'table-row' + rowIndex}>
        {selectProps.isSelectAll ? (
          <td className={`${getVarient()}`}>
            <Checkbox checked={isRowSelected(row)} onChangeCb={() => handleRowSelect(row)} />
          </td>) : null}
        {coloumns.map((col, colIndex) => {
          return <td key={'table-row' + colIndex} className={`max-w-[300px] ${getVarient()} ${col?.color || ''}`}>{col.renderLogic?.(row)}</td>
        })}
      </tr>
    })}
  </tbody>
}

export default TableBody; 