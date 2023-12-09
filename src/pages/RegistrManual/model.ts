import { createEvent, createStore } from "effector";

export const $isPartner = createStore<boolean>(false);

export const setIsPartner = createEvent<boolean>();

$isPartner.on(setIsPartner, (_, state) => state);
