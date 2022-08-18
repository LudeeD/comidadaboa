<script>
    import { goto } from "$app/navigation";
    import Banner from "$lib/Banner.svelte";
    export let data;

    const recipes = data.recipes;
    const query = data.query;

    let random = recipes[Math.floor(Math.random() * recipes.length)];

    let gotoinfo = () => {
        goto("/info");
    };
    let gotoplano = () => {
        goto("/plano");
    };
</script>

<Banner />

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

<center>
    <h3 style="margin-bottom: 2px;">E se for...</h3>
    <a href="/receitas/{random['recipe_id']}">{random["title"]}</a>
</center>

<h3>Receitas</h3>
{#each recipes as { recipe_id, title }}
    <a href="/receitas/{recipe_id}"><p>{title}</p></a>
{/each}

<center>
    <button on:click={gotoplano}>Ver todas 👀</button>
</center>

<br />
<br />

<hr />

<button on:click={gotoplano}>Plano 📅</button>
<button
    on:click={() => {
        goto("/lista");
    }}>Compras 🛒</button
>
<button style="float: right;" on:click={gotoinfo}>Informações ℹ️</button>

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
</style>
