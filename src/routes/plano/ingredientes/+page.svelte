<script>
    import Banner from "$lib/Banner.svelte";
    import { goto } from "$app/navigation";
    import { planning } from "$lib/meal_plan";
    import { shopping } from "$lib/shopping_store";

    export let data;

    let selectText = "Desseleccionar tudo 🟦";
    let selectedAll = true;

    const changeSelectText = () => {
        const inputArray = document.getElementsByTagName("input");
        for (var index = 0; index < inputArray.length; index++)
            if (!inputArray[index].checked) {
                selectText = "Seleccionar tudo ☑️";
                selectedAll = false;
                return;
            }

        selectText = "Desseleccionar tudo 🟦";
        selectedAll = true;
    };

    const selectAll = () => {
        const inputArray = document.getElementsByTagName("input");
        for (var index = 0; index < inputArray.length; index++)
            inputArray[index].checked = true;
        selectText = "Desseleccionar tudo 🟦";
    };

    const unSelectAll = () => {
        const inputArray = document.getElementsByTagName("input");
        for (var index = 0; index < inputArray.length; index++)
            inputArray[index].checked = false;
        selectText = "Seleccionar tudo 🟦";
    };

    const doAllButton = () => {
        if (selectedAll) {
            unSelectAll();
            selectedAll = false;
        } else {
            selectAll();
            selectedAll = true;
        }
    };

    const addToShoppingList = () => {
        const inputArray = document.getElementsByTagName("input");
        for (var index = 0; index < inputArray.length; index++) {
            if (inputArray[index].checked) {
                for (const label of inputArray[index].labels) {
                    const query = label.textContent;
                    $shopping = [
                        ...$shopping,
                        {
                            text: query,
                            checked: false,
                        },
                    ];
                }
            }
        }

        goto("/lista");
    };
</script>

<Banner />

<hr />

<button
    on:click={() => {
        doAllButton();
    }}
    >{selectText}️
</button>

<button
    style="float: right;"
    on:click={() => {
        addToShoppingList();
    }}
    >Guardar na lista de compras 💾 🛒
</button>

<hr />

<br />

<fieldset>
    <legend>Selecciona os ingredientes que queres adicionar à lista</legend>

    {#each data.ingredients_plan as { name, quantity_type, sum }, i}
        <div>
            <input
                type="checkbox"
                id={name}
                {name}
                checked
                on:click={changeSelectText}
            />
            <label for={name}>{sum} {quantity_type} {name}</label>
        </div>
    {/each}
</fieldset>
