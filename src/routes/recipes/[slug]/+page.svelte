<script>
    export let data;

    const addToMenu = () => {
        const recipe = {
            slug: data.slug,
            title: data.title,
            ingredients: data.ingredients,
        };
        let menu = localStorage.getItem("menu") || "[]";
        menu = JSON.parse(menu);
        menu.push(recipe);
        console.log(menu);
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
</script>

<article class="card" style="margin-left: 4px; margin-right: 4px">
    <header>
        <h3>{data.title}</h3>
    </header>
    <div class="tabs two" style="padding: 4px">
        <input id="tab-1" type="radio" name="tabgroupB" checked />
        <label class="pseudo button toggle tablabel" for="tab-1"
            >Instruções</label
        >
        <input id="tab-2" type="radio" name="tabgroupB" />
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
    <footer>
        <button on:click={addToMenu}>Adicionar ao menu</button>
        <button on:click={addToList}>Adicionar ingredientes à lista</button>
    </footer>
</article>

<style>
    .bolded {
        font-weight: bold;
    }
</style>
