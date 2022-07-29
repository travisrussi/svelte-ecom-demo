<script>
	import _ from 'lodash';
	import {
		cartItems,
		contact,
		setContact,
		payment,
		setPayment,
		promoCode,
		setPromoCode,
		applyPromoCode,
		cartTotal,
		removeItemFromCart
	} from '../stores/cartStore.js';

	const updateContactField = ({ field, value }) => {
		console.log('checkout', 'updateContactField', 'field', field, 'value', value);
		contact[field] = value;
		setContact(contact);
	};

	const updatePaymentField = ({ field, value }) => {
		console.log('checkout', 'updatePaymentField', 'field', field, 'value', value);
		payment[field] = value;
		setPayment(payment);
	};

	const updatePromoField = (value) => {
		console.log('checkout', 'updatePromoField', 'value', value);
		setPromoCode(value);
	};

	const clickRedeem = () => {
		applyPromoCode();
	};

	const clickRemoveItemFromCart = (productId) => {
		console.log('checkout', 'clickRemoveItemFromCart', productId);

		removeItemFromCart(productId);
	};

	const doCheckout = () => {
		// if (!_.isNil(product) && !_.isNil(product.id) && quantity > 0) {
		// 	// console.log('product-detail', 'addCurentItemToCart', product.id, quantity);
		// 	addItemToCart({ product, quantity });
		// 	goto('/checkout');
		// }
	};
</script>

