import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.headers['Access-Control-Allow-Origin'] = "*";

axios.interceptors.response.use(null, error => {
	const expectedError =
		error.response &&
		error.response.status >= 400 &&
		error.response.status < 500;

	if (!expectedError) {
		console.error("An unexpected error ocurred");
	}
	return Promise.reject(error);
});

export default {
	get: axios.get,
}