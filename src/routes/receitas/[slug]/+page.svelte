<script>
    export let data;
    $: ({ title, attributes, ingredients, instructions } = data);

    import ButtonRandom from "$lib/ButtonRandom.svelte";
    import ButtonHome from "$lib/ButtonHome.svelte";

    import { goto } from "$app/navigation";

    let gotohome = () => {
        goto("/");
    };
    let subtitle = "";
    //`<a href="${attributes["link"]}">link</a> | pessoas: ${attributes["pessoas"]} | Kcal: ${attributes["Kcal"]} | duração: ${attributes["duração"]} min`;
</script>

<h2 style="margin-bottom: 0px;">{title}</h2>
<hr />
<small>{@html subtitle}</small>
<div class="title">
    <button on:click={gotohome} style="margin-right: auto"
        ><span>🔙 voltar</span></button
    >
    <button><span>planear 📅</span></button>
    <button><span>comprar 🛒</span></button>
</div>

<br />

<details open>
    <summary />
    <center>
        <img alt="dish" src="http://localhost:8000/demo.jpeg" />
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

<p>
    Comida da Boa feito com ❤ por <a href="https://luissilva.eu">Luís Silva</a>
</p>

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
