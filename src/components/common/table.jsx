import React from 'react';
import PropTypes from "prop-types";
import { TableContainer, Table } from "@material-ui/core";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const CommonTable = ({ data, columns, sortColumn, onSort }) => {
	console.log("CommonTable", data);

	return (
		<TableContainer>
			<Table size='small'>
				<TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />
				<TableBody data={data} columns={columns} />
			</Table>
		</TableContainer>
	);
};

Table.propTypes = {
	data: PropTypes.array.isRequired,
	columns: PropTypes.array.isRequired,
	sortColumn: PropTypes.object.isRequired,
	onSort: PropTypes.func.isRequired
}


export default CommonTable;
