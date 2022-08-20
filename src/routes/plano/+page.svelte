<script>
    import Banner from "$lib/Banner.svelte";
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";

    let daysOpen = [false, false, false, false, false, false, false];

    let weekdays = [
        "segunda",
        "terça",
        "quarta",
        "quinta",
        "sexta",
        "sábado",
        "domingo",
    ];

    let list = [];

    onMount(async () => {
        const d = new Date();
        let day = d.getDay();
        daysOpen[day] = true;
    });

    import { flip } from "svelte/animate";

    let hovering = false;

    const drop = (event, target) => {
        event.dataTransfer.dropEffect = "move";
        const start = parseInt(event.dataTransfer.getData("text/plain"));
        const newTracklist = list;

        if (start < target) {
            newTracklist.splice(target + 1, 0, newTracklist[start]);
            newTracklist.splice(start, 1);
        } else {
            newTracklist.splice(target, 0, newTracklist[start]);
            newTracklist.splice(start + 1, 1);
        }
        list = newTracklist;
        hovering = null;
    };

    const dragstart = (event, i) => {
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.dropEffect = "move";
        const start = i;
        event.dataTransfer.setData("text/plain", start);
    };

    const remove = (item) => {
        list = list.filter((i) => i !== item);
    };

    const generatePlan = () => {
        list = [];
        fetch("/plano/novo")
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                const plano = data.plano;
                let newday = 2;
                let currday = 0;
                for (let i = 0; i < plano.length; i++) {
                    if (newday == 2) {
                        list = [
                            ...list,
                            { type: "sep", name: weekdays[currday], id: 0 },
                        ];
                        newday = 0;
                        currday += 1;
                    }
                    list = [
                        ...list,
                        { type: "recipe", name: plano[i].title, id: 0 },
                    ];
                    newday += 1;
                }

                suggestion =
                    "podes re-organizar os pratos arrastando as caixinhas";
            });
    };

    let suggestion =
        "clica em gerar plano para teres receitas para toda a semana";
</script>

<Banner />

<hr />

<button
    on:click={() => {
        generatePlan();
    }}>Gerar Plano 🎲</button
>
<button
    disabled
    on:click={() => {
        goto("/lista");
    }}>Gerar Lista Compras 🛒</button
>
<button
    disabled
    style="float: right;"
    on:click={() => {
        goto("/lista");
    }}>Partilhar 🔗</button
>

<hr />

<small><b>Sugestão:</b> {suggestion}</small>
<br />

<br />

<div class="list">
    {#each list as n, index (n.name)}
        <div
            class="list-item"
            animate:flip
            draggable={true}
            on:dragstart={(event) => dragstart(event, index)}
            on:drop|preventDefault={(event) => drop(event, index)}
            ondragover="return false"
            on:dragenter={() => (hovering = index)}
            class:is-active={hovering === index}
        >
            {#if n.type == "recipe"}
                {n.name}
                <button class="delete" on:click={() => remove(n)}>remove</button
                >
            {:else}
                <center>
                    {n.name}
                </center>
                <hr />
            {/if}
        </div>
    {/each}
</div>

<style>
    .list-item {
        line-height: 1.2;
        padding: 0.5em 2.5em 0.5em 2em;
        margin: 0 0 0.5em 0;
        border-radius: 2px;
        user-select: none;
        border: 1px solid hsl(240, 8%, 70%);
        background-color: hsl(240, 8%, 93%);
        color: #333;
    }

    .list-item:hover button {
        opacity: 1;
    }

    .delete {
        float: right;
        top: 0;
        right: 0.2em;
        width: 5em;
        height: 100%;
        background: no-repeat 50% 50%
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23676778' d='M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M17,7H14.5L13.5,6H10.5L9.5,7H7V9H17V7M9,18H15A1,1 0 0,0 16,17V10H8V17A1,1 0 0,0 9,18Z'%3E%3C/path%3E%3C/svg%3E");
        background-size: 1.4em 1.4em;
        border: none;
        opacity: 0;
        transition: opacity 0.2s;
        text-indent: -9999px;
        cursor: pointer;
    }
</style>
