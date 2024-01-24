import { createEffect, createEvent, createStore, sample } from "effector";

export const $isPlaying = createStore<boolean>(false);
export const $HorseNumber = createStore<number>(0);
export const $gameResult = createStore<number[]>([]);
// events
export const setPlayingStatus = createEvent<boolean>();
export const setHorseNumber = createEvent<number>();
export const setGameResult = createEvent<number[]>();

// handlers
$isPlaying.on(setPlayingStatus, (_, state) => state);
$HorseNumber.on(setHorseNumber, (_, state) => state);
$gameResult.on(setGameResult, (_, state) => state);
