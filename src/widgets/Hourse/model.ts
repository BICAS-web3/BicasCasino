import { createEffect, createEvent, createStore, sample } from "effector";

export const $isPlaying = createStore<boolean>(false);
export const $hourseNumber = createStore<number>(0);
// events
export const setPlayingStatus = createEvent<boolean>();
export const setHourseNumber = createEvent<number>();

// handlers
$isPlaying.on(setPlayingStatus, (_, state) => state);
$hourseNumber.on(setHourseNumber, (_, state) => state);
