import React from 'react';
import PropTypes from "prop-types";
import { TableContainer, Table, TablePagination } from "@material-ui/core";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const CommonTable = (props) => {
	const {
		data, columns, sortColumn, onSort, pagination
	} = props;


	const getPagination = () => {
		if (pagination && pagination.totalCount > pagination.pageSize) {
			const {
				pageNumber, pageSize, setPageNumber, setPageSize, totalCount
			} = pagination;

			return <TablePagination
				component="div"
				count={totalCount}
				page={pageNumber}
				onChangePage={(event, newPage) =>
					setPageNumber(newPage)
				}
				rowsPerPage={pageSize}
				onChangeRowsPerPage={(event) => {
					setPageSize(parseInt(event.target.value, 10));
					setPageNumber(0);
				}}
			/>
		}
		return null;
	}

	return (
		<TableContainer>
			<Table size='small'>
				<TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />
				<TableBody data={data} columns={columns} />
			</Table>
			{getPagination()}
		</TableContainer>);
};

CommonTable.propTypes = {
	data: PropTypes.array.isRequired,
	columns: PropTypes.array.isRequired,
	sortColumn: PropTypes.object.isRequired,
	onSort: PropTypes.func.isRequired,
	pagination: PropTypes.oneOfType([ PropTypes.bool, PropTypes.object ]),
}


export default CommonTable;