<!--Main layout-->
<main class="mt-5 pt-4">
	<div class="container wow fadeIn">
		<!-- Heading -->
		<h2 class="my-5 h2 text-center">Checkout form</h2>

		<!--Grid row-->
		<div class="row">
			<!--Grid column-->
			<div class="col-md-8 mb-4">
				<!--Card-->
				<div class="card">
					<!--Card content-->
					<form class="card-body">
						<!--Grid row-->
						<div class="row">
							<!--Grid column-->
							<div class="col-md-6 mb-2">
								<!--firstName-->
								<div class="md-form ">
									<input
										type="text"
										id="firstName"
										class="form-control"
										bind:value={$contact.nameFirst}
										on:input={(e) =>
											updateContactField({ field: 'nameFirst', value: e.target.value })}
									/>
									<!-- <label for="firstName" class="">First name</label> -->
								</div>
							</div>
							<!--Grid column-->

							<!--Grid column-->
							<div class="col-md-6 mb-2">
								<!--lastName-->
								<div class="md-form">
									<input
										type="text"
										id="lastName"
										class="form-control"
										bind:value={$contact.nameLast}
										on:input={(e) =>
											updateContactField({ field: 'nameLast', value: e.target.value })}
									/>
									<!-- <label for="lastName" class="">Last name</label> -->
								</div>
							</div>
							<!--Grid column-->
						</div>
						<!--Grid row-->

						<!--email-->
						<div class="md-form mb-5">
							<input
								type="text"
								id="email"
								class="form-control"
								placeholder="youremail@example.com"
								bind:value={$contact.email}
								on:input={(e) => updateContactField({ field: 'email', value: e.target.value })}
							/>
							<!-- <label for="email" class="">Email (optional)</label> -->
						</div>

						<!--address-->
						<div class="md-form mb-5">
							<!-- <label for="address" class="">Address</label> -->
							<input
								type="text"
								id="address"
								class="form-control"
								placeholder="1234 Main St"
								bind:value={$contact.address}
								on:input={(e) => updateContactField({ field: 'address', value: e.target.value })}
							/>
						</div>

						<!--Grid row-->
						<div class="row">
							<!--Grid column-->
							<div class="col-lg-4 col-md-12 mb-4">
								<label for="city" class="">City</label>
								<input
									type="text"
									id="city"
									class="form-control"
									placeholder="City"
									bind:value={$contact.city}
									on:input={(e) => updateContactField({ field: 'city', value: e.target.value })}
								/>
							</div>
							<!--Grid column-->

							<!--Grid column-->
							<div class="col-lg-4 col-md-6 mb-4">
								<label for="state" class="">State</label>
								<input
									type="text"
									id="state"
									class="form-control"
									placeholder="State"
									bind:value={$contact.state}
									on:input={(e) => updateContactField({ field: 'state', value: e.target.value })}
								/>
							</div>
							<!--Grid column-->

							<!--Grid column-->
							<div class="col-lg-4 col-md-6 mb-4">
								<label for="zip">Zip</label>
								<input
									type="text"
									class="form-control"
									id="zip"
									placeholder="Zip Code"
									bind:value={$contact.zipCode}
									on:input={(e) => updateContactField({ field: 'zipCode', value: e.target.value })}
								/>
							</div>
							<!--Grid column-->
						</div>
						<!--Grid row-->

						<hr />

						<div class="row">
							<div class="col-md-6 mb-3">
								<label for="cc-name">Name on card</label>
								<input
									type="text"
									class="form-control"
									id="cc-name"
									placeholder=""
									bind:value={$payment.name}
									on:input={(e) => updatePaymentField({ field: 'name', value: e.target.value })}
								/>
								<small class="text-muted">Full name as displayed on card</small>
								<div class="invalid-feedback">Name on card is required</div>
							</div>
							<div class="col-md-6 mb-3">
								<label for="cc-number">Credit card number</label>
								<input
									type="text"
									class="form-control"
									id="cc-number"
									placeholder=""
									bind:value={$payment.number}
									on:input={(e) => updatePaymentField({ field: 'number', value: e.target.value })}
								/>
								<div class="invalid-feedback">Credit card number is required</div>
							</div>
						</div>
						<div class="row">
							<div class="col-md-3 mb-3">
								<label for="cc-expiration">Expiration</label>
								<input
									type="text"
									class="form-control"
									id="cc-expiration"
									placeholder=""
									bind:value={$payment.expiry}
									on:input={(e) => updatePaymentField({ field: 'expiry', value: e.target.value })}
								/>
								<div class="invalid-feedback">Expiration date required</div>
							</div>
							<div class="col-md-3 mb-3">
								<label for="cc-expiration">CVV</label>
								<input
									type="text"
									class="form-control"
									id="cc-cvv"
									placeholder=""
									bind:value={$payment.cvv}
									on:input={(e) => updatePaymentField({ field: 'cvv', value: e.target.value })}
								/>
								<div class="invalid-feedback">Security code required</div>
							</div>
						</div>
						<hr class="mb-4" />
						<button class="btn btn-primary btn-lg btn-block" type="submit"
							>Continue to checkout</button
						>
					</form>
				</div>
				<!--/.Card-->
			</div>
			<!--Grid column-->

			<!--Grid column-->
			<div class="col-md-4 mb-4">
				<!-- Heading -->
				<h4 class="d-flex justify-content-between align-items-center mb-3">
					<span class="text-muted">Your cart</span>
					<span class="badge badge-secondary badge-pill">{$cartItems.length}</span>
				</h4>

				<!-- Cart -->
				<ul class="list-group mb-3 z-depth-1">
					{#each $cartItems as cartItem}
						<li
							class="list-group-item d-flex justify-content-between lh-condensed"
							on:click={() => clickRemoveItemFromCart(cartItem.id)}
						>
							<div>
								<h6 class="my-0">{cartItem.title}</h6>
								<!-- <small class="text-muted">Brief description</small> -->
							</div>
							<span class="text-muted">${cartItem.price}</span>
							<span class="text-muted">({cartItem.quantity})</span>
						</li>
					{/each}

					{#if $promoCode && $promoCode.code}
						<li class="list-group-item d-flex justify-content-between bg-light">
							<div class="text-success">
								<h6 class="my-0">Promo code</h6>
								<small>{$promoCode.code}</small>
							</div>
							<span class="text-success">-${$promoCode.discountAmount.toFixed(2)}</span>
						</li>
					{/if}

					<li class="list-group-item d-flex justify-content-between">
						<span>Total (USD)</span>
						<strong>${$cartTotal.toFixed(2)}</strong>
					</li>
				</ul>
				<!-- Cart -->

				<!-- Promo code -->
				<form class="card p-2">
					<div class="input-group">
						<input
							type="text"
							class="form-control"
							placeholder="Promo code"
							aria-label="Recipient's username"
							aria-describedby="basic-addon2"
							bind:value={$promoCode.code}
							on:input={(e) => updatePromoField(e.target.value)}
						/>
						<div class="input-group-append">
							<button
								class="btn btn-secondary btn-md waves-effect m-0"
								type="button"
								on:click={() => clickRedeem()}>Redeem</button
							>
						</div>
					</div>
				</form>
				<!-- Promo code -->
			</div>
			<!--Grid column-->
		</div>
		<!--Grid row-->
	</div>
</main>
<!--Main layout-->
