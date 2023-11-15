import { createEffect, createEvent, createStore, sample } from "effector";

export const $isPlaying = createStore<boolean>(false);

// events
export const setPlayingStatus = createEvent<boolean>();

// handlers
$isPlaying.on(setPlayingStatus, (_, state) => state);
