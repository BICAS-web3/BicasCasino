import { createEffect, createEvent, createStore, sample } from "effector";

export const $isPlaying = createStore<boolean>(false);
export const $gameResult = createStore<number[]>([]);
export const $reset = createStore<boolean>(false);

// events
export const setPlayingStatus = createEvent<boolean>();
export const setGameResult = createEvent<number[]>();
export const setReset = createEvent<boolean>();

// handlers
$isPlaying.on(setPlayingStatus, (_, state) => state);
$gameResult.on(setGameResult, (_, state) => state);
$reset.on(setReset, (_, state) => state);
