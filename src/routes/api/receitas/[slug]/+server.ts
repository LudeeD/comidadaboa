import 'dotenv/config'

export async function GET({ params }) {
    const id = params.slug;
    const api_key = process.env.SECRET_API_KEY ?? "demo"
    const response = await fetch('https://api.comidadaboa.com/recipe/' + id, {
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