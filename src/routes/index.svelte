<script context="module">
	export async function load({ fetch }) {
		const response = await fetch("/api/recent");
		const recipes = await response.json();

		if (response.ok) {
			let ret = {
				props: {
					recipes: recipes["recipes"],
				},
			};
			return ret;
		}

		return {
			status: response.status,
			error: new Error("Could not fetch the guide"),
		};
	}
</script>

<script>
	import { goto } from "$app/navigation";

	export let recipes;

	let max_recipes = 10;

	let random = () => {
		let r = Math.floor(Math.random() * (max_recipes - 0 + 1) + 0);
		goto(`/receitas/${r}`);
	};
</script>

<svelte:head>
	<title>Página Inicial</title>
</svelte:head>

<center>
	<div>
		<button on:click={random} type="button">O que vou fazer hoje ?</button>
	</div>
</center>

<h3>Receitas</h3>
{#each recipes as name}
	<p>- {name}</p>
{/each}

<style>
</style>
