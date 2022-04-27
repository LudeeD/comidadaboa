<script context="module">
	export const prerender = true;
</script>

<script>
	import Counter from "$lib/Counter.svelte";
	import { readable } from "svelte/store";
	import { fly } from "svelte/transition";

	import barbecue from "$lib/assets/undraw_barbecue_3x93.svg";

	let choices = ["saudável", "prático", "engraçado", "sem stress"];

	const adjective = readable(
		choices[Math.floor(Math.random() * choices.length)],
		function start(set) {
			const interval = setInterval(() => {
				console.log("pila");
				set(choices[Math.floor(Math.random() * choices.length)]);
			}, 3000);

			return function stop() {
				clearInterval(interval);
			};
		}
	);
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<section class="section">
	<div class="columns is-vcentered">
		<div class="column">
			<h1 class="title">Comida da Boa</h1>
			<h2 class="subtitle">
				{#key $adjective}
					<p class="subtitle" in:fly={{ y: -20 }}>
						{$adjective}
					</p>
				{/key}
			</h2>
		</div>
		<div class="column has-text-right">
			<img
				style="max-height: 200px"
				alt="The project logo"
				src={barbecue}
			/>
		</div>
	</div>
</section>

<style>
</style>
