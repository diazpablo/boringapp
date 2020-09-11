import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { TableBody, TableCell, TableRow } from "@material-ui/core";

const CustomTableBody = ({ data, columns }) => {
	const renderCell = (item, column) => {
		if (column.content) return column.content(item);
		return _.get(item, column.key);
	}

	const createKey = (item, column) => item.id + column.key;
	console.log("tableBody", data);
	return data ? (
		<TableBody>
			{data.map((row, i) => (
				<TableRow key={i} component="td" scope="row">
					{columns.map(column => (
						<TableCell key={createKey(row, column)}>{renderCell(row, column)}</TableCell>
					))}
				</TableRow>
			))}
		</TableBody>
	) : null;
};

TableBody.propTypes = {
	data: PropTypes.array.isRequired,
	columns: PropTypes.array.isRequired
}

export default CustomTableBody;
