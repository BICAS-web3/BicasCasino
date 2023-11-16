import { createEvent, createStore } from "effector";

export const $arrayStore = createStore<number[]>([]);

export const setBolls = createEvent();

$arrayStore.on(setBolls, (state, payload) => [...state, payload]);
