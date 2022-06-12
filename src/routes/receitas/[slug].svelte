<script context="module">
    export async function load({ fetch, params }) {
        const id = params.slug;
        const response = await fetch("/api/receitas/" + id);
        const receita = await response.json();

        console.log(receita["atributos"]);
        console.log(receita["instruções"]);
        console.log(receita["ingredientes"]);

        if (response.ok) {
            let ret = {
                props: {
                    title: receita["título"],
                    attributes: receita["atributos"],
                    ingredients: receita["ingredientes"],
                    instructions: receita["instruções"],
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
    export let title;
    export let attributes;
    export let ingredients;
    export let instructions;

    import ButtonRandom from "$lib/ButtonRandom.svelte";
    import ButtonHome from "$lib/ButtonHome.svelte";

    let subtitle = `<a href="${attributes["link"]}">link</a> | pessoas: ${attributes["pessoas"]} | Kcal: ${attributes["Kcal"]} | duração: ${attributes["duração"]} min`;
</script>

<ButtonRandom text={"Apetece-me outra coisa !"} />

<h2 style="margin-bottom: 0px;">{title}</h2>
<small>{@html subtitle}</small>

<br />
<br />

<details>
    <summary>Ingredientes</summary>
    <ul>
        {#each ingredients as name}
            <li>{name}</li>
        {/each}
    </ul>
</details>

<details open>
    <summary>Preparação</summary>
    <ol>
        {#each instructions as name}
            <li>{name}</li>
        {/each}
    </ol>
</details>

<ButtonHome />
