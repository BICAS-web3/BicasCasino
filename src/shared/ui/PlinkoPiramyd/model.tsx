import { createEffect, createEvent, createStore, sample } from "effector";

// variables
export const $pickedRows = createStore<number>(0);

// events
export const pickRows = createEvent<number>();

$pickedRows.on(pickRows, (_, rows) => rows);
