import React from 'react';
import { connect } from "react-redux";
import { likeActivity } from '../store/auth';
import {
	setPageNumber, setPageSize, setSortColumn,
	getPaginatedActivities, getCountedSearchActivities
} from '../store/activities';
import Table from "./common/table";
import Like from "./common/like";
import { css } from "styled-components";

const imageCellStyles = css`
	width: 15%;
	padding: 0;
	position: relative;
	> img {
		display: block;
		object-fit: cover;
		object-position: center;
		width: 100%;
		height: 100%;
		max-height: 100px;
	}
`;
const activityCellStyles = css`
	width: 30%;
`;
const ActivitiesTable = (props) => {
	const {
		user,
		activities, sortColumn, setSortColumn, likeActivity,
		totalCount, pageNumber, setPageNumber, pageSize, setPageSize
	} = props;

	const columns = [
		{
			key: 'imageUrl',
			contentCellStyles: imageCellStyles,
			content: activity => (
				<img
					alt={activity.activity}
					src={activity.imageUrl}
				/>
			)
		},
		{ key: 'activity', label: 'Activity name', contentCellStyles: activityCellStyles },
		{ key: 'accessibility', label: 'Accessibility' },
		{ key: 'type.name', label: 'Type' },
		{ key: 'participants', label: 'Participants' },
		{ key: 'price', label: 'Price' }
	];

	const likeColumn = {
		key: 'like',
		content: activity => user ?
			<Like liked={user.likedActivities && user.likedActivities.indexOf(activity.id) > -1} onClick={() => likeActivity(activity)} /> : null
	};

	if (user) {
		columns.push(likeColumn);
	}

	const onSort = sort => setSortColumn(sort);

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

const mapStateToProps = ({ activities, auth }) => ({
	pageNumber: activities.pageNumber,
	pageSize: activities.pageSize,
	totalCount: getCountedSearchActivities(activities),
	sortColumn: activities.sortColumn,
	activities: getPaginatedActivities(activities),
	user: auth.user
})

const mapDispatchToProps = {
	setPageNumber,
	setPageSize,
	setSortColumn,
	likeActivity
}

export default connect(mapStateToProps, mapDispatchToProps)(ActivitiesTable);
