<script>
	import Banner from '$lib/Banner.svelte';

	import { onMount } from 'svelte';
	export let data;

	let index = data.index;

	let docs = index.documentStore.docs;

	console.log(docs);

	let recipes = Object.entries(docs);

	let query = '';

	let demo;

	const onSubmit = (e) => {
		const formData = new FormData(e.target);

		const data = {};
		for (let field of formData) {
			const [key, value] = field;
			data[key] = value;
		}

		if (data.q.length == 0) {
			recipes = Object.entries(docs);
		} else {
			let results = demo.search(data.q).map((obj) => parseInt(obj.ref));

			console.log(results);

			recipes = recipes.filter((elem) => {
				return results.includes(parseInt(elem[0]));
			});
		}
	};

	onMount(() => {
		demo = elasticlunr.Index.load(index);
	});
</script>

<Banner />

<br />

<form on:submit|preventDefault={onSubmit}>
	<input
		style="width: 100%; box-sizing: border-box; min-height:40px; border: none; box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2); padding: 2px 16px"
		type="search"
		id="pesquisa"
		name="q"
		value={query}
		placeholder="pesquisar e.g: frango & massa"
	/>
</form>

<center />

<br />

<br />

<div class="card">
	<div class="container">
		{#each recipes as [key, value]}
			<a href="/comidadaboa/recipes/{key}"><p>{value.title}</p></a>
		{/each}
	</div>
</div>

<style>
	.card {
		/* Add shadows to create the "card" effect */
		background-color: white;
		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
		transition: 0.3s;
	}

	/* Add some padding inside the card container */
	.container {
		padding: 2px 16px;
	}

	/* Place the navbar at the bottom of the page, and make it stick */
	.navbar {
		background-color: #333;
		overflow: hidden;
		position: fixed;
		bottom: 0;
		width: 100%;
	}

	/* Style the links inside the navigation bar */
	.navbar a {
		float: left;
		display: block;
		color: #f2f2f2;
		text-align: center;
		padding: 14px 16px;
		text-decoration: none;
		font-size: 17px;
	}

	/* Change the color of links on hover */
	.navbar a:hover {
		background-color: #ddd;
		color: black;
	}

	/* Add a color to the active/current link */
	.navbar a.active {
		background-color: #04aa6d;
		color: white;
	}
</style>
