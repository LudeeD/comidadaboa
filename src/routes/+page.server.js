import { error } from '@sveltejs/kit';

export const prerender = true

export async function load({ url }) {
    const search = url.search
    const api_key = process.env.SECRET_API_KEY ?? ""
    const api = process.env.SECRET_URL ?? " http://127.0.0.1:8000"

    const response = await fetch(api + '/recipe/latest' + search, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': api_key
        },
    });

    if (response.ok) {
        const recipes = await response.json();
        const query = url.searchParams.get("q") ?? "";

        return {
            recipes,
            query
        }
    }

    throw error(500, "Could not fetch recipes");
}