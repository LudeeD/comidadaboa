<script>
    import Nav from "../../../components/Nav.svelte";

    export let data;

    const addToMenu = () => {
        let menu = localStorage.getItem("menu") || "[]";
        menu = JSON.parse(menu);
        let lastRecipe = menu[menu.length - 1];
        let lastday = lastRecipe ? lastRecipe.day : 0;
        const recipe = {
            slug: data.slug,
            title: data.title,
            ingredients: data.ingredients,
            day: (lastday + 1) % 14,
        };
        menu.push(recipe);
        // console.log(menu);
        localStorage.setItem("menu", JSON.stringify(menu));
    };

    const addToList = () => {
        const ingredients = data.ingredients.map(
            (ingredient) => ingredient.name
        );
        let list = localStorage.getItem("list") || "[]";
        list = JSON.parse(list);
        list.push(...ingredients);
        localStorage.setItem("list", JSON.stringify(list));
    };

    let highlightedInstruction = 0;

    let showingIngredients = false;
</script>

<Nav />

<article class="card" style="margin-left: 4px; margin-right: 4px">
    <header>
        <h3>{data.title}</h3>
        {#if showingIngredients}
            <button on:click={addToList}>+ lista 🛒</button>
        {:else}
            <button on:click={addToMenu}>+ menu 📅</button>
        {/if}
    </header>
    <div class="tabs two" style="padding: 4px">
        <input
            id="tab-1"
            type="radio"
            name="tabgroupB"
            checked
            on:click={() => (showingIngredients = false)}
        />
        <label class="pseudo button toggle tablabel" for="tab-1"
            >Instruções</label
        >
        <input
            id="tab-2"
            type="radio"
            name="tabgroupB"
            on:click={() => (showingIngredients = true)}
        />
        <label class="pseudo button toggle tablabel" for="tab-2"
            >Ingredientes</label
        >
        <div class="row">
            <div>
                <ol>
                    {#each data.instructions as instruction, index}
                        <li
                            class:bolded={highlightedInstruction == index}
                            on:click={() => (highlightedInstruction = index)}
                        >
                            {instruction}
                        </li>
                    {/each}
                </ol>
            </div>

            <div>
                <ul>
                    {#each data.ingredients as ingredient}
                        <li>
                            {ingredient.name}
                            {ingredient.quantity}
                            {ingredient.unit}
                        </li>
                    {/each}
                </ul>
            </div>
        </div>
    </div>
    <footer />
</article>

<style>
    .bolded {
        font-weight: bold;
    }
</style>
