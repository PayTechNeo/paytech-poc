import React from 'react'
import Checkbox from '../checkbox/Checkbox'
import General from '../../utils/General'
import type { Column, SelectProps } from './types'

interface TableBodyProps {
  coloumns: Column[];
  rows: any[];
  selectProps: SelectProps;
  setSelectedRows: (rows: any[]) => void;
  selectedRows: any[];
  getVarient: () => string;
}

const TableBody: React.FC<TableBodyProps> = ({ 
  coloumns, 
  rows, 
  selectProps, 
  setSelectedRows, 
  selectedRows, 
  getVarient 
}) => {
	const onToggleCb = (object: any) => {
		const updatedArray = General.toggleObjectInArray(selectedRows, object, selectProps.selectIdentifier)
		setSelectedRows(updatedArray)
	}

	return <tbody>
		{rows.map((row, index) => {
			return <tr className="bg-white border-b border-gray-200 hover:bg-gray-50" key={'table-row' + index}>
				{selectProps.isSelectable ? (
					<td className={`${getVarient()}`}>
						<Checkbox checked={selectedRows.some(selectedRw => selectedRw[selectProps.selectIdentifier] === row[selectProps.selectIdentifier])} onChangeCb={() => onToggleCb(row)} />
					</td>) : null}
				{coloumns.map((col, index) => {
					return <td key={'table-row' + index} className={`max-w-[300px] ${getVarient()} ${col?.color || ''}`}>{col.renderLogic?.(row)}</td>
				})}
			</tr>
		})}
	</tbody>
}

export default TableBody; 