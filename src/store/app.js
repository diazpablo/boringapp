import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
	name: 'app',
	initialState: {
		loading: false,
		drawerElement: null
	},
	reducers: {
		drawerElementSetted: (app, action) => {
			app.drawerElement = action.payload.element;
		}
	}
});

const { drawerElementSetted } = slice.actions;
export default slice.reducer;

/**
 * Actions Creators
 *
 **/
export const setDrawerElement = element => drawerElementSetted({ element })