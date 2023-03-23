<script>
    import { onMount } from "svelte";
    import pako from "pako";

    let menu = [];
    let ingredients = [];

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
        menu = JSON.parse(menudata);
        update_menu_ingredients();
    });

    const removeFromMenu = (index) => {
        menu.splice(index, 1);
        localStorage.setItem("menu", JSON.stringify(menu));
        menu = [...menu];
        update_menu_ingredients();
    };

    const share = () => {
        const state = localStorage.getItem("menu") || "[]";
        const compressed = pako.deflate(state);
        console.log(compressed);
        //console.log(btoa(compressed));
    };
</script>

<article class="card" style="margin-left: 4px; margin-right: 4px">
    <header>
        <h3>Menu</h3>
    </header>

    <div class="tabs two" style="padding: 4px">
        <input id="tab-1" type="radio" name="tabgroupB" checked />
        <label class="pseudo button toggle tablabel" for="tab-1">Plano</label>
        <input id="tab-2" type="radio" name="tabgroupB" />
        <label class="pseudo button toggle tablabel" for="tab-2"
            >Ingredientes</label
        >
        <div class="row">
            <div>
                {#each menu as item, index}
                    <div
                        style="display: flex; align-items: center; justify-content: space-between;"
                    >
                        <button
                            on:click={() => removeFromMenu(index)}
                            class="colorbtn">🗙</button
                        >
                        <p>{item.title}</p>
                    </div>
                {/each}
            </div>

            <div>
                <ul>
                    {#each ingredients as ing}
                        <li>{ing.name} {ing.quantity}{ing.unit}</li>
                    {/each}
                </ul>
            </div>
        </div>
    </div>
    <footer>
        <button on:click={share}>Partilhar Menu</button>
        <button on:click={share}>Adicionar ingredientes à lista</button>
    </footer>
</article>

<style>
    .colorbtn {
        background-color: #e3f09b;
        color: black;
    }
</style>
