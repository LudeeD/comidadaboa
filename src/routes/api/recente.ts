//import { timeout } from '$lib/timeout';

import 'dotenv/config'

export async function get() {
    const api_key = process.env.SECRET_API_KEY ?? "demo"

    const response = await fetch('http://127.0.0.1:8000/recipe/latest', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': api_key
        },
    });

    const jason = await response.json()

    return {
        body: jason
    };
}