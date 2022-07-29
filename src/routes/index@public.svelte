<script>
	import _ from 'lodash';
	import {
		loadCategories,
		setCurrentCategory,
		setCurrentSearch,
		loadProducts,
		currentCategory,
		currentSearch,
		categories,
		products,
		pagination
	} from '../stores/productStore.js';
	loadCategories();
	loadProducts({ take: 0, limit: 10 });

	const setCategory = (category) => {
		// console.log('index', 'setCategory', category);
		setCurrentCategory(category);
	};

	const setSearch = (search) => {
		// console.log('index', 'setSearch', search);
		setCurrentSearch(search);
	};

	const setPage = (pageNum) => {
		console.log('index', 'setPage', pageNum, 'limit', $pagination.limit);
		loadProducts({ skip: (pageNum - 1) * $pagination.limit });
	};
</script>

<!--Carousel Wrapper-->
<div id="carousel-example-1z" class="carousel slide carousel-fade pt-4" data-ride="carousel">
	<!--Indicators-->
	<ol class="carousel-indicators">
		<li data-target="#carousel-example-1z" data-slide-to="0" class="active" />
		<li data-target="#carousel-example-1z" data-slide-to="1" />
		<li data-target="#carousel-example-1z" data-slide-to="2" />
	</ol>
	<!--/.Indicators-->

	<!--Slides-->
	<div class="carousel-inner" role="listbox">
		<!--First slide-->
		<div class="carousel-item active">
			<div
				class="view"
				style="background-image: url('https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/8-col/img%282%29.jpg'); background-repeat: no-repeat; background-size: cover;"
			>
				<!-- Mask & flexbox options-->
				<div class="mask rgba-black-strong d-flex justify-content-center align-items-center">
					<!-- Content -->
					<div class="text-center white-text mx-5 wow fadeIn">
						<h1 class="mb-4">
							<strong>Learn Bootstrap 4 with MDB</strong>
						</h1>

						<p>
							<strong>Best & free guide of responsive web design</strong>
						</p>

						<p class="mb-4 d-none d-md-block">
							<strong
								>The most comprehensive tutorial for the Bootstrap 4. Loved by over 500 000 users.
								Video and written versions available. Create your own, stunning website.</strong
							>
						</p>

						<a
							target="_blank"
							href="https://mdbootstrap.com/education/bootstrap/"
							class="btn btn-outline-white btn-lg"
							>Start free tutorial
							<i class="fas fa-graduation-cap ml-2" />
						</a>
					</div>
					<!-- Content -->
				</div>
				<!-- Mask & flexbox options-->
			</div>
		</div>
		<!--/First slide-->

		<!--Second slide-->
		<div class="carousel-item">
			<div
				class="view"
				style="background-image: url('https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/8-col/img%283%29.jpg'); background-repeat: no-repeat; background-size: cover;"
			>
				<!-- Mask & flexbox options-->
				<div class="mask rgba-black-strong d-flex justify-content-center align-items-center">
					<!-- Content -->
					<div class="text-center white-text mx-5 wow fadeIn">
						<h1 class="mb-4">
							<strong>Learn Bootstrap 4 with MDB</strong>
						</h1>

						<p>
							<strong>Best & free guide of responsive web design</strong>
						</p>

						<p class="mb-4 d-none d-md-block">
							<strong
								>The most comprehensive tutorial for the Bootstrap 4. Loved by over 500 000 users.
								Video and written versions available. Create your own, stunning website.</strong
							>
						</p>

						<a
							target="_blank"
							href="https://mdbootstrap.com/education/bootstrap/"
							class="btn btn-outline-white btn-lg"
							>Start free tutorial
							<i class="fas fa-graduation-cap ml-2" />
						</a>
					</div>
					<!-- Content -->
				</div>
				<!-- Mask & flexbox options-->
			</div>
		</div>
		<!--/Second slide-->

		<!--Third slide-->
		<div class="carousel-item">
			<div
				class="view"
				style="background-image: url('https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/8-col/img%285%29.jpg'); background-repeat: no-repeat; background-size: cover;"
			>
				<!-- Mask & flexbox options-->
				<div class="mask rgba-black-strong d-flex justify-content-center align-items-center">
					<!-- Content -->
					<div class="text-center white-text mx-5 wow fadeIn">
						<h1 class="mb-4">
							<strong>Learn Bootstrap 4 with MDB</strong>
						</h1>

						<p>
							<strong>Best & free guide of responsive web design</strong>
						</p>

						<p class="mb-4 d-none d-md-block">
							<strong
								>The most comprehensive tutorial for the Bootstrap 4. Loved by over 500 000 users.
								Video and written versions available. Create your own, stunning website.</strong
							>
						</p>

						<a
							target="_blank"
							href="https://mdbootstrap.com/education/bootstrap/"
							class="btn btn-outline-white btn-lg"
							>Start free tutorial
							<i class="fas fa-graduation-cap ml-2" />
						</a>
					</div>
					<!-- Content -->
				</div>
				<!-- Mask & flexbox options-->
			</div>
		</div>
		<!--/Third slide-->
	</div>
	<!--/.Slides-->

	<!--Controls-->
	<a class="carousel-control-prev" href="#carousel-example-1z" role="button" data-slide="prev">
		<span class="carousel-control-prev-icon" aria-hidden="true" />
		<span class="sr-only">Previous</span>
	</a>
	<a class="carousel-control-next" href="#carousel-example-1z" role="button" data-slide="next">
		<span class="carousel-control-next-icon" aria-hidden="true" />
		<span class="sr-only">Next</span>
	</a>
	<!--/.Controls-->
