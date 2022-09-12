export const prerender = true;

import index from "$lib/search.json"

/** @type {import('./$types').PageLoad} */
export function load({ params }) {

    return {
        index: index
    }

    //throw error(404, 'Not found');
}