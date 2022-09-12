<script>
	import { shopping } from '$lib/shopping_store';
	import { goto } from '$app/navigation';
	import Banner from '$lib/Banner.svelte';

	let query = '';

	const addToShopping = () => {
		$shopping = [
			...$shopping,
			{
				text: query,
				checked: false
			}
		];

		query = '';
	};

	const clearShopping = () => {
		$shopping = $shopping.filter((elem) => !elem.checked);
	};
</script>

<Banner />

<form onsubmit="return false;">
	<div style="display: flex;">
		<input
			style="width: 90%; box-sizing: border-box; min-height:40px"
			type="text"
			id="pesquisa"
			bind:value={query}
			placeholder="2 courgettes"
		/>
		<button on:click={addToShopping} value="Submit">Adicionar</button>
	</div>
</form>
<br />

<fieldset>
	<legend>
		<h3>Lista de Compras</h3>
	</legend>
	{#each $shopping as item}
		<div>
			<input type="checkbox" id={item['text']} name={item['text']} bind:checked={item['checked']} />
			<label class="strikethrough" for={item['text']}>{item['text']}</label>
		</div>
	{/each}
</fieldset>

<br />
<button class="pure-button" on:click={clearShopping} value="Submit">Limpar lista 🗑️</button>
<br />
<br />

<hr />
<button on:click={() => goto('/plano')}>Plano Semanal 📅</button>
<hr />

<style>
	a:visited {
		color: LinkText;
		background-color: transparent;
		text-decoration: none;
	}

	h1 {
		color: #02020b;
		font-size: 2em;
	}
	input[type='checkbox']:checked + label.strikethrough {
		text-decoration: line-through;
	}
</style>