</div>
<!--/.Carousel Wrapper-->

<!--Main layout-->
<main>
	<div class="container">
		<!--Navbar-->
		<nav class="navbar navbar-expand-lg navbar-dark mdb-color lighten-3 mt-3 mb-5">
			<!-- Navbar brand -->
			<span class="navbar-brand">Categories:</span>

			<!-- Collapse button -->
			<button
				class="navbar-toggler"
				type="button"
				data-toggle="collapse"
				data-target="#basicExampleNav"
				aria-controls="basicExampleNav"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span class="navbar-toggler-icon" />
			</button>

			<!-- Collapsible content -->
			<div class="collapse navbar-collapse" id="basicExampleNav">
				<!-- Links -->
				<ul class="navbar-nav mr-auto">
					<li class="nav-item {_.isNil($currentCategory) ? 'active' : ''}">
						<a class="nav-link" on:click={() => setCategory()}>All</a>
					</li>
					{#each $categories as category}
						<li class="nav-item {$currentCategory === category ? 'active' : ''}">
							<a class="nav-link" on:click={setCategory(category)}>{_.capitalize(category)}</a>
						</li>
					{/each}
				</ul>
				<!-- Links -->

				<form class="form-inline">
					<div class="md-form my-0">
						<input
							class="form-control mr-sm-2"
							type="text"
							placeholder="Search"
							aria-label="Search"
							value={$currentSearch}
							on:input={(e) => setSearch(e.target.value)}
						/>
					</div>
				</form>
			</div>
			<!-- Collapsible content -->
		</nav>
		<!--/.Navbar-->

		<!--Section: Products v.3-->
		<section class="text-center mb-4">
			<!--Grid row-->
			<div class="row wow fadeIn">
				{#each $products as product (product.id)}
					<div class="col-lg-3 col-md-6 mb-4">
						<!--Card-->
						<a href="/product-detail/{product.id}">
							<div class="card">
								<!--Card image-->
								<div class="view overlay">
									<img src={product.thumbnail} class="card-img-top link" alt={product.title} />
									<!-- <div class="mask rgba-white-slight" /> -->
								</div>
								<!--Card image-->

								<!--Card content-->
								<div class="card-body text-center">
									<!--Category & Title-->
									<div class="grey-text">
										<h5>{_.capitalize(product.category)}</h5>
									</div>
									<h5>
										<strong>
											<div class="dark-grey-text">
												{product.title}
												<!-- <span class="badge badge-pill danger-color">NEW</span> -->
											</div>
										</strong>
									</h5>

									<h4 class="font-weight-bold blue-text">
										<strong>${product.price}</strong>
									</h4>
								</div>
								<!--Card content-->
							</div>
						</a>
						<!--Card-->
					</div>
				{/each}
			</div>
			<!--Grid row-->
		</section>
		<!--Section: Products v.3-->

		<!--Pagination-->
		{#if $pagination.pageTotal > 1}
			<nav class="d-flex justify-content-center wow fadeIn">
				<!-- <div>Total: {$pagination.total}</div> -->
				<!-- <div>Skip: {$pagination.skip}</div> -->
				<!-- <div>Limit: {$pagination.limit}</div> -->
				<!-- <div>PageTotal: {$pagination.pageTotal}</div> -->
				<!-- <div>PageCurrent: {$pagination.pageCurrent}</div> -->

				<ul class="pagination pg-blue">
					<!--Arrow left-->
					<li class="page-item  {$pagination.pageCurrent <= 1 ? 'disabled' : ''}">
						<a
							class="page-link"
							on:click={() => setPage($pagination.pageCurrent - 1)}
							aria-label="Previous"
						>
							<span aria-hidden="true">&laquo;</span>
							<span class="sr-only">Previous</span>
						</a>
					</li>

					{#each Array($pagination.pageTotal) as _, pageNum}
						<li class="page-item {pageNum + 1 === $pagination.pageCurrent ? 'active' : ''}">
							<a class="page-link" on:click={() => setPage(pageNum + 1)}>{pageNum + 1} </a>
						</li>
					{/each}

					<li
						class="page-item  {$pagination.pageCurrent === $pagination.pageTotal ? 'disabled' : ''}"
					>
						<a
							class="page-link"
							on:click={() => setPage($pagination.pageCurrent + 1)}
							aria-label="Next"
						>
							<span aria-hidden="true">&raquo;</span>
							<span class="sr-only">Next</span>
						</a>
					</li>
				</ul>
			</nav>
		{/if}
		<!--Pagination-->
	</div>
</main>
<!--Main layout-->
