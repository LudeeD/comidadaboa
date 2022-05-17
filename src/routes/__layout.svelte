<script>
	import Header from "$lib/header/Header.svelte";
	import Menu from "$lib/menu/Menu.svelte";
	import "../app.css";
</script>

<Header />

<div class="container content">
	<slot />
</div>

<footer class="footer is-bottom ">
	<div class="content has-text-centered">
		<p>
			<strong>Comida da Boa</strong> criado por
			<a href="https://luissilva.eu">Luís Silva</a> com ❤️ e 🥲
		</p>
	</div>
</footer>

<style>
	.content {
		flex: 1;
	}
</style>
