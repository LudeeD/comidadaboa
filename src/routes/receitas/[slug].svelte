<script context="module">
    export async function load({ fetch, params }) {
        const id = params.slug;
        const response = await fetch("/api/receitas/" + id);
        const receita = await response.json();

        console.log(receita);

        if (response.ok) {
            let ret = {
                props: {
                    title: receita["name"],
                    attributes: receita["attributes"],
                    ingredients: receita["ingredients"],
                    instructions: receita["instructions"],
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

    let subtitle = "demo";
    //`<a href="${attributes["link"]}">link</a> | pessoas: ${attributes["pessoas"]} | Kcal: ${attributes["Kcal"]} | duração: ${attributes["duração"]} min`;
</script>

<ButtonRandom text={"Apetece-me outra coisa 🔄"} />

<h2 style="margin-bottom: 0px;">{title}</h2>
<small>{@html subtitle}</small>

<br />
<br />

<details open>
    <summary>Ingredientes</summary>
    <ul>
        {#each ingredients as name}
            <li>{name["name"]}</li>
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

<br /><br />
<hr />
<label for="cars">Planear</label>
<select name="cars" id="cars">
    <option value="volvo">segunda-feira</option>
    <option value="saab">terça-feira</option>
    <option value="saab">quarta-feira</option>
    <option value="saab">quinta-feira</option>
    <option value="saab">sexta-feira</option>
    <option value="saab">sábado</option>
    <option value="saab">domingo</option>
</select>
<input type="submit" value="Guardar" />
