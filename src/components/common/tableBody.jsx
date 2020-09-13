import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import styled from "styled-components";
import { TableBody, TableCell, TableRow } from "@material-ui/core";

const TableCellStyled = styled(TableCell)`
	${props => props.styles};
`

const CustomTableBody = ({ data, columns }) => {
	const renderCell = (item, column) => {
		if (column.content) return column.content(item);
		return _.get(item, column.key);
	}

	const createKey = (item, column) => item.id + column.key;

	return (
		<TableBody>
			{data.map((row, i) => (
				<TableRow key={i} component="tr" scope="row">
					{columns.map(column => (
						<TableCellStyled
							styles={column.contentCellStyles}
							key={createKey(row, column)}
						>
							{renderCell(row, column)}
						</TableCellStyled>
					))}
				</TableRow>
			))}
		</TableBody>
	);
};

CustomTableBody.propTypes = {
	data: PropTypes.array.isRequired,
	columns: PropTypes.array.isRequired
}

export default CustomTableBody;
