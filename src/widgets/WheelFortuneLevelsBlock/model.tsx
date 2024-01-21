import { createEvent, createStore } from "effector";

export const $level = createStore<string>("Easy");

export const setLevel = createEvent<string>();

$level.on(setLevel, (_, inp) => inp);
