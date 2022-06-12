<script context="module">
	import ButtonHome from "$lib/ButtonHome.svelte";

	export const prerender = true;
</script>

<svelte:head>
	<title>Sobre</title>
</svelte:head>

<div>
	<h2>O que é isto?</h2>

	<p>Basicamente é um site de receitas</p>

	<h2>Porque é que parece um site dos anos 80?</h2>

	<p>
		Porque os sites hoje em dia estão atafulhados de coisas desnecessárias.
		São os videos, as publicidades, os banners das cookies, as newsletters,
		os trackers... Este site não tem nada disso basicamente, e foca-se no
		conteudo. (basicamente eu estava a perder muito tempo a fazer uma coisa
		bonita, e prefiro ter uma coisa funcional)
	</p>

	<h2>Adorei o site, e até gostava de ajudar, como posso fazer ?</h2>

	<form action="https://buy.stripe.com/eVadR7d1x4aAddC5kk">
		<input type="submit" value="Oferecer cerveja e rissol 🍺 🥟" />
	</form>
</div>

<ButtonHome />

<style>
</style>
