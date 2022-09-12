export const prerender = true;
import index from "$lib/search.json"


/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
    const post = await import(`../data/${params.slug}.json`)

    console.log(post)

    return {
        info: post,
    }
}