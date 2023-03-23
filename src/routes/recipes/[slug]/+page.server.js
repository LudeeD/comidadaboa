import fs from 'fs';

export function load({ params }) {
    // load data from the file system
    console.log("wow")
    const recipe = getRecipeBySlug(params.slug);

    console.log(recipe)
    recipe.slug = params.slug;

    return recipe;
}

function getRecipeBySlug(slug) {
    // read the file that has the same name as the slug
    const recipe = fs.readFileSync(`src/recipes/${slug}.json`, 'utf-8')
    return JSON.parse(recipe);
}