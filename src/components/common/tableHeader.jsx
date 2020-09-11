import React from 'react';
import PropTypes from 'prop-types';
import { TableHead, TableRow, TableCell, TableSortLabel } from "@material-ui/core";

const TableHeader = ({ columns, sortColumn, onSort }) => {

	const raiseSort = key => {
		let newSortColumn = { ...sortColumn, key };
		if (sortColumn.key === key) {
			newSortColumn.order = (sortColumn.order === 'asc') ? 'desc' : 'asc';
		} else {
			newSortColumn.order = 'asc';
		}
		onSort(newSortColumn);
	}

	return (
		<TableHead>
			<TableRow>
				{columns.map(column => (
					<TableCell key={column.key} role="button" onClick={() => raiseSort(column.key)}>
						{column.label && <TableSortLabel
							active={column.key === sortColumn.key}
							onClick={() => raiseSort(column.key)}
							direction={sortColumn.order}
						>
							{column.label}
						</TableSortLabel>}
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
};

TableHeader.propTypes = {
	columns: PropTypes.array.isRequired,
	sortColumn: PropTypes.object.isRequired,
	onSort: PropTypes.func.isRequired
}

export default TableHeader;
