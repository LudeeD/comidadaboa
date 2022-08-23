import { error } from '@sveltejs/kit';

export async function load({ url }) {
    const api_key = process.env.SECRET_API_KEY ?? ""
    const api = process.env.SECRET_URL ?? "http://127.0.0.1:8000"

    const response = await fetch(api + '/recipe/plan/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': api_key
        },
    });

    if (response.ok) {
        const plan = await response.json();

        return {
            plan
        }
    }

    throw error(500, "Could not fetch recipes");
}