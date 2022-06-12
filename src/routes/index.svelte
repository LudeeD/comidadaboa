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
    export let recipes;

    import ButtonRandom from "$lib/ButtonRandom.svelte";
</script>

<svelte:head>
    <title>Página Inicial</title>
</svelte:head>

<center>
    <ButtonRandom text={"O que vou fazer hoje?"} />
</center>

<h3>Receitas</h3>
{#each recipes as name}
    <p>- {name}</p>
{/each}

<style>
</style>
