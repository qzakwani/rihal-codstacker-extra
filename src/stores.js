import { writable } from "svelte/store";

export const username = writable("");
export const password = writable("");
export const loggedIn = writable(false);
export const unit = writable("Byte");

export const feature = writable("list");
export const _pdf = writable();
export const pdfList = writable([]);

export const pagePDFList = writable(1);
export const paginatePDFList = writable(10);

export const _stopWords = writable([]);

export const newPDF = writable([]);
