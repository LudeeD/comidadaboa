<script>
    export let data;
    $: ({ id, title, attributes, ingredients, instructions } = data);

    import Banner from "$lib/Banner.svelte";
    import { onMount } from "svelte";

    let subtitle = "";
    //`<a href="${attributes["link"]}">link</a> | pessoas: ${attributes["pessoas"]} | Kcal: ${attributes["Kcal"]} | duração: ${attributes["duração"]} min`;
</script>

<Banner />

<h2 style="margin-bottom: 0px;">{title}</h2>
<hr />
<small>{@html subtitle}</small>
<div>
    <button disabled>Adicionar ao plano 📅</button>
    <button disabled>Comprar ingredientes 🛒</button>
</div>

<br />

<details open>
    <summary />
    <center>
        <img
            alt="Prato sem imagem (para já...) 😅"
            src="https://api.comidadaboa.com/images/{id}.jpg"
        />
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
    img {
        max-width: 300px;
        max-height: 225px;
    }

    li:nth-child(odd) {
        background: #ebecf0;
    }
</style>
