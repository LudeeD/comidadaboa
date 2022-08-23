import { error } from '@sveltejs/kit';

export async function load({ url }) {
    console.log(url.search)
    const api_key = process.env.SECRET_API_KEY ?? ""
    const api = process.env.SECRET_URL ?? "http://127.0.0.1:8000"

    const response = await fetch(api + '/ingredients/plan' + url.search, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': api_key
        },
    });

    if (response.ok) {
        const ingredients_plan = await response.json();

        return {
            ingredients_plan
        }
    }

    throw error(500, "Could not fetch recipes");
}