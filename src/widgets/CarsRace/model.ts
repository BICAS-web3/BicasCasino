import { createEffect, createEvent, createStore, sample } from "effector";

export const $isPlaying = createStore<boolean>(false);
export const $carNumber = createStore<1 | 2>(1);

// events
export const setPlayingStatus = createEvent<boolean>();
export const setCarNumber = createEvent<1 | 2>();

// handlers
$isPlaying.on(setPlayingStatus, (_, state) => state);
$carNumber.on(setCarNumber, (_, state) => state);
