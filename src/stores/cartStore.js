import _ from 'lodash';
import { writable, get } from 'svelte/store';
import { browser } from '$app/env';

const storedCartItems =
	browser && localStorage.getItem('cart-items')
		? JSON.parse(localStorage.getItem('cart-items'))
		: [];
export const cartItems = writable(storedCartItems);

const sampleContact = {
	nameFirst: 'bob',
	nameLast: 'smith',
	email: 'bob@smith.com',
	address: '123 Main Street',
	city: 'Tampa',
	state: 'Florida',
	zip: '33123'
};
const storedContact =
	browser && localStorage.getItem('cart-contact')
		? JSON.parse(localStorage.getItem('cart-contact'))
		: sampleContact;
export const contact = writable(storedContact);

const samplePayment = {
	name: 'Big Spender',
	number: '123123123',
	expiry: '12/12',
	cvv: '123'
};
const storedPayment =
	browser && localStorage.getItem('cart-payment')
		? JSON.parse(localStorage.getItem('cart-payment'))
		: samplePayment;
export const payment = writable(storedPayment);

const samplePromo = { code: 'save20', discountPercent: 0, discountAmount: 0 };
const storedPromo =
	browser && localStorage.getItem('cart-promo')
		? JSON.parse(localStorage.getItem('cart-promo'))
		: samplePromo;
export const promoCode = writable(storedPromo);

const storedCartTotal =
	browser && localStorage.getItem('cart-total') ? localStorage.getItem('cart-total') * 1 : 0;
export const cartTotal = writable(storedCartTotal);

export const addItemToCart = ({ product, quantity }) => {
	let currentCartItems = get(cartItems);
	if (!_.isArray(currentCartItems)) {
		currentCartItems = [];
	}

	// TODO: if same item is added, update the quantity instead of adding a new item to cart
	currentCartItems = [
		...currentCartItems,
		{ ..._.pick(product, ['id', 'title', 'description', 'price']), quantity }
	];

	setCartItems(currentCartItems);
};

export const removeItemFromCart = (productId) => {
	let currentCartItems = get(cartItems);

	currentCartItems = _.reject(currentCartItems, (item) => {
		return item.id === productId;
	});

	setCartItems(currentCartItems);
};

const setCartItems = (newCartItems) => {
	cartItems.set(newCartItems);

	if (browser) {
		localStorage.setItem('cart-items', JSON.stringify(newCartItems));
	}

	// console.log('cartStore', 'setCartItems', 'newCartItems', newCartItems);

	updateCartTotal();
};

export const setContact = (newContact) => {
	contact.set(newContact);
	if (browser) {
		localStorage.setItem('cart-contact', JSON.stringify(newContact));
	}
};

export const setPayment = (newPayment) => {
	payment.set(newPayment);
	if (browser) {
		localStorage.setItem('cart-payment', JSON.stringify(newPayment));
	}
};

export const setPromoCode = (newPromoCode) => {
	// TODO: validate code and get discount percent
	// just hard-coded for testing at 20%
	var promo = { code: newPromoCode, discountPercent: 0.2, discountAmount: 0 };
	promoCode.set(promo);
	if (browser) {
		localStorage.setItem('cart-promo', JSON.stringify(promo));
	}
};

export const applyPromoCode = () => {
	// TODO: validate code and get discount percent
	// just hard-coded for testing at 20%

	// console.log('cartStore', 'applyPromoCode');
	updateCartTotal();
};

function updateCartTotal() {
	var _cartItems = get(cartItems);

	var _cartTotal = 0;

	_.each(_cartItems, (cartItem) => {
		if (!_.isNil(cartItem) && cartItem.price > 0) {
			_cartTotal += cartItem.price * (cartItem.quantity || 1);
		}
	});

	var _promoCodeDiscountAmount = calculatePromoCodeDiscount(_cartTotal);
	if (_promoCodeDiscountAmount > 0 && _cartTotal > 0) {
		_cartTotal -= _promoCodeDiscountAmount;
	}

	if (_cartTotal > 0) {
		_cartTotal = parseFloat(_cartTotal).toFixed(2) * 1;
	}

	// console.log('cartStore', 'updateCartTotal', '_cartTotal', _cartTotal, '_cartItems', _cartItems);

	cartTotal.set(_cartTotal);

	if (browser) {
		localStorage.setItem('cart-total', JSON.stringify(_cartTotal));
	}
}

function calculatePromoCodeDiscount(cartTotal) {
	var _promoCode = get(promoCode);

	if (!_.isNil(_promoCode.code) && cartTotal > 0) {
		_promoCode.discountAmount = cartTotal * _promoCode.discountPercent;
	} else {
		_promoCode.discountAmount = 0;
	}
	promoCode.set(_promoCode);

	return _promoCode.discountAmount;
}
