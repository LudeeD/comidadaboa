//import { timeout } from '$lib/timeout';

import 'dotenv/config'

export async function get() {
    const api_key = process.env.SECRET_API_KEY ?? "demo"
    const url = process.env.SECRET_URL ?? "http://127.0.0.1:8000"

    const response = await fetch(url + '/recipe/latest', {
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