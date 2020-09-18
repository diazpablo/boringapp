import { createSlice } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";
import http from "../services/httpService";

const slice = createSlice({
	name: 'auth',
	initialState: {
		loginDialog: false,
		loginError: null,
		loading: false,
		user: null,
	},
	reducers: {
		loginDialogSetted: (auth, action) => {
			auth.loginDialog = action.payload.loginDialog;
		},
		userLoginInit: auth => {
			auth.loading = true;
			auth.loginError = null;
		},
		userLogged: (auth, action) => {
			auth.loading = false;
			auth.user = action.payload.user;
		},
		userLoginFailed: (auth, action) => {
			auth.loading = false;
			auth.loginError = action.payload.error;
		},
		userLoggedOut: auth => {
			auth.user = null;
		},
		activityLikedRequested: auth => {
			auth.loading = true;
		},
		activityLikedSuccess: (auth, action) => {
			auth.user = action.payload.user;
			auth.loading = false;
		},
		activityLikedFailed: auth => {
			auth.loading = false;
		}
	}
});

const {
	loginDialogSetted, userLoginInit, userLogged, userLoginFailed, userLoggedOut,
	activityLikedRequested, activityLikedFailed, activityLikedSuccess
} = slice.actions;
export default slice.reducer;

/**
 * Actions Creators
 *
 **/

// Login Dialog
export const setLoginDialog = loginDialog => loginDialogSetted({ loginDialog });

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3900";

const apiAuthEndpoint = apiUrl + '/auth';
const apiUsersEndpoint = apiUrl + '/users';
if (process.env.NODE_ENV === "development") {
	console.log('apiAuthEndpoint', apiAuthEndpoint);
	console.log('apiUsersEndpoint', apiUsersEndpoint);
}

const tokenKey = "token";
http.setJwt(localStorage.getItem(tokenKey));

export const loginUser = (email, password) => async (dispatch) => {
	dispatch(userLoginInit({}));
	try {
		const { data: jwt } = await http.post(apiAuthEndpoint, { email, password });
		localStorage.setItem(tokenKey, jwt);
		const user = jwtDecode(jwt);
		dispatch(userLogged({ user }));
		window.location.reload();
	} catch (ex) {
		let error = null;
		if (ex.response && ex.response.status)
			error = "Invalid mail or password."
		else
			console.error(ex.message);
		dispatch(userLoginFailed({ error }));
	}
}

export const logoutUser = () => async (dispatch) => {
	await localStorage.removeItem(tokenKey);
	dispatch(userLoggedOut({}));
	// window.location.reload();
}

export const getUser = () => async (dispatch) => {
	const jwt = await localStorage.getItem(tokenKey);
	if (jwt) {
		const user = jwtDecode(jwt);
		if (user) {
			dispatch(userLoginInit({}));
			try {
				const { data: likedActivities } = await http.get(`${apiUsersEndpoint}/likes`);
				user.likedActivities = likedActivities;
				dispatch(userLogged({ user }));
			} catch (e) {
				logoutUser();
				console.error(e.message);
				dispatch(userLoginFailed(({})));
			}
		}
	}
}

export const likeActivity = (activity) => async (dispatch) => {
	dispatch(activityLikedRequested({}));
	try {
		const { data: user } = await http.put(`${apiUsersEndpoint}/update-likes`, {
			activityId: activity._id
		});
		dispatch(activityLikedSuccess({ user }));
	} catch (e) {
		console.log(e.message)
		dispatch(activityLikedFailed({}));
	}
};