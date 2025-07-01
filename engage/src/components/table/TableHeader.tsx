import React from 'react';
import Icons from '../icons/Icons';
import Checkbox from '../checkbox/Checkbox';
import type { Column, SelectProps, SortingProps } from './types';

interface TableHeaderProps {
  tableHeaderCustomclasses?: string;
  coloumns: Column[];
  sorting?: SortingProps;
  selectProps?: SelectProps;
  allChecked?: boolean;
  selectAllCb?: () => void;
  getVarient?: () => string;
}

const TableHeader: React.FC<TableHeaderProps> = ({ 
  tableHeaderCustomclasses = '', 
  coloumns, 
  sorting, 
  selectProps = { isSelectAll: false, selectIdentifier: "" }, 
  allChecked, 
  selectAllCb = () => { }, 
//   getVarient 
}) => {
	const { isSortable = false, onSortChangeCb } = sorting || {};

	return (
		<thead className={`bg-gray-50 border-b border-gray-200 ${tableHeaderCustomclasses}`}>
			<tr>
				{selectProps.isSelectAll ? (
					<th scope="col" className={`text-left px-6 py-3 font-medium text-gray-900`}>
						<Checkbox checked={allChecked} onChangeCb={selectAllCb} />
					</th>
				) : null}
				{
					coloumns.map((col, index) => {
						return <React.Fragment key={"table-column-" + index} >
							{isSortable ? (
								<th scope="col" className={`text-left px-6 py-3 font-medium text-gray-900`}>
									{col.label}
									{col.sort ? (
										<span
											className='inline-block ml-2 cursor-pointer'
											onClick={() => onSortChangeCb?.(col.sort!)}>
											<Icons iconName="sortingIcon" />
										</span>
									) : null}
								</th>) : (
								<th scope="col" className={`text-left px-6 py-3 font-medium text-gray-900`}>
									{col.label}
								</th>
							)}
						</React.Fragment>
					})
				}
			</tr>
		</thead>
	)
}

export default TableHeader; 