<script>
    import { onMount } from "svelte";
    import pako from "pako";
    import Nav from "../../components/Nav.svelte";

    let menu = [];
    let ingredients = [];
    let days = [
        "Seg A",
        "Seg J",
        "Ter A",
        "Ter J",
        "Qua A",
        "Qua J",
        "Qui A",
        "Qui J",
        "Sex A",
        "Sex J",
        "Sab A",
        "Sab J",
        "Dom A",
        "Dom J",
    ];

    let new_recipe = "";

    const update_menu_ingredients = () => {
        // get the ingredients and sum the quantities of equal ingredients
        const ingredientsMap = new Map();
        menu.forEach((recipe) => {
            recipe.ingredients.forEach((ing) => {
                if (ingredientsMap.has(ing.name)) {
                    const oldIng = ingredientsMap.get(ing.name);
                    ingredientsMap.set(ing.name, {
                        name: ing.name,
                        quantity:
                            Number(oldIng.quantity) + Number(ing.quantity),
                        unit: ing.unit,
                    });
                } else {
                    ingredientsMap.set(ing.name, ing);
                }
            });
        });
        ingredients = [...ingredientsMap.values()];
    };

    onMount(async () => {
        const menudata = localStorage.getItem("menu") || "[]";
        const menujson = JSON.parse(menudata);
        menu = menujson.sort((a, b) => {
            if (a.day < b.day) return -1;
            if (a.day > b.day) return 1;
            return 0;
        });
        update_menu_ingredients();
    });

    const removeFromMenu = (index) => {
        menu.splice(index, 1);
        localStorage.setItem("menu", JSON.stringify(menu));
        menu = [...menu];
        update_menu_ingredients();
    };

    const updateDay = (index) => {
        const recipe = menu[index];
        const currentDay = recipe.day || 0;
        recipe.day = (currentDay + 1) % 14;
        localStorage.setItem("menu", JSON.stringify(menu));
        let ordered_menu_by_day = menu.sort((a, b) => {
            if (a.day < b.day) return -1;
            if (a.day > b.day) return 1;
            return 0;
        });
        menu = [...ordered_menu_by_day];
        update_menu_ingredients();
    };

    const share = () => {
        const state = localStorage.getItem("menu") || "[]";
        const compressed = pako.deflate(state);
        console.log(compressed);
        //console.log(btoa(compressed));
    };

    const addToListSelectedIngredients = () => {
        const selectedIngredients = ingredients.filter(
            (ing, index) => document.getElementById(index).checked
        );
        const currIngredients = JSON.parse(
            localStorage.getItem("list") || "[]"
        );
        const ingredientsString = selectedIngredients.map(
            (ing) => `${ing.name} ${ing.quantity}${ing.unit}`
        );
        currIngredients.push(...ingredientsString);

        localStorage.setItem("list", JSON.stringify(currIngredients));
    };

    const addAllIngredients = () => {
        const ingredientsString = ingredients.map(
            (ing) => `${ing.name} ${ing.quantity}${ing.unit}`
        );
        const currIngredients = JSON.parse(
            localStorage.getItem("list") || "[]"
        );
        currIngredients.push(...ingredientsString);

        localStorage.setItem("list", JSON.stringify(currIngredients));
    };

    const clean = () => {
        localStorage.setItem("menu", "[]");
        menu = [];
        ingredients = [];
    };
</script>

<Nav />
<article class="card" style="margin-left: 4px; margin-right: 4px">
    <header>
        <h3>Menu</h3>
    </header>
    <div>
        <ul>
            {#each menu as item, index}
                <li>
                    <div
                        style="display: flex; justify-content: space-around; align-items: baseline;"
                    >
                        <span>{item.title}</span>
                        <button on:click={() => updateDay(index)}
                            >{days[item.day || 0]}</button
                        >
                    </div>
                </li>
            {/each}
        </ul>
    </div>
    {#if menu.length > 0}
        <footer style="display: flex; justify-content: space-around ">
            <button class="error" on:click={clean}>Limpar</button>
            <label for="modal_1" class="button">Partilhar</label>
        </footer>
    {/if}
</article>

<article class="card" style="margin-left: 4px; margin-right: 4px">
    <header>
        <h3>Ingredientes do Menu</h3>
    </header>
    <div
        style="display: flex; padding-left: 32px; padding-top: 32px; flex-direction: column"
    >
        {#each ingredients as ing, index}
            <label>
                <input type="checkbox" id={index} />
                <span class="checkable"
                    >{ing.name} {ing.quantity}{ing.unit}</span
                >
            </label>
        {/each}
    </div>
    {#if ingredients.length > 0}
        <footer
            style="display: flex; justify-content: space-around; align-items:baseline"
        >
            <p>+ Lista 🛒</p>
            <button class="button" on:click={addToListSelectedIngredients}
                >Seleção</button
            >
            <button class="button" on:click={addAllIngredients}>Todos</button>
        </footer>
    {/if}
</article>

<div class="modal">
    <input id="modal_1" type="checkbox" />
    <label for="modal_1" class="overlay" />
    <article>
        <header>
            <h3>Great offer</h3>
            <label for="modal_1" class="close">&times;</label>
        </header>
        <section class="content">
            We have a special offer for you. I am sure you will love it! However
            this does look spammy...
        </section>
        <footer>
            <a class="button" href="#">See offer</a>
            <label for="modal_1" class="button dangerous"> Cancel </label>
        </footer>
    </article>
</div>

<style>
    .colorbtn {
        background-color: #e3f09b;
        color: black;
    }
</style>
