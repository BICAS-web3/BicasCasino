import { createEvent, createStore } from "effector";

export const $arrayStore = createStore<{ value: number; index: number }>({
  value: -1,
  index: -1,
});

export const setBolls = createEvent<{ value: number; index: number }>();

$arrayStore.on(setBolls, (_, state) => state);
