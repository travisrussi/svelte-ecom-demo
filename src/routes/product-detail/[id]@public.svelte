<script context="module">
	import { getProduct } from '../../stores/productStore.js';

	/** @type {import('./__types/[slug]').Load} */
	export async function load({ params }) {
		// console.log('product-detail', 'load', 'params.id', params.id);

		let productId = params.id;
		let product = await getProduct(productId);

		// console.log('product-detail', 'load', 'productId', productId, 'product', product);

		return {
			props: {
				// productId,
				product
			}
		};
	}
</script>

<script>
	import _ from 'lodash';
	import { goto } from '$app/navigation';
	import { addItemToCart } from '../../stores/cartStore.js';

	// export let productId;
	export let product = {};
	let quantity = 2;

	const setQuantity = (newQuantity) => {
		// console.log('product-detail', 'setQuantity', 'newQuantity', newQuantity, 'quantity', quantity);
		quantity = newQuantity;
	};

	const addCurentItemToCart = () => {
		if (!_.isNil(product) && !_.isNil(product.id) && quantity > 0) {
			// console.log('product-detail', 'addCurentItemToCart', product.id, quantity);
			addItemToCart({ product, quantity });
			goto('/checkout');
		}
	};
</script>

<!--Main layout-->
<main class="mt-5 pt-4">
	<div class="container dark-grey-text mt-5">
		<!--Grid row-->
		<div class="row wow fadeIn">
			<!--Grid column-->
			<div class="col-md-6 mb-4">
				<img src={product.thumbnail} class="img-fluid" alt="" />
			</div>
			<!--Grid column-->

			<!--Grid column-->
			<div class="col-md-6 mb-4">
				<!--Content-->
				<div class="p-4">
					<div class="mb-3">
						<span class="badge purple mr-1">{_.capitalize(product.category)}</span>
					</div>

					<p class="lead">
						<!-- <span class="mr-1">
							<del>${product.price}</del>
						</span> -->
						<span>${product.price}</span>
					</p>

					<p class="lead font-weight-bold">{product.title}</p>

					<p>{product.description}</p>

					<form class="d-flex justify-content-left">
						<!-- Default input -->
						<input
							type="number"
							aria-label="Quantity"
							class="form-control"
							style="width: 100px"
							value={quantity || 1}
							on:change={(e) => setQuantity(e.target.value)}
						/>
						<!-- <button class="btn btn-primary btn-md my-0 p" type="submit"
							>Add to cart
							<i class="fas fa-shopping-cart ml-1" />
						</button> -->
						<a on:click={() => addCurentItemToCart()} class="btn btn-primary btn-md my-0 p"
							>Add to Cart <i class="fas fa-shopping-cart ml-1" /></a
						>
					</form>
				</div>
				<!--Content-->
			</div>
			<!--Grid column-->
		</div>
		<!--Grid row-->

		<hr />

		<!--Grid row-->
		<div class="row wow fadeIn mt-5">
			{#each product.images as imageUrl}
				<div class="col-lg-4 col-md-12 mb-4">
					<img src={imageUrl} class="img-fluid" alt="" />
				</div>
			{/each}
		</div>
		<!--Grid row-->
	</div>
</main>
<!--Main layout-->
