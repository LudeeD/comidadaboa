<script context="module">
	export const prerender = true;
</script>

<script>
	import Counter from "$lib/Counter.svelte";
	import { readable } from "svelte/store";
	import { fly } from "svelte/transition";

	let loading = "";
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

	let val = "";
	let timer;

	const debounce = (v) => {
		loading = "is-loading";
		clearTimeout(timer);
		timer = setTimeout(() => {
			loading = "";
			val = v;
		}, 750);
	};
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<section class="section">
	<div class="columns is-vcentered">
		<div class="column has-text-right">
			<h1 class="title">Comida da Boa</h1>
			<h2 class="subtitle">
				{#key $adjective}
					<p class="subtitle" in:fly={{ y: -20 }}>
						{$adjective}
					</p>
				{/key}
			</h2>
		</div>
		<div class="column has-text-left">
			<img
				style="max-height: 200px"
				alt="The project logo"
				src={barbecue}
			/>
		</div>
	</div>
</section>

<section class="section pt-0">
	<div class="control is-medium {loading}">
		<input
			class="input is-medium"
			type="text"
			placeholder="Procurar receitas"
			on:keyup={({ target: { value } }) => debounce(value)}
		/>
	</div>

	<div class="content is-medium max">
		<ol>
			<li>In fermentum leo eu lectus mollis, quis dictum mi aliquet.</li>
			<li>Morbi eu nulla lobortis, lobortis est in, fringilla felis.</li>
			<li>
				Aliquam nec felis in sapien venenatis viverra fermentum nec
				lectus.s dasd ad kasjdjahd kjashdkja hsd jkajdl ksd asld jalkdj
				alkdj lakjdkla
			</li>
		</ol>
	</div>
</section>

<style>
</style>
