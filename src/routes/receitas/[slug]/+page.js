import { error } from '@sveltejs/kit';


export async function load({ fetch, params }) {
    const id = params.slug;
    const response = await fetch("/api/receitas/" + id);
    const receita = await response.json();

    if (response.ok) {
        return {
            title: receita["name"],
            attributes: receita["attributes"],
            ingredients: receita["ingredients"],
            instructions: receita["instructions"],
        };
    }

    throw error(500, "Could not fetch the guide");
}
