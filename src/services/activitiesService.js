import http from './httpService';

const apiEndpoint = '/activity';

export function getActivities() {
	return http.get(`${apiEndpoint}/list`);
}