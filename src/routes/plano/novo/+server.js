import { error } from '@sveltejs/kit';

export async function GET() {
    const api_key = process.env.SECRET_API_KEY ?? ""
    const response = await fetch('http://127.0.0.1:8000/recipe/plan/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': api_key
        },
    });

    if (response.ok) {
        const receita = await response.json();
        return new Response(JSON.stringify({ plano: receita }))
    }

    throw error(500, "Could not fetch recipe");
}