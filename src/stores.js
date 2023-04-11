import { writable } from "svelte/store";

export const username = writable("");
export const password = writable("");
export const loggedIn = writable(false);
export const unit = writable("Byte");

export const pagePDFList = writable(1);
export const paginatePDFList = writable(1);
