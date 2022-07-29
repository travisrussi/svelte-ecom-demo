<script context="module">
	import _ from 'lodash';
	import { getProduct } from '../../stores/productStore.js';

	/** @type {import('./__types/[slug]').Load} */
	export async function load({ params }) {
		// console.log('product-detail', 'load', 'params.id', params.id);

		let productId = params.id;
		let product = await getProduct(productId);

		console.log('product-detail', 'load', 'productId', productId, 'product', product);

		return {
			props: {
				// productId,
				product
			}
		};
	}
</script>

<script>
	// export let productId;
	export let product = {};
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
							value="1"
							aria-label="Search"
							class="form-control"
							style="width: 100px"
						/>
						<!-- <button class="btn btn-primary btn-md my-0 p" type="submit"
							>Add to cart
							<i class="fas fa-shopping-cart ml-1" />
						</button> -->
						<a href="/checkout" class="btn btn-primary btn-md my-0 p"
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
