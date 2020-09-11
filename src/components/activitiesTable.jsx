import React from 'react';
import PropTypes from 'prop-types';
import Table from "./common/table";

const ActivitiesTable = ({ activities, sortColumn, onSort }) => {
	const columns = [
		{ key: 'activity', label: 'Activity name' },
		{ key: 'accessibility', label: 'Accessibility' },
		{ key: 'type', label: 'Type' },
		{ key: 'participants', label: 'Participants' },
		{ key: 'price', label: 'Price' },
		{
			key: 'imageUrl', label: null, content: activity => (
				<img
					alt={activity.activity}
					style={{
						objectFit: 'cover',
						objectPosition: 'center',
						maxWidth: '100%',
						maxHeight: '100%',
					}}
					src={activity.imageUrl} />
			)
		}
	];
	console.log("activitiesTable", activities);

	return (
		<Table
			data={activities}
			columns={columns}
			sortColumn={sortColumn}
			onSort={onSort}
		/>
	);
};

ActivitiesTable.propTypes = {
	activities: PropTypes.array.isRequired,
	sortColumn: PropTypes.object.isRequired,
	onSort: PropTypes.func.isRequired
}

export default ActivitiesTable;
