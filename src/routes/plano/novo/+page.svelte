<script>
    import Banner from "$lib/Banner.svelte";
    import { goto } from "$app/navigation";
    import DragDropList from "$lib/DragDropList.svelte";
    import { planning } from "$lib/meal_plan";
    import { tick } from "svelte";

    export let data;

    let plan = data.plan.map((elem) => {
        let obj = {
            id: elem.recipe_id,
            html:
                '<a href="/receitas/' +
                elem.recipe_id +
                '">' +
                elem.title +
                "</a>",
        };
        return obj;
    });

    let saveButtonText = "Guardar 💾";
    const savePlan = async () => {
        $planning = plan;
        saveButtonText = "Guardado ✔️";
        await tick();
        goto("/plano");
    };
</script>

<Banner />

<hr />

<button
    on:click={() => {
        goto("/plano/novo");
    }}>Gerar de novo 🎲</button
>

<button
    style="float: right;"
    on:click={() => {
        savePlan();
    }}
    >{saveButtonText}
</button>

<hr />

<br />

<div class="list">
    <DragDropList bind:data={plan} removesItems={true} />
</div>

<style>
    div :global(a) {
        pointer-events: none;
        color: Black;
        background-color: transparent;
        text-decoration: none;
    }
</style>
