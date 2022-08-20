import { writable } from "svelte/store"
import { browser } from "$app/env"


const defaultValue = []
const initialValue = browser ? JSON.parse(window.localStorage.getItem('shopping')) ?? defaultValue : defaultValue;

export const shopping = writable(initialValue)

shopping.subscribe((value) => {
    if (browser) {
        window.localStorage.setItem('shopping', JSON.stringify(value))
    }
})

export { shopping as default }