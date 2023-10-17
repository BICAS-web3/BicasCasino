import { createEffect, createEvent, createStore, sample } from "effector";

export const $isOpen = createStore<boolean>(false);

export const setVisibility = createEvent<boolean>();

$isOpen.on(setVisibility, (_, state) => state);
