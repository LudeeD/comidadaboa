<script>
    export let data;

    const recipes = data.recipes;
    const query = data.query;

    let random = recipes[Math.floor(Math.random() * recipes.length)];

    import { goto } from "$app/navigation";

    let gotoinfo = () => {
        goto("/info");
    };
    let gotoplano = () => {
        goto("/plano");
    };

    let emogilist = [
        "🥑",
        "🍆",
        "🥕",
        "🥦",
        "🧅",
        "🍄",
        "🍖",
        "🌮",
        "🌯",
        "🍲",
        "🥣",
        "🥗",
        "🍤",
        "🥦",
    ];

    const randomEmogi = emogilist[Math.floor(Math.random() * emogilist.length)];
    const randomEmogi2 =
        emogilist[Math.floor(Math.random() * emogilist.length)];
</script>

<center>
    <h1>{randomEmogi2} Comida da Boa {randomEmogi}</h1>
</center>

<p>
    <strong>Sugestão do dia: </strong><a href="/receitas/{random['recipe_id']}"
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

<button on:click={gotoplano}>Plano 📅</button>
<button
    on:click={() => {
        goto("/lista");
    }}>Compras 🛒</button
>
<button style="float: right;" on:click={gotoinfo}>Informações ℹ️</button>

<hr />
<p>feito com ❤ por <a href="https://luissilva.eu">Luís Silva</a></p>

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
