import 'dotenv/config'

export async function get({ url }) {
    try {
        const api_key = process.env.SECRET_API_KEY ?? "demo"
        const api = process.env.SECRET_URL ?? "http://127.0.0.1:8000"
        let search = url.search
        const response = await fetch(api + '/recipe/latest' + search, {
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
    } catch (e) {
        return {
            status: 404,
            error: new Error('Data not found')
        }

    }


}