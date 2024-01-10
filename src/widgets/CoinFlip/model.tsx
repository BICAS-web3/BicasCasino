import { createEffect, createEvent, createStore } from "effector";

export const $modelLoaded = createStore(false);

export const setModelLoaded = createEvent<boolean>();

$modelLoaded.on(setModelLoaded, () => true);
