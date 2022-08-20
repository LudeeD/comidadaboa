import { writable } from "svelte/store"
import { browser } from '$app/env';

export const mealPlan = writable(
    browser && (localStorage.getItem("mealPlan") || [])
)
mealPlan.subscribe((val) => browser && (localStorage.mealPlan = val))

