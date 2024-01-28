import { createEffect, createEvent, createStore, sample } from "effector";

export const $isPlaying = createStore<boolean>(false);
export const $raceNumber = createStore<number>(0);
export const $gameResult = createStore<number[]>([]);
export const $reset = createStore<boolean>(false);
// events
export const setPlayingStatus = createEvent<boolean>();
export const setRaceNumber = createEvent<number>();
export const setGameResult = createEvent<number[]>();
export const setReset = createEvent<boolean>();
// handlers
$isPlaying.on(setPlayingStatus, (_, state) => state);
$raceNumber.on(setRaceNumber, (_, state) => state);
$gameResult.on(setGameResult, (_, state) => state);
$reset.on(setReset, (_, state) => state);
