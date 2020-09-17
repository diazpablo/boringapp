import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from 'reselect';
import http from "../services/httpService";
import { order, paginate, search } from "../utils/helpers";

const slice = createSlice({
	name: 'activities',
	initialState: {
		loading: false,
		searchValue: '',
		searchBy: { key: 'activity', label: "Name" },
		sortColumn: { key: 'activity', order: 'asc' },
		list: [],
		countedActivities: 0,
		types: [],
		pageSize: 10,
		pageNumber: 0,
		dialogActivity: null
	},
	reducers: {
		activitiesRequested: activities => {
			activities.loading = true;
		},
		activitiesReceived: (activities, action) => {
			activities.list = action.payload.activities;
			activities.loading = false;
		},
		activitiesRequestFailed: activities => {
			activities.loading = false;
		},
		activityCreateRequest: activities => {
			activities.loading = true;
		},
		activityCreated: (activities, action) => {
			activities.list = [ action.payload.activity, ...activities.list ];
			activities.loading = false;
		},
		activityCreateFailed: activities => {
			activities.loading = false;
		},
		dialogActivitySelected: (activities, action) => {
			activities.loading = false;
			activities.dialogActivity = action.payload.activity;
		},
		activitiesCounted: (activities, action) => {
			activities.countedActivities = action.payload.count;
		},
		pageNumberSetted: (activities, action) => {
			activities.pageNumber = action.payload.pageNumber;
		},
		pageSizeSetted: (activities, action) => {
			activities.pageSize = action.payload.pageSize;
		},
		searchValueSetted: (activities, action) => {
			activities.searchValue = action.payload.searchValue;
		},
		sortColumnSetted: (activities, action) => {
			activities.sortColumn = action.payload.sortColumn;
		},
		typesRequested: activities => {
			activities.loading = true;
		},
		typesReceived: (activities, action) => {
			activities.types = action.payload.types;
			activities.loading = false;
		},
		typesRequestFailed: activities => {
			activities.loading = false;
		},
	}
})

const {
	typesRequested, typesReceived, typesRequestFailed,
	activitiesRequested, activitiesReceived, activitiesRequestFailed, activitiesCounted,
	dialogActivitySelected,
	activityCreateRequest, activityCreated, activityCreateFailed,
	pageNumberSetted, pageSizeSetted,
	searchValueSetted, sortColumnSetted
} = slice.actions;
export default slice.reducer;

/**
 * Actions Creators
 *
 **/
const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3900";
const apiActivityEndpoint = apiUrl + '/activity';
const apiTypesEndpoint = apiUrl + '/types';
if (process.env.NODE_ENV === "development") {
	console.log('apiActivityEndpoint', apiActivityEndpoint);
	console.log('apiTypesEndpoint', apiTypesEndpoint);
}

// Types Creators 
export const getTypes = () => async (dispatch) => {
	dispatch(typesRequested({}));

	try {
		const { data: types } = await http.get(`${apiTypesEndpoint}`);

		dispatch(typesReceived({ types }));
	} catch (err) {
		console.log(err.message);
		dispatch(typesRequestFailed({}));

	}
};
// End Types Creators

// Activities Creators
export const getRandomActivity = () => async (dispatch) => {
	dispatch(activitiesRequested({}));
	try {
		const { data: activities } = await http.get(apiActivityEndpoint);
		dispatch(dialogActivitySelected({ activity: activities[0] }));
	} catch (e) {
		console.error(e.message);
		dispatch(activityCreateFailed)
	}
}

export const setDialogActivity = activity => dialogActivitySelected({ activity });

export const getActivities = (activitiesToGet = 10, onlyNew = false) => async (dispatch, getState) => {
	dispatch(activitiesRequested({}));

	const { data: totalActivities } = await http.get(`${apiActivityEndpoint}/list`);
	dispatch(activitiesCounted({ count: totalActivities.length }));

	try {
		const oldActivities = [ ...getState().activities.list ];
		let newActivities = [];
		if (!onlyNew) {

			// Get 'activitiesToGet' random Activities
			const { data } = await http.get(`${apiActivityEndpoint}/list/${activitiesToGet}`);
			newActivities = data;
		} else {

			// Get 'activitiesToGet' new Activities
			while (newActivities.length < activitiesToGet && (oldActivities.length + newActivities.length < totalActivities.length)) {
				const { data: newActivity } = await http.get(apiActivityEndpoint);
				const { id } = newActivity[0];
				if ([ ...oldActivities, ...newActivities ].filter(a => a.id === id).length === 0) {
					newActivities.push(newActivity[0]);
				}
			}
		}

		const activities = [ ...oldActivities, ...newActivities ];
		dispatch(activitiesReceived({ activities }));

	} catch (err) {
		console.log(err.message);
		dispatch(activitiesRequestFailed({}));

	}
};

export const createActivity = formaData => async (dispatch) => {
	dispatch(activityCreateRequest({}));

	try {
		const { data: activity } = await http.post(apiActivityEndpoint, formaData, { headers: { 'Content-Type': "multipart/form-data" } });
		dispatch(activityCreated({ activity }))
	} catch (e) {
		console.error(e.message);
		dispatch(activityCreateFailed({}));
	}
}

// End Activities Creators

// Sort, Search and Paginate Actions Creators
export const setSortColumn = sortColumn => sortColumnSetted({ sortColumn });
export const setSearchValue = searchValue => searchValueSetted({ searchValue });
export const setPageNumber = pageNumber => pageNumberSetted({ pageNumber });
export const setPageSize = pageSize => pageSizeSetted({ pageSize });
// End Sort, Search and Paginate Actions Creators

/**
 * Selectors
 **/

export const getLikedActivities = createSelector(
	state => state.activities.list,
	state => state.activities.sortColumn,
	state => state.auth.user,
	(activities, sortColumn, user) => order(activities.filter(a => user && user.likedActivities && user.likedActivities.includes(a._id)), sortColumn.key, sortColumn.order)
)

export const getCountedSearchActivities = createSelector(
	state => state.list,
	state => state.sortColumn,
	state => state.searchValue,
	state => state.searchBy,
	(activities, sortColumn, searchValue, searchBy) => {
		const sorted = order(activities, sortColumn.key, sortColumn.order);
		return search(sorted, searchBy.key, searchValue).length
	}
);

export const getPaginatedActivities = createSelector(
	state => state.list,
	state => state.sortColumn,
	state => state.searchValue,
	state => state.searchBy,
	state => state.pageSize,
	state => state.pageNumber,
	(activities, sortColumn, searchValue, searchBy, pageSize, pageNumber) => {
		const sorted = order(activities, sortColumn.key, sortColumn.order);
		const searched = search(sorted, searchBy.key, searchValue);
		return paginate(searched, pageNumber, pageSize);
	}
)