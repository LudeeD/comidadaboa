<script context="module">
    export async function load({ fetch, url }) {
        const response = await fetch("/api/receitas" + url.search);
        const recipes = await response.json();

        let query = url.searchParams.get("q") ?? "";

        if (response.ok) {
            let ret = {
                props: {
                    recipes,
                    query,
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
    export let query;

    let random = recipes[Math.floor(Math.random() * recipes.length)];

    import { goto } from "$app/navigation";

    let gotoinfo = () => {
        goto("/info");
    };
    let gotoplano = () => {
        goto("/plano");
    };
</script>

<svelte:head>
    <title>Página Inicial</title>
</svelte:head>

<p>
    <strong>E que tal: </strong><a href="/receitas/{random['recipe_id']}"
        >{random["title"]}</a
    >
</p>
<br />

<form action="/">
    <input
        style="width: 100%; box-sizing: border-box; min-height:40px"
        type="text"
        id="pesquisa"
        name="q"
        value={query}
        placeholder="pesquisar e.g: frango & massa"
    />
</form>
<br />

<h3>Receitas</h3>
{#each recipes as { recipe_id, title }}
    <a href="/receitas/{recipe_id}"><p>{title}</p></a>
{/each}

<br />
<br />

<hr />

<button on:click={gotoplano}>Plano 🗺️</button>
<button on:click={gotoplano}>Compras 📝️</button>
<button style="float: right;" on:click={gotoinfo}>Informações ℹ️</button>

<hr />

<style>
    a:visited {
        color: LinkText;
        background-color: transparent;
        text-decoration: none;
    }
</style>
