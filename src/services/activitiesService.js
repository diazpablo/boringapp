import http from './httpService';

const apiEndpoint = '/activity';

/**
 * Get Random Activites
 * @param {int} randomSize(optional) If provided get that number of random activities
 * */
export const getRandomActivities = async (randomSize) => {
	let { data: activities } = await http.get(`${apiEndpoint}/list/${randomSize}`);

	// Emulates liking with localStorage
	const likedActivities = getLikedActivitites();
	likedActivities.map(id => {
		const index = activities.findIndex(act => act.id === id);
		if (index > -1)
			activities[index].liked = true;
		return false;
	})

	return activities;
}

/**
 * Get New Activities
 * @param {int} pageSize Number of new activities to get
 * @param {array.<object>} activities Array of existing activities
 */
export const getNewActivites = async (pageSize, activities) => {
	let newActivities = [];
	while (newActivities.length < pageSize) {
		const newActivity = await getRandomActiviy();
		if (activities.filter(a => a.id === newActivity.id).length === 0) {
			newActivities.push(newActivity);
		}
	}
	return newActivities;
}

/**
 * Get Random Activity
 * */
const getRandomActiviy = async () => {
	const { data } = await http.get(`${apiEndpoint}`);
	let activity = data[0];

	// Emulates liking with localStorage
	const likedActivities = getLikedActivitites();
	if (likedActivities.indexOf(activity.id) > -1) {
		activity.liked = true;
	}

	return activity;
}

/**
 * Set Liked Activity
 * @param {object} activity Activity tu set as Liked
 */
export const setLikedActivity = (activity) => {
	// return Promise.reject(); /* To test rejection.*/

	const { id } = activity;

	// Emulates liking with localStorage
	const likedActivitites = getLikedActivitites();

	if (activity.liked) {
		if (likedActivitites.indexOf(id) < 0) {
			likedActivitites.push(id);
		}
	} else {
		const index = likedActivitites.indexOf(id);
		if (index > -1) {
			likedActivitites.splice(index, 1);
		}
	}
	return localStorage.setItem('likedActivities', JSON.stringify(likedActivitites));
}

/**
 * Get Liked Activitites From LocalStorage
 * */
const getLikedActivitites = () => JSON.parse(localStorage.getItem('likedActivities')) || [];

export default {
	getRandomActivities,
	getNewActivites,
	setLikedActivity
}