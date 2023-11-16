import { createEvent, createStore } from "effector";

export const $arrayStore = createStore<number>(-1);

export const setBolls = createEvent<number>();

$arrayStore.on(setBolls, (_, state) => state);
