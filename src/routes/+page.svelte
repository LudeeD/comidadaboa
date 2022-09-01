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
    <button class="pure-button roundButton" disabled on:click={gotoplano}
        >Ver todas 👀</button
    >
</center>

<br />

<hr />
<div id="actions">
    <button class="pure-button roundButton" on:click={gotoplano}
        >Plano semanal 📅</button
    >
    <button
        class="pure-button roundButton"
        on:click={() => {
            goto("/lista");
        }}>Lista compras 🛒</button
    >
    <button class="pure-button infoButton roundButton" on:click={gotoinfo}
        >Informações ℹ️</button
    >
</div>
<hr />

<br />
<br />

<style>
    .roundButton {
        border-radius: 5px;
    }

    button {
        min-width: 165px;
        background-color: #fb5607;
        color: white;
    }

    @media (min-width: 48em) {
        .infoButton {
            margin-left: auto;
        }

        a {
            font-size: large;
        }
    }

    #actions {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
    }
    h1 {
        color: #02020b;
        font-size: 2em;
    }
</style>
