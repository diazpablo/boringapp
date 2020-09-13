import React from 'react';
import PropTypes from 'prop-types';
import Table from "./common/table";
import Like from "./common/like";
import styled, { css } from "styled-components";

const imageCellStyles = css`
	width: 15%;
	max-height: 80px;
	padding: 0;
`;
const activityCellStyles = css`
	width: 30%;
`;

const ActivityImage = styled.img`
	display: block;
	object-fit: cover;
	object-position: center;
	max-width: 100%;
	max-height: 100%;
`

const ActivitiesTable = (props) => {
	const {
		activities, sortColumn, onSort, onLike,
		totalCount, pageNumber, pageSize, setPageNumber, setPageSize
	} = props;

	const columns = [
		{
			key: 'imageUrl',
			contentCellStyles: imageCellStyles,
			content: activity => (
				<ActivityImage
					alt={activity.activity}
					src={activity.imageUrl}
				/>
			)
		},
		{ key: 'activity', label: 'Activity name', contentCellStyles: activityCellStyles },
		{ key: 'accessibility', label: 'Accessibility' },
		{ key: 'type', label: 'Type' },
		{ key: 'participants', label: 'Participants' },
		{ key: 'price', label: 'Price' },
		{ key: 'like', content: activity => <Like liked={activity.liked} onClick={() => onLike(activity)} /> }
	];

	return (
		<Table
			data={activities}
			columns={columns}
			sortColumn={sortColumn}
			onSort={onSort}
			pagination={{
				totalCount,
				pageNumber,
				pageSize,
				setPageNumber,
				setPageSize,
			}}
		/>
	);
};

ActivitiesTable.propTypes = {
	activities: PropTypes.array.isRequired,
	sortColumn: PropTypes.object.isRequired,
	onSort: PropTypes.func.isRequired,
	onLike: PropTypes.func.isRequired,
	totalCount: PropTypes.number.isRequired,
	pageNumber: PropTypes.number.isRequired,
	pageSize: PropTypes.number.isRequired,
	setPageNumber: PropTypes.func.isRequired,
	setPageSize: PropTypes.func.isRequired
}

export default ActivitiesTable;
