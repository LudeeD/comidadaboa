import { writable } from "svelte/store"
import { browser } from "$app/env"

const defaultValue = []
const initialValue = browser ? JSON.parse(window.localStorage.getItem('planning')) ?? defaultValue : defaultValue;

export const planning = writable(initialValue)

planning.subscribe((value) => {
    if (browser) {
        window.localStorage.setItem('planning', JSON.stringify(value))
    }
})

export { planning as default }