<script context="module">
	export const prerender = true;
</script>

<script>
	import { onMount } from "svelte";

	async function fetchData() {
		const response = await fetch("/api/recent");
		const data = await response.json();

		return data.recipes;
	}

	let promise = [];
	onMount(() => {
		promise = fetchData();
	});
</script>

<svelte:head>
	<title>Página Inicial</title>
</svelte:head>

<center>
	<div>
		<button type="button">O que vou fazer hoje ?</button>
	</div>
</center>

<h3>Receitas</h3>
{#await promise}
	<h1>Loading</h1>
{:then result}
	{#each result as name}
		<p>- {name}</p>
	{/each}
{/await}

<style>
</style>
