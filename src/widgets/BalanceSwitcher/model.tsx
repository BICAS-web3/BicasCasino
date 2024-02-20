import { createEvent, createStore } from "effector";

export const $isDrax = createStore<boolean>(true);

export const setIsDrax = createEvent<boolean>();

$isDrax.on(setIsDrax, (_, state) => state);
