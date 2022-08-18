import { error } from '@sveltejs/kit';

export const prerender = true

export async function load({ params }) {
    const id = params.slug;
    const api_key = process.env.SECRET_API_KEY ?? ""
    const response = await fetch('http://127.0.0.1:8000/recipe/' + id, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': api_key
        },
    });

    if (response.ok) {
        const receita = await response.json();
        return {
            title: receita["name"],
            attributes: receita["attributes"],
            ingredients: receita["ingredients"],
            instructions: receita["instructions"],
        };
    }

    throw error(500, "Could not fetch recipe");
}
