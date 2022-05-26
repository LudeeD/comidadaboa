//import { timeout } from '$lib/timeout';

export async function get() {
    //await timeout(3000);

    return {
        body: {
            "recipes": [
                "Risotto de Cogumelos",
                "Caril de Grão de Bico"
            ]
        },
    };
}