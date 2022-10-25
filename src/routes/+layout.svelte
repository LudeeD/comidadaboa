<script>
	import 'purecss';
</script>

<div id="content">
	<slot />
</div>

<div class="navbar">
	<a href="/list" class="pure-button nav-button">Info 👨</a>
	<a href="/list" class="pure-button nav-button">Lista 🛒</a>
	<a href="#news" class="pure-button nav-button">Plano 📅</a>
</div>

<style>
	:global(body) {
		background-color: #eaefbd;
	}

	:global(a) {
		color: #175676;
	}

	#content {
		max-width: 800px;
		margin: 0 auto;
	}
	@media (max-width: 48em) {
		#content {
			margin: 0 10px 0 10px;
		}
	}
	/* Place the navbar at the bottom of the page, and make it stick */
	.navbar {
		background-color: #fb5607;
		overflow: hidden;
		position: fixed;
		bottom: 0;
		width: 100%;
		display: flex;
		justify-content: center;
		gap: 10px;
		padding-top: 10px;
		padding-bottom: 10px;
	}

	.nav-button {
		background-color: #fb5607;
		color: white;
		min-width: 100px;
	}
</style>
