import { createEffect, createEvent, createStore, sample } from "effector";

export const $isPlaying = createStore<boolean>(false);
export const $gameResult = createStore<number[]>([]);
export const $reset = createStore<boolean>(false);
export const $emptyField = createStore(false);
export const $stop = createStore<boolean>(false);
export const $apples = createStore<number[]>([]);
// events
export const setPlayingStatus = createEvent<boolean>();
export const setGameResult = createEvent<number[]>();
export const setReset = createEvent<boolean>();
export const setEmptyField = createEvent<boolean>();
export const setStop = createEvent<boolean>();
export const setApples = createEvent<number[]>();

// handlers
$isPlaying.on(setPlayingStatus, (_, state) => state);
$gameResult.on(setGameResult, (_, state) => state);
$reset.on(setReset, (_, state) => state);
$emptyField.on(setEmptyField, (_, state) => state);
$stop.on(setStop, (_, state) => state);
$apples.on(setApples, (_, state) => state);
