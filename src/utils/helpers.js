import _ from 'lodash';

export function paginate(items, pageNumber, pageSize) {
	const startIndex = pageNumber * pageSize;

	return _(items)
		.slice(startIndex)
		.take(pageSize)
		.value();
}

export function order(items, sortValue, sortOrder) {
	return _.orderBy(items, [ sortValue ], [ sortOrder ]);
}

export function search(items, searchParameter, searchedValue) {
	return _.filter(items, item =>
		item[searchParameter].toLowerCase().includes(searchedValue.toLowerCase())
	);
}