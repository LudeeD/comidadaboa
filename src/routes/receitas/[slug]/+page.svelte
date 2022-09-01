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
<div id="actions">
    <button class="pure-button" disabled>Adicionar ao plano 📅</button>
    <button class="pure-button " disabled>Comprar ingredientes 🛒</button>
</div>

<br />

<details open>
    <summary>Ingredientes</summary>
    <div class="pure-g">
        <div class="pure-u-1-2">
            <ul>
                {#each ingredients as ing}
                    <li>
                        {ing["name"]}
                        {ing["quantity_value"]}
                        {ing["quantity_type"]}
                    </li>
                {/each}
            </ul>
        </div>

        <div class="pure-u-1-2">
            <center>
                <img
                    class="pure-img lefties"
                    alt="Prato sem imagem (para já...) 😅"
                    src="https://api.comidadaboa.com/images/{id}.jpg"
                />
            </center>
        </div>
    </div>
</details>
<br />
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
    button {
        min-width: 165px;
        background-color: #fb5607;
        color: white;
    }
    #actions {
        display: flex;
        justify-content: flex-end;
        flex-wrap: wrap;
        gap: 10px;
    }
    @media (max-width: 48em) {
        .pure-u-1-2 {
            width: 100%;
        }
    }
    li:nth-child(odd) {
        background: #ebecf0;
    }
</style>
