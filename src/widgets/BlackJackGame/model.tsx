import { createEffect, createEvent, createStore } from "effector";

export const $btnsActive = createStore(false);

export const setBtnsActive = createEvent<boolean>();

$btnsActive.on(setBtnsActive, (_, state) => state);
