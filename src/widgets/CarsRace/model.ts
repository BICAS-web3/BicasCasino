import { createEffect, createEvent, createStore, sample } from "effector";

export const $isPlaying = createStore<boolean>(false);
export const $carNumber = createStore<1 | 2>(1);
export const $gameResult = createStore<number[]>([]);
// events
export const setPlayingStatus = createEvent<boolean>();
export const setCarNumber = createEvent<1 | 2>();
export const setGameResult = createEvent<number[]>();
export const $reset = createStore<boolean>(false);
export const setReset = createEvent<boolean>();

// handlers
$isPlaying.on(setPlayingStatus, (_, state) => state);
$carNumber.on(setCarNumber, (_, state) => state);
$gameResult.on(setGameResult, (_, state) => state);
$reset.on(setReset, (_, state) => state);
