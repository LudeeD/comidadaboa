import { error } from '@sveltejs/kit';

export async function load({ fetch, url }) {
    const response = await fetch("/api/receitas" + url.search);
    const recipes = await response.json();

    let query = url.searchParams.get("q") ?? "";

    if (response.ok) {
        return {
            recipes,
            query,
        };
    }

    throw error(500, "Could not fetch the guide");
}
