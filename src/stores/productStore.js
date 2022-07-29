import _ from 'lodash';
import { writable, get } from 'svelte/store';
export const currentCategory = writable();
export const currentSearch = writable();
export const currentLimit = writable();
export const currentSkip = writable();
export const categories = writable([]);
export const products = writable([]);
export const searchResult = writable({ total: 0, skip: 0, limit: 0 });

const baseUrl = 'https://dummyjson.com';

export const loadCategories = async () => {
	const jsonResponse = await fetch(`${baseUrl}/products/categories`)
		.then((r) => r.text())
		.then((json) => {
			return JSON.parse(json);
		});

	console.log('stores', 'productStore', 'loadCategories', 'jsonResponse', jsonResponse);

	if (_.isArray(jsonResponse)) {
		categories.set(_.take(jsonResponse, 5));
	} else {
		console.log('stores', 'productStore', 'loadCategories', 'unknown response', jsonResponse);
	}
};

export const setCurrentCategory = async (category) => {
	// console.log('stores', 'productStore', 'setCurrentCategory', category);

	// can't specify a category and keyword search at the same time
	// need to remove the category filter to do a keyword search
	if (!_.isNil(category) && category.length > 0) {
		currentSearch.set(null);
	}

	currentCategory.set(category);
	await loadProducts({});
};

export const setCurrentSearch = async (search) => {
	console.log('stores', 'productStore', 'setCurrentSearch', search);

	// can't specify a category and keyword search at the same time
	// need to remove the category filter to do a keyword search
	if (!_.isNil(search) && search.length > 0) {
		currentCategory.set(null);
	}

	currentSearch.set(search);
	await loadProducts({});
};

export const loadProducts = async ({ limit, skip, category, search }) => {
	// using DummyJson to populate data

	if (!_.isNil(limit)) {
		currentLimit.set(limit);
	}
	if (!_.isNil(skip)) {
		currentSkip.set(skip);
	}
	if (!_.isNil(category)) {
		currentCategory.set(category);
	}
	if (!_.isNil(search)) {
		currentSearch.set(search);
	}

	let fetchUrl = buildLoadProductUrl({
		limit: get(currentLimit),
		skip: get(currentSkip),
		category: get(currentCategory),
		search: get(currentSearch)
	});
	// console.log('stores', 'productStore', 'loadProducts', 'fetchUrl', fetchUrl);

	const jsonResponse = await fetch(fetchUrl)
		.then((r) => r.text())
		.then((json) => {
			return JSON.parse(json);
		});

	console.log('stores', 'productStore', 'loadProducts', 'jsonResponse', jsonResponse);

	if (!_.isNil(jsonResponse)) {
		console.log(
			'stores',
			'productStore',
			'loadProducts',
			_.pick(jsonResponse, ['total', 'skip', 'limit'])
		);
		searchResult.set(_.pick(jsonResponse, ['total', 'skip', 'limit']));

		if (jsonResponse.products) {
			products.set(jsonResponse.products);
		} else {
			console.log('stores', 'productStore', 'loadProducts', 'unknown response', jsonResponse);
		}
	}
};

function buildLoadProductUrl({ limit, skip, category, search }) {
	let fetchUrl = `${baseUrl}/products`;

	let pagination;

	if (!_.isNil(skip) && skip > 0) {
		pagination = pagination || '';
		pagination += `skip=${skip}`;
	}
	if (!_.isNil(limit) && limit > 0) {
		pagination = pagination || '';
		pagination += (!_.isNil(skip) ? '&' : '') + `limit=${limit}`;
	}

	if (!_.isNil(category)) {
		fetchUrl += `/category/${category}` + (!_.isNil(pagination) ? `?${pagination}` : '');
	} else if (!_.isNil(search)) {
		fetchUrl += `/search?q=${search}` + (!_.isNil(pagination) ? `&${pagination}` : '');
	} else {
		fetchUrl += `?${pagination}`;
	}

	return fetchUrl;
}
