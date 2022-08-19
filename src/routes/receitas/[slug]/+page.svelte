<script>
    export let data;
    $: ({ id, title, attributes, ingredients, instructions } = data);

    import Banner from "$lib/Banner.svelte";

    let subtitle = "";
    //`<a href="${attributes["link"]}">link</a> | pessoas: ${attributes["pessoas"]} | Kcal: ${attributes["Kcal"]} | duração: ${attributes["duração"]} min`;
</script>

<Banner />

<h2 style="margin-bottom: 0px;">{title}</h2>
<hr />
<small>{@html subtitle}</small>
<div class="title">
    <button><span>planear 📅</span></button>
    <button><span>comprar 🛒</span></button>
</div>

<br />

<details open>
    <summary />
    <center>
        <img alt="dish" src="https://api.comidadaboa.com/images/{id}.jpg" />
    </center>
</details>

<br />

<details open>
    <summary>Ingredientes</summary>
    <ul>
        {#each ingredients as ing}
            <li>
                {ing["name"]}
                {ing["quantity_value"]}
                {ing["quantity_type"]}
            </li>
        {/each}
    </ul>
</details>

<details>
    <summary>Preparação</summary>
    <ol>
        {#each instructions as name}
            <li>{name["text"]}</li>
        {/each}
    </ol>
</details>

<hr />

<style>
    .title {
        display: flex;
        justify-content: flex-end;
        gap: 10px;
    }

    button {
        font-family: inherit;
    }
    img {
        max-width: 300px;
        max-height: 225px;
    }

    li:nth-child(odd) {
        background: #ebecf0;
    }
</style>
